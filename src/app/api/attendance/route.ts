import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const employeeId = searchParams.get('employeeId');
    const year = searchParams.get('year');
    const month = searchParams.get('month');

    const where: any = {};
    if (employeeId) where.employeeId = employeeId;
    if (year) where.year = parseInt(year, 10);
    if (month) where.month = parseInt(month, 10);

    const summaries = await prisma.attendanceSummary.findMany({
      where,
      include: {
        employee: {
          select: { fullName: true, employeeCode: true, currentTitle: true, currentDepartment: true }
        }
      },
      orderBy: [
        { year: 'desc' },
        { month: 'desc' },
        { employee: { fullName: 'asc' } }
      ]
    });
    
    return NextResponse.json(summaries);
  } catch (error) {
    console.error('Error fetching attendance summaries:', error);
    return NextResponse.json({ error: 'Failed to fetch attendance summaries' }, { status: 500 });
  }
}
