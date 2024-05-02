import { getNowPlaying } from '@/lib/spotify';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const response = await getNowPlaying();
    const data = await response.json();

    console.log(data);

    return NextResponse.json({ data, status: response.status });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error, status: 500 });
  }
}
