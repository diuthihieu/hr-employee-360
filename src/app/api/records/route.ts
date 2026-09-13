import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const moduleId = searchParams.get('moduleId');
    const employeeId = searchParams.get('employeeId');

    const where: any = {};
    if (moduleId) where.moduleId = moduleId;
    if (employeeId) where.employeeId = employeeId;

    const records = await prisma.record.findMany({
      where,
      include: {
        values: {
          include: { field: true }
        },
        module: true,
      },
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json(records);
  } catch (error) {
    console.error('Error fetching records:', error);
    return NextResponse.json({ error: 'Failed to fetch records' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { moduleId, employeeId, values } = data;
    
    // values is expected to be an array of { fieldId, stringValue, numberValue, etc. }
    
    const newRecord = await prisma.record.create({
      data: {
        moduleId,
        employeeId,
        values: {
          create: values
        }
      },
      include: {
        values: true
      }
    });
    
    return NextResponse.json(newRecord, { status: 201 });
  } catch (error) {
    console.error('Error creating record:', error);
    return NextResponse.json({ error: 'Failed to create record' }, { status: 500 });
  }
}
