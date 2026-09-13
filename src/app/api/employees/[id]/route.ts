import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const employee = await prisma.employee.findUnique({
      where: { id },
      include: {
        events: {
          orderBy: { eventDate: 'desc' },
          include: {
            documents: true,
          },
        },
        documents: {
          orderBy: { documentDate: 'desc' },
          include: {
            parentDocument: true,
          },
        },
        trainingRecords: {
          orderBy: { completionDate: 'desc' },
        },
        performanceReviews: {
          orderBy: { reviewDate: 'desc' },
        },
        competencyAssessments: {
          orderBy: { assessmentDate: 'desc' },
          include: {
            scores: true,
          },
        },
        attendanceSummaries: {
          orderBy: [{ year: 'desc' }, { month: 'desc' }],
        },
        offboardingCases: true,
      },
    });

    if (!employee) {
      return NextResponse.json({ error: 'Employee not found' }, { status: 404 });
    }

    return NextResponse.json(employee);
  } catch (error) {
    console.error('Error fetching employee 360 profile:', error);
    return NextResponse.json({ error: 'Failed to fetch employee details' }, { status: 500 });
  }
}
