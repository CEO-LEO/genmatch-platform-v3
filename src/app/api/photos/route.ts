import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { getDatabase } from '@/lib/database';

// --- Minimal EXIF parser (DateTimeOriginal) for JPEG data URLs ---
function dataUrlToBuffer(dataUrl: string): Buffer {
  const comma = dataUrl.indexOf(',');
  const base64 = comma >= 0 ? dataUrl.slice(comma + 1) : dataUrl;
  return Buffer.from(base64, 'base64');
}

function readUInt16(buf: Buffer, offset: number, le: boolean) {
  return le ? buf.readUInt16LE(offset) : buf.readUInt16BE(offset);
}
function readUInt32(buf: Buffer, offset: number, le: boolean) {
  return le ? buf.readUInt32LE(offset) : buf.readUInt32BE(offset);
}

function getExifDateTimeOriginalFromJpeg(buffer: Buffer): string | null {
  try {
    if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) return null; // not JPEG
    let offset = 2;
    while (offset + 4 < buffer.length) {
      if (buffer[offset] !== 0xff) break;
      const marker = buffer[offset + 1];
      const size = buffer.readUInt16BE(offset + 2);
      if (marker === 0xe1) {
        const start = offset + 4; // after length
        if (buffer.toString('ascii', start, start + 6) === 'Exif\u0000\u0000') {
          const tiffStart = start + 6;
          const le = buffer.toString('ascii', tiffStart, tiffStart + 2) === 'II';
          const firstIFDOffset = readUInt32(buffer, tiffStart + 4, le);
          const ifd0 = tiffStart + firstIFDOffset;
          const entryCount = readUInt16(buffer, ifd0, le);
          let exifIFDPtr = 0;
          for (let i = 0; i < entryCount; i++) {
            const e = ifd0 + 2 + i * 12;
            const tag = readUInt16(buffer, e, le);
            if (tag === 0x8769) { // ExifIFDPointer
              // type (2 bytes) + count (4) + valueOffset (4)
              const valueOffset = readUInt32(buffer, e + 8, le);
              exifIFDPtr = tiffStart + valueOffset;
            }
          }
          if (exifIFDPtr) {
            const exifCount = readUInt16(buffer, exifIFDPtr, le);
            for (let j = 0; j < exifCount; j++) {
              const e = exifIFDPtr + 2 + j * 12;
              const tag = readUInt16(buffer, e, le);
              if (tag === 0x9003) { // DateTimeOriginal
                const type = readUInt16(buffer, e + 2, le); // ASCII = 2
                const count = readUInt32(buffer, e + 4, le);
                const valOff = readUInt32(buffer, e + 8, le);
                if (type === 2 && count >= 10) {
                  const strOff = count > 4 ? tiffStart + valOff : e + 8;
                  const text = buffer.toString('ascii', strOff, strOff + count).replace(/\u0000+$/, '');
                  return text; // format 'YYYY:MM:DD HH:MM:SS'
                }
              }
            }
          }
        }
      }
      offset += 2 + size;
    }
  } catch {
    return null;
  }
  return null;
}

function rationalToNumber(buffer: Buffer, offset: number, le: boolean) {
  const num = readUInt32(buffer, offset, le);
  const den = readUInt32(buffer, offset + 4, le);
  return den ? num / den : 0;
}

