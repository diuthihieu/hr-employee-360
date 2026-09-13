import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const rules = await prisma.rewardRule.findMany({
      orderBy: { points: 'desc' }
    });
    return NextResponse.json(rules);
  } catch (error) {
    console.error('Error fetching reward rules:', error);
    return NextResponse.json({ error: 'Failed to fetch reward rules' }, { status: 500 });
  }
}
