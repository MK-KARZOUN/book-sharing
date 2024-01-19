import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";

const createBookSchema = z.object({
  title: z.string().min(1).max(255),
  author: z.string().min(1).max(255),
  description: z.string().min(1),
});

type Book = {
  id: number;
  title: string;
  author: string;
  description: string;
  status: boolean;
};

// get a book by id
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const bookId = params.id;

    // Check if the ID is a valid integer
    const parsedId = parseInt(bookId, 10);
    if (isNaN(parsedId)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const book = await prisma.book.findUnique({
      where: { id: parsedId },
    });

    if (book) {
      return NextResponse.json(book, { status: 200 });
    } else {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Prisma Fetch Error:", error);
    return NextResponse.json(
      { error: "Error fetching books" },
      { status: 500 }
    );
  }
}

// update a book by id
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const bookId = params.id;
    const body: Book = await request.json();

    if (body.title || body.author || body.description) {
      const title = body.title;
      const author = body.author;
      const description = body.description;
      const validation = createBookSchema.safeParse({
        title,
        author,
        description,
      });

      if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 });
      }
    }

    const updatedBook = await prisma.book.update({
      where: { id: parseInt(bookId, 10) },
      data: {
        title: body.title,
        author: body.author,
        description: body.description,
        status: body.status || true,
      },
    });

    return NextResponse.json(updatedBook, { status: 200 });
  } catch (error) {
    console.error("Prisma Update Error:", error);
    return NextResponse.json({ error: "Error updating book" }, { status: 500 });
  }
}

// delete a book by id
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const bookId = params.id;
    console.log("Deleting book with ID:", bookId);
    await prisma.book.delete({ where: { id: parseInt(bookId, 10) } });
    return NextResponse.json({ message: "Book deleted" }, { status: 200 });
  } catch (error) {
    console.error("Prisma Delete Error:", error);
    return NextResponse.json({ error: "Error deleting book" }, { status: 500 });
  }
}
