import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const employeeId = searchParams.get('employeeId');

    const where = employeeId ? { employeeId } : {};

    const records = await prisma.competencyAssessment.findMany({
      where,
      include: {
        employee: {
          select: { fullName: true, employeeCode: true, currentTitle: true, currentDepartment: true }
        },
        scores: true
      },
      orderBy: { assessmentDate: 'desc' }
    });
    
    return NextResponse.json(records);
  } catch (error) {
    console.error('Error fetching competency records:', error);
    return NextResponse.json({ error: 'Failed to fetch competency records' }, { status: 500 });
  }
}
