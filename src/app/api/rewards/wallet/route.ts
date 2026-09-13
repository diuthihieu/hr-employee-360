import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const employeeId = searchParams.get('employeeId');

    if (!employeeId) {
      // For global view, maybe aggregate or return all transactions? 
      // For now, let's just return all transactions if no employeeId is provided
      const transactions = await prisma.walletTransaction.findMany({
        include: {
          employee: { select: { fullName: true, employeeCode: true, currentDepartment: true } }
        },
        orderBy: { transactionDate: 'desc' },
        take: 100 // limit to recent 100 for global view
      });
      return NextResponse.json(transactions);
    }

    // Get specific employee's wallet details
    const transactions = await prisma.walletTransaction.findMany({
      where: { employeeId },
      orderBy: { transactionDate: 'desc' }
    });

    const totalPoints = transactions.reduce((acc, t) => acc + t.points, 0);

    return NextResponse.json({ transactions, totalPoints });
  } catch (error) {
    console.error('Error fetching wallet:', error);
    return NextResponse.json({ error: 'Failed to fetch wallet' }, { status: 500 });
  }
}
