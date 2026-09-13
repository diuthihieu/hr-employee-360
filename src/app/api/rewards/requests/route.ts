import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const employeeId = searchParams.get('employeeId');

    const where = employeeId ? { employeeId } : {};

    const requests = await prisma.rewardRequest.findMany({
      where,
      include: {
        employee: { select: { fullName: true, employeeCode: true, currentDepartment: true } },
        item: true
      },
      orderBy: { requestDate: 'desc' }
    });
    return NextResponse.json(requests);
  } catch (error) {
    console.error('Error fetching reward requests:', error);
    return NextResponse.json({ error: 'Failed to fetch reward requests' }, { status: 500 });
  }
}
