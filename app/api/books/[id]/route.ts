import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";

const createBookSchema = z.object({
  title: z.string().min(1).max(255),
  author: z.string().min(1).max(255),
  description: z.string().min(1),
});

// // get a book by id
// export async function GET(request: NextRequest) {
//   try {
    
//     console.log("Fetching book with ID:", id);

//     // Check if the ID is a valid integer
//     const parsedId = parseInt(id, 10);
//     if (isNaN(parsedId)) {
//       return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
//     }

//     const book = await prisma.book.findUnique({
//       where: { id: parsedId },
//     });
//     console.log("Fetched book:", book);

//     if (book) {
//       return NextResponse.json(book, { status: 200 });
//     } else {
//       return NextResponse.json({ error: "Book not found" }, { status: 404 });
//     }
//   } catch (error) {
//     console.error("Error fetching book:", error);
//     return NextResponse.json(
//       { error: "Error fetching books" },
//       { status: 500 }
//     );
//   }
// }

// update a book by id
// export async function PUT(request: NextRequest, params: { id: string }) {
//   try {
//     const { id } = params;
//     const { title, author, description, availble } = await request.json();

//     const validation = createBookSchema.safeParse({
//       title,
//       author,
//       description,
//       availble,
//     });
//     if (!validation.success) {
//       return NextResponse.json(validation.error.errors, { status: 400 });
//     }

//     const updatedBook = await prisma.book.update({
//       where: { id: parseInt(id, 10) },
//       data: {
//         title: title,
//         author: author,
//         description: description,
//         availble: availble,
//       },
//     });

//     return NextResponse.json(updatedBook, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: "Error updating book" }, { status: 500 });
//   }
// }

// delete a book by id
export async function DELETE(request: NextRequest, params: { id: string }) {
  try {
    const { id } = await request.json();
    await prisma.book.delete({ where: { id: parseInt(id, 10) } });
    return NextResponse.json({ message: "Book deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting book" }, { status: 500 });
  }
}
