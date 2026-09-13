import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const totalEmployees = await prisma.employee.count();
    const activeEmployees = await prisma.employee.count({
      where: { employmentStatus: 'ACTIVE' },
    });
    const probationEmployees = await prisma.employee.count({
      where: { employmentStatus: 'PROBATION' },
    });
    const terminatedEmployees = await prisma.employee.count({
      where: { employmentStatus: 'TERMINATED' },
    });
    const offboardingEmployees = await prisma.employee.count({
      where: { employmentStatus: 'OFFBOARDING' },
    });

    const totalDocuments = await prisma.document.count();
    const validDocuments = await prisma.document.count({
      where: { documentStatus: 'VALID' },
    });
    const cancelledDocuments = await prisma.document.count({
      where: { documentStatus: 'CANCELLED' },
    });
    const supersededDocuments = await prisma.document.count({
      where: { documentStatus: 'SUPERSEDED' },
    });

    const trainingAgg = await prisma.trainingRecord.aggregate({
      _sum: {
        learningHours: true,
      },
      _avg: {
        score: true,
      },
      _count: {
        id: true,
      },
    });

    const attendanceAgg = await prisma.attendanceSummary.aggregate({
      _sum: {
        workingHours: true,
        otHours: true,
      },
    });

    const totalMovements = await prisma.employeeEvent.count({
      where: {
        eventType: {
          in: ['TRANSFER', 'APPOINTMENT', 'PROJECT_CHANGE', 'CONCURRENT_ASSIGNMENT', 'PROBATION'],
        },
      },
    });

    const recentEvents = await prisma.employeeEvent.findMany({
      take: 6,
      orderBy: { eventDate: 'desc' },
      include: {
        employee: {
          select: {
            fullName: true,
            employeeCode: true,
            avatarUrl: true,
            currentDepartment: true,
          },
        },
        documents: true,
      },
    });

    return NextResponse.json({
      metrics: {
        activeEmployees,
        totalEmployees,
        probationEmployees,
        terminatedEmployees,
        offboardingEmployees,
        totalDocuments,
        validDocuments,
        cancelledDocuments,
        supersededDocuments,
        totalTrainingHours: trainingAgg._sum.learningHours || 0,
        avgTrainingScore: Math.round((trainingAgg._avg.score || 0) * 10) / 10,
        totalTrainingCourses: trainingAgg._count.id || 0,
        totalWorkingHours: attendanceAgg._sum.workingHours || 0,
        totalOtHours: attendanceAgg._sum.otHours || 0,
        totalMovements,
      },
      recentEvents,
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json({ error: 'Failed to load dashboard' }, { status: 500 });
  }
}
