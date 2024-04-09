
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get('page')) || 1;
    const perPage = Number(searchParams.get('perPage')) || 5;
    const skip = (page - 1) * perPage;

    const products = await prisma.$transaction([
      prisma.product.findMany({
        include: { category: true },
        skip,
        take: perPage
      }),
      prisma.product.count()
    ]);
    const [productsPerPage, productsCount] = products;
    return NextResponse.json({ productsPerPage, productsCount });
  } catch (error) {
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

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

export async function DELETE(req: NextRequest) {
  try {
    const { ids } = await req.json();
    await prisma.product.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    return new NextResponse('Bulk deletion successful', { status: 200 });
  } catch (error) {
    return new NextResponse('Internal error', { status: 500 })
  }

}