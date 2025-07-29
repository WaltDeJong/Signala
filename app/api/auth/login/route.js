import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../../../lib/db';
import { loginSchema } from '../../../lib/validation';
import { checkRateLimit } from '../../../lib/rate-limit';
import { env } from '../../../lib/env';

export async function POST(request) {
  const ip = request.headers.get('x-forwarded-for') || request.ip;
  if (!await checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    console.log('Login attempt started');
    const { username, password } = await request.json();
    console.log('Received credentials:', { username });

    const { error } = loginSchema.validate({ username, password });
    if (error) {
      console.error('Validation error:', error.details);
      return NextResponse.json(
        { error: `Invalid input: ${error.details.map(d => d.message).join(', ')}` },
        { status: 400 }
      );
    }
    console.log('Validation successful');

    // Get user from database
    console.log('Querying database for user');
    const { rows } = await pool.query(
      'SELECT id, username, password_hash FROM admin_users WHERE username = $1',
      [username]
    );
    console.log('Database query executed');

    if (rows.length === 0) {
      console.log('User not found');
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const user = rows[0];
    console.log('User found:', user.username);

    // Verify password
    console.log('Comparing password');
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    console.log('Password comparison finished');

    if (!isValidPassword) {
      console.log('Password invalid');
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    console.log('Password valid');

    // Create JWT token
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Create response with token in cookie
    const response = NextResponse.json(
      { message: 'Login successful', user: { id: user.id, username: user.username } },
      { status: 200 }
    );

    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 86400 // 24 hours
    });

    return response;
  } catch (error) {
    console.error('LOGIN_ROUTE_ERROR:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
