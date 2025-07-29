import { NextResponse } from 'next/server';
import pool from '../../../../lib/db';
import { requireAuth } from '../../../../lib/auth';
import { checkRateLimit } from '../../../../lib/rate-limit';

// GET single dataset
export const GET = requireAuth(async (request, { params }) => {
  const ip = request.headers.get('x-forwarded-for') || request.ip;
  if (!await checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }
  try {
    const { id } = params;
    const { rows } = await pool.query(
      'SELECT * FROM datasets WHERE id = $1',
      [id]
    );

    if (rows.length === 0) {
      const response = NextResponse.json(
        { error: 'Dataset not found' },
        { status: 404 }
      );
      response.headers.set('X-API-Version', '1.0.0');
      return response;
    }

    const response = NextResponse.json(rows[0]);
    response.headers.set('X-API-Version', '1.0.0');
    return response;
  } catch (error) {
    console.error('Error fetching dataset:', error);
    const response = NextResponse.json(
      { error: 'Failed to fetch dataset' },
      { status: 500 }
    );
    response.headers.set('X-API-Version', '1.0.0');
    return response;
  }
});

// PUT update dataset
export const PUT = requireAuth(async (request, { params }) => {
  const ip = request.headers.get('x-forwarded-for') || request.ip;
  if (!await checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }
  try {
    const { id } = params;
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
      'UPDATE datasets SET name = $1, description = $2, schema = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *',
      [name, description, JSON.stringify(schema), id]
    );

    if (rows.length === 0) {
      const response = NextResponse.json(
        { error: 'Dataset not found' },
        { status: 404 }
      );
      response.headers.set('X-API-Version', '1.0.0');
      return response;
    }

    const response = NextResponse.json(rows[0]);
    response.headers.set('X-API-Version', '1.0.0');
    return response;
  } catch (error) {
    console.error('Error updating dataset:', error);
    
    if (error.code === '23505') { // Unique constraint violation
      const response = NextResponse.json(
        { error: 'Dataset name already exists' },
        { status: 409 }
      );
      response.headers.set('X-API-Version', '1.0.0');
      return response;
    }

    const response = NextResponse.json(
      { error: 'Failed to update dataset' },
      { status: 500 }
    );
    response.headers.set('X-API-Version', '1.0.0');
    return response;
  }
});

// DELETE dataset
export const DELETE = requireAuth(async (request, { params }) => {
  const ip = request.headers.get('x-forwarded-for') || request.ip;
  if (!await checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }
  try {
    const { id } = params;
    
    const { rows } = await pool.query(
      'DELETE FROM datasets WHERE id = $1 RETURNING *',
      [id]
    );

    if (rows.length === 0) {
      const response = NextResponse.json(
        { error: 'Dataset not found' },
        { status: 404 }
      );
      response.headers.set('X-API-Version', '1.0.0');
      return response;
    }

    const response = NextResponse.json({ message: 'Dataset deleted successfully' });
    response.headers.set('X-API-Version', '1.0.0');
    return response;
  } catch (error) {
    console.error('Error deleting dataset:', error);
    const response = NextResponse.json(
      { error: 'Failed to delete dataset' },
      { status: 500 }
    );
    response.headers.set('X-API-Version', '1.0.0');
    return response;
  }
});
