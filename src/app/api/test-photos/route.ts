import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

export async function GET() {
  try {
    const db = await getDatabase();
    
    // Test photos functionality
    const testResults = {
      message: 'Photo System Test Results',
      timestamp: new Date().toISOString(),
      tests: []
    };

    // Test 1: Get photos by task
    try {
      const photos = await db.all(`
        SELECT 
          p.*,
          u.firstName, u.lastName, u.phone as uploaderPhone,
          a.firstName as approverFirstName, a.lastName as approverLastName
        FROM photos p
        JOIN users u ON p.uploadedBy = u.id
        LEFT JOIN users a ON p.approvedBy = a.id
        WHERE p.taskId = ?
      `, [1]);
      
      testResults.tests.push({
        test: 'Get photos by task',
        success: true,
        result: `Found ${photos.length} photos`,
        data: photos
      });
    } catch (error) {
      testResults.tests.push({
        test: 'Get photos by task',
        success: false,
        error: error.message
      });
    }

    // Test 2: Get single photo
    try {
      const photo = await db.get(`
        SELECT 
          p.*,
          u.firstName, u.lastName, u.phone as uploaderPhone,
          a.firstName as approverFirstName, a.lastName as approverLastName
        FROM photos p
        JOIN users u ON p.uploadedBy = u.id
        LEFT JOIN users a ON p.approvedBy = a.id
        WHERE p.id = ?
      `, [1]);
      
      testResults.tests.push({
        test: 'Get single photo',
        success: !!photo,
        result: photo ? 'Photo found' : 'Photo not found',
        data: photo
      });
    } catch (error) {
      testResults.tests.push({
        test: 'Get single photo',
        success: false,
        error: error.message
      });
    }

    // Test 3: Insert new photo
    try {
      const result = await db.run(`
        INSERT INTO photos (taskId, photoUrl, description, uploadedBy, status)
        VALUES (?, ?, ?, ?, 'PENDING')
      `, [1, 'https://test-photo.jpg', 'Test photo description', 1]);
      
      testResults.tests.push({
        test: 'Insert new photo',
        success: result.changes > 0,
        result: `Photo inserted with ID: ${result.lastID}`,
        data: result
      });
    } catch (error) {
      testResults.tests.push({
        test: 'Insert new photo',
        success: false,
        error: error.message
      });
    }

    // Test 4: Update photo status
    try {
      const result = await db.run(`
        UPDATE photos 
        SET status = ?, approvedAt = CURRENT_TIMESTAMP, approvedBy = ?, notes = ?
        WHERE id = ?
      `, ['APPROVED', 4, 'Test approval', 1]);
      
      testResults.tests.push({
        test: 'Update photo status',
        success: result.changes > 0,
        result: `Photo status updated: ${result.changes} rows affected`,
        data: result
      });
    } catch (error) {
      testResults.tests.push({
        test: 'Update photo status',
        success: false,
        error: error.message
      });
    }

    return NextResponse.json(testResults);

  } catch (error) {
    console.error('Photo system test error:', error);
    return NextResponse.json(
      { error: 'Photo system test failed', details: error.message },
      { status: 500 }
    );
  }
}
