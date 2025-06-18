import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: params.eventId },
      include: {
        creator: { select: { id: true, name: true, email: true } },
        responses: {
          include: {
            user: { select: { id: true, name: true, email: true } },
          },
        },
        timeOptions: {
          select: {
            id: true,
            date: true,
            dayOfWeek: true,
            startTime: true,
            endTime: true,
            timezone: true,
            availabilities: {
              include: {
                user: { select: { id: true, name: true, email: true } },
              },
            },
          },
        },
      },
    });
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }
    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch event' }, { status: 500 });
  }
}
