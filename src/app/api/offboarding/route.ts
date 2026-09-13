import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const employeeId = searchParams.get('employeeId');

    const where = employeeId ? { employeeId } : {};

    const records = await prisma.offboardingCase.findMany({
      where,
      include: {
        employee: {
          select: { fullName: true, employeeCode: true, currentTitle: true, currentDepartment: true }
        }
      },
      orderBy: { resignationDate: 'desc' }
    });
    
    return NextResponse.json(records);
  } catch (error) {
    console.error('Error fetching offboarding cases:', error);
    return NextResponse.json({ error: 'Failed to fetch offboarding cases' }, { status: 500 });
  }
}
