import { NextResponse } from 'next/server';
import pool from '../../../../../lib/db';
import { requireAuth } from '../../../../../lib/auth';
import { checkRateLimit } from '../../../../../lib/rate-limit';

// GET all data points for a dataset
export const GET = requireAuth(async (request, { params }) => {
  const ip = request.headers.get('x-forwarded-for') || request.ip;
  if (!await checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }
  try {
    const { id } = params;
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '50');
    const offset = (page - 1) * limit;

    // First check if dataset exists
    const datasetCheck = await pool.query('SELECT id FROM datasets WHERE id = $1', [id]);
    if (datasetCheck.rows.length === 0) {
      const response = NextResponse.json(
        { error: 'Dataset not found' },
        { status: 404 }
      );
      response.headers.set('X-API-Version', '1.0.0');
      return response;
    }

    // Get data points with pagination
    const { rows } = await pool.query(
      'SELECT id, data, created_at, updated_at FROM data_points WHERE dataset_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3',
      [id, limit, offset]
    );

    // Get total count for pagination
    const countResult = await pool.query(
      'SELECT COUNT(*) FROM data_points WHERE dataset_id = $1',
      [id]
    );
    const total = parseInt(countResult.rows[0].count);

    const response = NextResponse.json({
      data: rows,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
    response.headers.set('X-API-Version', '1.0.0');
    return response;
  } catch (error) {
    console.error('Error fetching data points:', error);
    const response = NextResponse.json(
      { error: 'Failed to fetch data points' },
      { status: 500 }
    );
    response.headers.set('X-API-Version', '1.0.0');
    return response;
  }
});

// POST create new data point
export const POST = requireAuth(async (request, { params }) => {
  const ip = request.headers.get('x-forwarded-for') || request.ip;
  if (!await checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }
  try {
    const { id } = params;
    const { data } = await request.json();

    if (!data) {
      const response = NextResponse.json(
        { error: 'Data is required' },
        { status: 400 }
      );
      response.headers.set('X-API-Version', '1.0.0');
      return response;
    }

    // First check if dataset exists
    const datasetCheck = await pool.query('SELECT id FROM datasets WHERE id = $1', [id]);
    if (datasetCheck.rows.length === 0) {
      const response = NextResponse.json(
        { error: 'Dataset not found' },
        { status: 404 }
      );
      response.headers.set('X-API-Version', '1.0.0');
      return response;
    }

    // Validate data is valid JSON
    try {
      JSON.parse(JSON.stringify(data));
    } catch (e) {
      const response = NextResponse.json(
        { error: 'Invalid data format' },
        { status: 400 }
      );
      response.headers.set('X-API-Version', '1.0.0');
      return response;
    }

    const { rows } = await pool.query(
      'INSERT INTO data_points (dataset_id, data) VALUES ($1, $2) RETURNING *',
      [id, JSON.stringify(data)]
    );

    const response = NextResponse.json(rows[0], { status: 201 });
    response.headers.set('X-API-Version', '1.0.0');
    return response;
  } catch (error) {
    console.error('Error creating data point:', error);
    const response = NextResponse.json(
      { error: 'Failed to create data point' },
      { status: 500 }
    );
    response.headers.set('X-API-Version', '1.0.0');
    return response;
  }
});
