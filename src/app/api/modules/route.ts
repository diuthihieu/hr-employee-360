import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const modules = await prisma.module.findMany({
      orderBy: { displayOrder: 'asc' },
      include: {
        fields: {
          orderBy: { displayOrder: 'asc' }
        }
      }
    });
    return NextResponse.json(modules);
  } catch (error) {
    console.error('Error fetching modules:', error);
    return NextResponse.json({ error: 'Failed to fetch modules' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Ensure displayOrder is a number
    if (data.displayOrder) {
      data.displayOrder = parseInt(data.displayOrder, 10);
    }
    
    const newModule = await prisma.module.create({
      data,
    });
    
    return NextResponse.json(newModule, { status: 201 });
  } catch (error) {
    console.error('Error creating module:', error);
    return NextResponse.json({ error: 'Failed to create module' }, { status: 500 });
  }
}
