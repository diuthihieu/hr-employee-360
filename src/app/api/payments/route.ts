import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const employeeId = searchParams.get('employeeId');

    const where = employeeId ? { employeeId } : {};

    const records = await prisma.paymentRecord.findMany({
      where,
      include: {
        employee: {
          select: { fullName: true, employeeCode: true, currentTitle: true }
        }
      },
      orderBy: { paymentDate: 'desc' }
    });
    
    return NextResponse.json(records);
  } catch (error) {
    console.error('Error fetching payment records:', error);
    return NextResponse.json({ error: 'Failed to fetch payment records' }, { status: 500 });
  }
}