function getExifGpsFromJpeg(buffer: Buffer): { lat: number; lon: number } | null {
  try {
    if (buffer[0] !== 0xff || buffer[1] !== 0xd8) return null;
    let offset = 2;
    while (offset + 4 < buffer.length) {
      if (buffer[offset] !== 0xff) break;
      const marker = buffer[offset + 1];
      const size = buffer.readUInt16BE(offset + 2);
      if (marker === 0xe1) {
        const start = offset + 4;
        if (buffer.toString('ascii', start, start + 6) === 'Exif\u0000\u0000') {
          const tiffStart = start + 6;
          const le = buffer.toString('ascii', tiffStart, tiffStart + 2) === 'II';
          const firstIFDOffset = readUInt32(buffer, tiffStart + 4, le);
          const ifd0 = tiffStart + firstIFDOffset;
          const entryCount = readUInt16(buffer, ifd0, le);
          let gpsIFDPtr = 0;
          for (let i = 0; i < entryCount; i++) {
            const e = ifd0 + 2 + i * 12;
            const tag = readUInt16(buffer, e, le);
            if (tag === 0x8825) { // GPSInfoIFDPointer
              gpsIFDPtr = tiffStart + readUInt32(buffer, e + 8, le);
            }
          }
          if (gpsIFDPtr) {
            const gpsCount = readUInt16(buffer, gpsIFDPtr, le);
            let latRef = 'N', lonRef = 'E';
            let lat: number[] | null = null;
            let lon: number[] | null = null;
            for (let j = 0; j < gpsCount; j++) {
              const e = gpsIFDPtr + 2 + j * 12;
              const tag = readUInt16(buffer, e, le);
              const type = readUInt16(buffer, e + 2, le);
              const count = readUInt32(buffer, e + 4, le);
              const valOff = readUInt32(buffer, e + 8, le);
              if (tag === 1 && type === 2) { // GPSLatitudeRef
                const p = count > 4 ? tiffStart + valOff : e + 8;
                latRef = buffer.toString('ascii', p, p + Math.min(count, 2)).replace(/\u0000/g, '') || 'N';
              } else if (tag === 2 && type === 5 && count === 3) { // GPSLatitude (3 rationals)
                const p = tiffStart + valOff;
                lat = [
                  rationalToNumber(buffer, p, le),
                  rationalToNumber(buffer, p + 8, le),
                  rationalToNumber(buffer, p + 16, le)
                ];
              } else if (tag === 3 && type === 2) { // GPSLongitudeRef
                const p = count > 4 ? tiffStart + valOff : e + 8;
                lonRef = buffer.toString('ascii', p, p + Math.min(count, 2)).replace(/\u0000/g, '') || 'E';
              } else if (tag === 4 && type === 5 && count === 3) { // GPSLongitude
                const p = tiffStart + valOff;
                lon = [
                  rationalToNumber(buffer, p, le),
                  rationalToNumber(buffer, p + 8, le),
                  rationalToNumber(buffer, p + 16, le)
                ];
              }
            }
            if (lat && lon && lat.length === 3 && lon.length === 3) {
              const latDec = (lat[0]! + lat[1]! / 60 + lat[2]! / 3600) * (latRef === 'S' ? -1 : 1);
              const lonDec = (lon[0]! + lon[1]! / 60 + lon[2]! / 3600) * (lonRef === 'W' ? -1 : 1);
              if (Number.isFinite(latDec) && Number.isFinite(lonDec)) {
                return { lat: latDec, lon: lonDec };
              }
            }
          }
        }
      }
      offset += 2 + size;
    }
  } catch {
    return null;
  }
  return null;
}

