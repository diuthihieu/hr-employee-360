import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q') || '';

    if (!q.trim()) {
      return NextResponse.json({ employees: [], documents: [], events: [], training: [] });
    }

    const employees = await prisma.employee.findMany({
      where: {
        OR: [
          { fullName: { contains: q } },
          { employeeCode: { contains: q } },
          { email: { contains: q } },
          { currentTitle: { contains: q } },
          { currentDepartment: { contains: q } },
        ],
      },
      take: 5,
    });

    const documents = await prisma.document.findMany({
      where: {
        OR: [
          { documentTitle: { contains: q } },
          { documentType: { contains: q } },
          { fileName: { contains: q } },
        ],
      },
      take: 5,
      include: {
        employee: {
          select: { fullName: true, employeeCode: true },
        },
      },
    });

    const events = await prisma.employeeEvent.findMany({
      where: {
        OR: [
          { title: { contains: q } },
          { description: { contains: q } },
          { eventType: { contains: q } },
        ],
      },
      take: 5,
      include: {
        employee: {
          select: { fullName: true, employeeCode: true },
        },
      },
    });

    const training = await prisma.trainingRecord.findMany({
      where: {
        OR: [
          { courseName: { contains: q } },
          { courseCode: { contains: q } },
        ],
      },
      take: 5,
      include: {
        employee: {
          select: { fullName: true, employeeCode: true },
        },
      },
    });

    return NextResponse.json({
      employees,
      documents,
      events,
      training,
    });
  } catch (error) {
    console.error('Error in global search:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
