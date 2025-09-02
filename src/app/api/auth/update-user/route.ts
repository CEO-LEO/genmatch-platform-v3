import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

export async function PUT(request: NextRequest) {
  try {
    // Get token from header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'No token provided' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const updateData = await request.json();

    // TODO: verify token (skipped in demo)

    const db = await getDatabase();
    await db.run(
      `UPDATE users SET firstName = ?, lastName = ?, email = ?, phone = ?, userType = ?, address = ? WHERE id = ?`,
      [
        updateData.firstName,
        updateData.lastName,
        updateData.email,
        updateData.phone,
        updateData.userType,
        updateData.address,
        updateData.id
      ]
    );

    const user = await db.get(
      `SELECT id, firstName, lastName, email, phone, userType FROM users WHERE id = ?`,
      [updateData.id]
    );

    return NextResponse.json(user);
  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
