import { NextResponse } from 'next/server';
import pool from '../../../lib/db';

export async function GET(request, context) {
  const { params } = context;
  const { chartName } = params;

  try {
    const { rows } = await pool.query('SELECT data, layout FROM charts WHERE name = $1', [chartName]);

    if (rows.length > 0) {
      const { data, layout } = rows[0];
      const responseData = { data: data.data, layout };
      return NextResponse.json(responseData);
    } else {
      return new NextResponse('Chart not found', { status: 404 });
    }
  } catch (error) {
    console.error('Database Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
