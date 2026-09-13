import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const items = await prisma.rewardItem.findMany({
      orderBy: { cost: 'asc' }
    });
    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching reward items:', error);
    return NextResponse.json({ error: 'Failed to fetch reward items' }, { status: 500 });
  }
}
