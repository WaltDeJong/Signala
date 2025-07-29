import { NextResponse } from 'next/server';
import pool from '../../../../../../lib/db';
import { requireAuth } from '../../../../../../lib/auth';
import { checkRateLimit } from '../../../../../../lib/rate-limit';

// GET single data point
export const GET = requireAuth(async (request, { params }) => {
  const ip = request.headers.get('x-forwarded-for') || request.ip;
  if (!await checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }
  try {
    const { id, dataId } = params;
    
    const { rows } = await pool.query(
      'SELECT dp.* FROM data_points dp JOIN datasets d ON dp.dataset_id = d.id WHERE dp.id = $1 AND d.id = $2',
      [dataId, id]
    );

    if (rows.length === 0) {
      const response = NextResponse.json(
        { error: 'Data point not found' },
        { status: 404 }
      );
      response.headers.set('X-API-Version', '1.0.0');
      return response;
    }

    const response = NextResponse.json(rows[0]);
    response.headers.set('X-API-Version', '1.0.0');
    return response;
  } catch (error) {
    console.error('Error fetching data point:', error);
    const response = NextResponse.json(
      { error: 'Failed to fetch data point' },
      { status: 500 }
    );
    response.headers.set('X-API-Version', '1.0.0');
    return response;
  }
});

// PUT update data point
export const PUT = requireAuth(async (request, { params }) => {
  const ip = request.headers.get('x-forwarded-for') || request.ip;
  if (!await checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }
  try {
    const { id, dataId } = params;
    const { data } = await request.json();

    if (!data) {
      const response = NextResponse.json(
        { error: 'Data is required' },
        { status: 400 }
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
      'UPDATE data_points SET data = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 AND dataset_id = $3 RETURNING *',
      [JSON.stringify(data), dataId, id]
    );

    if (rows.length === 0) {
      const response = NextResponse.json(
        { error: 'Data point not found' },
        { status: 404 }
      );
      response.headers.set('X-API-Version', '1.0.0');
      return response;
    }

    const response = NextResponse.json(rows[0]);
    response.headers.set('X-API-Version', '1.0.0');
    return response;
  } catch (error) {
    console.error('Error updating data point:', error);
    const response = NextResponse.json(
      { error: 'Failed to update data point' },
      { status: 500 }
    );
    response.headers.set('X-API-Version', '1.0.0');
    return response;
  }
});

// DELETE data point
export const DELETE = requireAuth(async (request, { params }) => {
  const ip = request.headers.get('x-forwarded-for') || request.ip;
  if (!await checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }
  try {
    const { id, dataId } = params;
    
    const { rows } = await pool.query(
      'DELETE FROM data_points WHERE id = $1 AND dataset_id = $2 RETURNING *',
      [dataId, id]
    );

    if (rows.length === 0) {
      const response = NextResponse.json(
        { error: 'Data point not found' },
        { status: 404 }
      );
      response.headers.set('X-API-Version', '1.0.0');
      return response;
    }

    const response = NextResponse.json({ message: 'Data point deleted successfully' });
    response.headers.set('X-API-Version', '1.0.0');
    return response;
  } catch (error) {
    console.error('Error deleting data point:', error);
    const response = NextResponse.json(
      { error: 'Failed to delete data point' },
      { status: 500 }
    );
    response.headers.set('X-API-Version', '1.0.0');
    return response;
  }
});
