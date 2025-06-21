import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Fetch event details and comments
export async function GET(
  request: Request,
  { params }: { params: { eventId: string } },
) {
  try {
    const eventId = params.eventId;

    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        timeOptions: true,
        responses: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { error: "Failed to fetch event" },
      { status: 500 },
    );
  }
}

// POST - Add a comment or availability response
export async function POST(
  request: Request,
  { params }: { params: { eventId: string } },
) {
  try {
    const eventId = params.eventId;
    const body = await request.json();

    if (body.type === "comment") {
      // Handle comment creation
      const { userName, content } = body;

      if (!userName || !content) {
        return NextResponse.json(
          { error: "Username and content are required" },
          { status: 400 },
        );
      }

      // For now, create a temporary user or find existing one
      let user = await prisma.user.findFirst({
        where: { name: userName },
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            name: userName,
          },
        });
      }

      // Create the response (which serves as our comment system)
      const response = await prisma.response.create({
        data: {
          userId: user.id,
          eventId: eventId,
        },
        include: {
          user: true,
        },
      });

      return NextResponse.json(response);
    } else if (body.type === "availability") {
      // Handle availability submission
      const { userName, availability } = body;

      if (!userName || !availability) {
        return NextResponse.json(
          { error: "Username and availability are required" },
          { status: 400 },
        );
      }

      // Find or create user
      let user = await prisma.user.findFirst({
        where: { name: userName },
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            name: userName,
          },
        });
      }

      // Create response for availability
      const response = await prisma.response.create({
        data: {
          userId: user.id,
          eventId: eventId,
        },
        include: {
          user: true,
        },
      });

      // Here you would also create availability records
      // This depends on how you want to structure the availability data
      // For now, we'll just return the response

      return NextResponse.json(response);
    } else {
      return NextResponse.json(
        { error: "Invalid request type" },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 },
    );
  }
}
