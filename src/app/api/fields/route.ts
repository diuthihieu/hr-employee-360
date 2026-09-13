import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    if (data.displayOrder) {
      data.displayOrder = parseInt(data.displayOrder, 10);
    }
    
    const newField = await prisma.fieldDefinition.create({
      data,
    });
    
    return NextResponse.json(newField, { status: 201 });
  } catch (error) {
    console.error('Error creating field:', error);
    return NextResponse.json({ error: 'Failed to create field' }, { status: 500 });
  }
}
