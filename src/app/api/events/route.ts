import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { CreateEventInput } from '@/types/event';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body: CreateEventInput = await request.json();
    
    // Create a temporary user for now (we'll implement proper auth later)
    const tempUser = await prisma.user.create({
      data: {
        name: 'Temporary User',
      },
    });

    // Create the event
    const event = await prisma.event.create({
      data: {
        title: body.title,
        description: body.description,
        creatorId: tempUser.id,
        timeOptions: {
          create: body.timeOptions.map(option => ({
            dayOfWeek: option.dayOfWeek,
            date: option.date ? new Date(option.date) : null,
            startTime: option.startTime,
            endTime: option.endTime,
            timezone: option.timezone,
          })),
        },
      },
      include: {
        timeOptions: true,
      },
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
} 