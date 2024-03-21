
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await prisma.product.findMany()
    return NextResponse.json(products)
  } catch (error) {
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      categoryId,
      color,
      capacity,
      price,
      fullPrice,
      screen,
      ram,
      year,
      images,
      colorsAvailable,
      capacityAvailable,
      description,
      resolution,
      processor,
      cell,
    } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    if (!color) {
      return new NextResponse("Color is required", { status: 400 });
    }

    if (!capacity) {
      return new NextResponse("Capacity is required", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }

    if (!fullPrice) {
      return new NextResponse("Full price is required", { status: 400 });
    }

    if (!screen) {
      return new NextResponse("Screen is required", { status: 400 });
    }

    if (!ram) {
      return new NextResponse("Ram is required", { status: 400 });
    }

    if (!year) {
      return new NextResponse("Year is required", { status: 400 });
    }

    if (!images) {
      return new NextResponse("Images is required", { status: 400 });
    }

    if (!colorsAvailable) {
      return new NextResponse("Colors available is required", { status: 400 });
    }

    if (!capacityAvailable) {
      return new NextResponse("Capacity available is required", { status: 400 });
    }

    if (!description) {
      return new NextResponse("Description is required", { status: 400 });
    }

    if (!resolution) {
      return new NextResponse("Resolution is required", { status: 400 });
    }

    if (!processor) {
      return new NextResponse("Processor is required", { status: 400 });
    }

    if (!cell) {
      return new NextResponse("Cell is required", { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        ...body
      },
    });

    return NextResponse.json(product)
  } catch (error) {
    return new NextResponse('Internal error', { status: 500 })
  }

}