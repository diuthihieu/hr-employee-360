import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const status = searchParams.get('status') || '';
    const department = searchParams.get('department') || '';

    const where: any = {};

    if (status && status !== 'ALL') {
      where.employmentStatus = status;
    }

    if (department && department !== 'ALL') {
      where.currentDepartment = department;
    }

    if (query) {
      where.OR = [
        { fullName: { contains: query } },
        { employeeCode: { contains: query } },
        { email: { contains: query } },
        { currentTitle: { contains: query } },
        { currentDepartment: { contains: query } },
      ];
    }

    const employees = await prisma.employee.findMany({
      where,
      orderBy: { employeeCode: 'asc' },
      include: {
        _count: {
          select: {
            documents: true,
            events: true,
            trainingRecords: true,
          },
        },
      },
    });

    return NextResponse.json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    return NextResponse.json({ error: 'Failed to fetch employees' }, { status: 500 });
  }
}