// POST - Upload new photo
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { taskId, photoUrl, description, uploadedBy } = body;

    // Validation
    if (!taskId || !photoUrl || !description || !uploadedBy) {
      return NextResponse.json(
        { error: 'กรุณากรอกข้อมูลให้ครบถ้วน' },
        { status: 400 }
      );
    }

    // Basic MIME/size validation (works for data URLs too)
    if (typeof photoUrl !== 'string' || !photoUrl.startsWith('data:image/')) {
      return NextResponse.json(
        { error: 'รองรับเฉพาะไฟล์รูปภาพเท่านั้น' },
        { status: 400 }
      );
    }

    // Estimate file size from base64 length (reject extremely small images)
    let approxBytes = 0;
    const commaIndex = photoUrl.indexOf(',');
    if (commaIndex > 0) {
      const base64Data = photoUrl.substring(commaIndex + 1);
      approxBytes = Math.floor(base64Data.length * 0.75);
    }
    // Require at least ~30KB to discourage meaningless uploads
    if (approxBytes > 0 && approxBytes < 30 * 1024) {
      return NextResponse.json(
        { error: 'รูปภาพมีขนาดเล็กเกินไป (อย่างน้อย 30KB)' },
        { status: 400 }
      );
    }

    const db = await getDatabase();

    // Validate EXIF capture date: must be the same day as task date
    try {
      const task = await db.get('SELECT date FROM tasks WHERE id = ?', [taskId]);
      if (task && typeof photoUrl === 'string' && photoUrl.startsWith('data:image/')) {
        const buffer = dataUrlToBuffer(photoUrl);
        const exifDate = getExifDateTimeOriginalFromJpeg(buffer);
        if (exifDate) {
          const datePart = exifDate.split(' ')[0]?.replace(/:/g, '-');
          if (datePart && task.date && String(task.date).substring(0, 10) !== datePart) {
            return NextResponse.json(
              { error: 'รูปต้องถูกถ่ายในวันเดียวกับวันที่ของงาน' },
              { status: 400 }
            );
          }
        } else {
          return NextResponse.json(
            { error: 'ไม่พบข้อมูลเวลาใน EXIF ของรูป กรุณาถ่ายด้วยกล้องแล้วอัปโหลดโดยตรง' },
            { status: 400 }
          );
        }

        // Optional GPS check within 2km of task location (if task has location with lat,lon in format "lat,lon")
        if (task.location && typeof task.location === 'string' && task.location.includes(',')) {
          const coords = task.location.split(',').map((s: string) => parseFloat(s.trim()));
          const gps = getExifGpsFromJpeg(buffer);
          if (coords.length === 2 && Number.isFinite(coords[0]) && Number.isFinite(coords[1]) && gps) {
            const R = 6371e3;
            const toRad = (v: number) => (v * Math.PI) / 180;
            const baseLat = Number(coords[0]);
            const baseLon = Number(coords[1]);
            const gpsLat = Number(gps.lat);
            const gpsLon = Number(gps.lon);
            const dLat = toRad(gpsLat - baseLat);
            const dLon = toRad(gpsLon - baseLon);
            const a = Math.sin(dLat/2)**2 + Math.cos(toRad(baseLat))*Math.cos(toRad(gpsLat))*Math.sin(dLon/2)**2;
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            const dist = R * c; // meters
            if (dist > 2000) {
              return NextResponse.json(
                { error: 'พิกัดรูปห่างจากสถานที่งานเกิน 2 กม.' },
                { status: 400 }
              );
            }
          }
        }
      }
    } catch (exifErr) {
      console.warn('EXIF validation failed (fallback to allow):', exifErr);
      return NextResponse.json(
        { error: 'ตรวจสอบ EXIF ไม่สำเร็จ กรุณาลองอัปโหลดรูปจากกล้องโดยตรง' },
        { status: 400 }
      );
    }

    // Prevent exact duplicate uploads for the same task by the same user
    const duplicate = await db.get(
      'SELECT id FROM photos WHERE taskId = ? AND uploadedBy = ? AND photoUrl = ? LIMIT 1',
      [taskId, uploadedBy, photoUrl]
    );
    if (duplicate) {
      return NextResponse.json(
        { error: 'รูปนี้ถูกอัปโหลดแล้ว' },
        { status: 409 }
      );
    }

    // Perceptual hash (quick aHash) to detect near-duplicates across the task
    // Note: lightweight placeholder using sha1 of data; can swap for true pHash later
    const buffer = dataUrlToBuffer(photoUrl);
    const quickHash = crypto.createHash('sha1').update(buffer).digest('hex');
    // If a photo with the same quickHash exists for the same task, reject
    const existingSimilar = await db.get('SELECT id FROM photos WHERE taskId = ? AND description LIKE ?', [taskId, `%__HASH:${quickHash}%`]);
    if (existingSimilar) {
      return NextResponse.json(
        { error: 'รูปนี้ใกล้เคียงกับรูปที่อัปโหลดก่อนหน้า' },
        { status: 409 }
      );
    }
    
    // Insert new photo
    const result = await db.run(`
      INSERT INTO photos (taskId, photoUrl, description, uploadedBy, status, uploadedAt)
      VALUES (?, ?, ?, ?, 'PENDING', CURRENT_TIMESTAMP)
    `, [taskId, photoUrl, `${description} __HASH:${quickHash}`.trim(), uploadedBy]);
    
    if (result.changes === 0) {
      return NextResponse.json(
        { error: 'เกิดข้อผิดพลาดในการบันทึกรูปถ่าย' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'อัปโหลดรูปถ่ายสำเร็จ',
      photoId: result.lastID
    });

  } catch (error) {
    console.error('Upload photo error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการอัปโหลดรูปถ่าย' },
      { status: 500 }
    );
  }
}

// GET - Get photos by task
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const taskId = searchParams.get('taskId');
    const status = searchParams.get('status');

    if (!taskId) {
      return NextResponse.json(
        { error: 'กรุณาระบุ taskId' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    
    let query = `
      SELECT 
        p.*,
        u.firstName, u.lastName, u.phone as uploaderPhone,
        a.firstName as approverFirstName, a.lastName as approverLastName
      FROM photos p
      JOIN users u ON p.uploadedBy = u.id
      LEFT JOIN users a ON p.approvedBy = a.id
      WHERE p.taskId = ?
    `;
    
    const params = [taskId];
    
    if (status && status !== 'all') {
      query += ' AND p.status = ?';
      params.push(status);
    }
    
    query += ' ORDER BY p.uploadedAt DESC';
    
    const photos = await db.all(query, params);
    
    return NextResponse.json({
      success: true,
      photos
    });
    
  } catch (error) {
    console.error('Get photos error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการดึงข้อมูลรูปถ่าย' },
      { status: 500 }
    );
  }
}
