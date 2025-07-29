import { NextResponse } from 'next/server';
import pool from '../../../lib/db';
import { requireAuth } from '../../../lib/auth';
import { checkRateLimit } from '../../../lib/rate-limit';

// GET all datasets
export const GET = requireAuth(async (request) => {
  const ip = request.headers.get('x-forwarded-for') || request.ip;
  if (!await checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }
  try {
    const { rows } = await pool.query(
      'SELECT id, name, description, schema, created_at, updated_at FROM datasets ORDER BY created_at DESC'
    );

    const response = NextResponse.json(rows);
    response.headers.set('X-API-Version', '1.0.0');
    return response;
  } catch (error) {
    console.error('Error fetching datasets:', error);
    const response = NextResponse.json(
      { error: 'Failed to fetch datasets' },
      { status: 500 }
    );
    response.headers.set('X-API-Version', '1.0.0');
    return response;
  }
});

// POST create new dataset
export const POST = requireAuth(async (request) => {
  const ip = request.headers.get('x-forwarded-for') || request.ip;
  if (!await checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }
  try {
    const { name, description, schema } = await request.json();

    if (!name || !schema) {
      const response = NextResponse.json(
        { error: 'Name and schema are required' },
        { status: 400 }
      );
      response.headers.set('X-API-Version', '1.0.0');
      return response;
    }

    // Validate schema is valid JSON
    try {
      JSON.parse(JSON.stringify(schema));
    } catch (e) {
      const response = NextResponse.json(
        { error: 'Invalid schema format' },
        { status: 400 }
      );
      response.headers.set('X-API-Version', '1.0.0');
      return response;
    }

    const { rows } = await pool.query(
      'INSERT INTO datasets (name, description, schema) VALUES ($1, $2, $3) RETURNING *',
      [name, description, JSON.stringify(schema)]
    );

    const response = NextResponse.json(rows[0], { status: 201 });
    response.headers.set('X-API-Version', '1.0.0');
    return response;
  } catch (error) {
    console.error('Error creating dataset:', error);
    
    if (error.code === '23505') { // Unique constraint violation
      const response = NextResponse.json(
        { error: 'Dataset name already exists' },
        { status: 409 }
      );
      response.headers.set('X-API-Version', '1.0.0');
      return response;
    }

    const response = NextResponse.json(
      { error: 'Failed to create dataset' },
      { status: 500 }
    );
    response.headers.set('X-API-Version', '1.0.0');
    return response;
  }
});
