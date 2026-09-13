import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || '';
    const status = searchParams.get('status') || '';
    const query = searchParams.get('q') || '';
    const employeeId = searchParams.get('employeeId') || '';

    const where: any = {};

    if (type && type !== 'ALL') {
      where.documentType = type;
    }

    if (status && status !== 'ALL') {
      where.documentStatus = status;
    }

    if (employeeId) {
      where.employeeId = employeeId;
    }

    if (query) {
      where.OR = [
        { documentTitle: { contains: query } },
        { fileName: { contains: query } },
        { sourcePath: { contains: query } },
        { employee: { fullName: { contains: query } } },
        { employee: { employeeCode: { contains: query } } },
      ];
    }

    const documents = await prisma.document.findMany({
      where,
      orderBy: { documentDate: 'desc' },
      include: {
        employee: {
          select: {
            id: true,
            fullName: true,
            employeeCode: true,
            currentDepartment: true,
            currentTitle: true,
            employmentStatus: true,
          },
        },
        parentDocument: true,
      },
    });

    return NextResponse.json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    return NextResponse.json({ error: 'Failed to fetch documents' }, { status: 500 });
  }
}
