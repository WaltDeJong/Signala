import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { env } from './env';

export async function verifyAuth() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('admin-token');

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token.value, env.JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error('Auth verification error:', error);
    return null;
  }
}

export function requireAuth(handler) {
  return async (request, context) => {
    const user = await verifyAuth();
    
    if (!user) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Add user to request context
    request.user = user;
    return handler(request, context);
  };
}
