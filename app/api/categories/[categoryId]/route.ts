import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,
    { params }: { params: { categoryId: string } }) {
    try {
        if (!params.categoryId) {
            return new NextResponse("Category id is required", { status: 400 });
        }

        const category = await prisma.category.findUnique({ where: { id: params.categoryId } })

        if (!category) {
            return new NextResponse("Category not found", { status: 404 })
        }
        return NextResponse.json(category)
    } catch (error) {
        return new NextResponse('Internal error', { status: 500 })
    }
}

export async function DELETE(req: NextRequest,
    { params }: { params: { categoryId: string } }) {
    try {
        if (!params.categoryId) {
            return new NextResponse("Category id is required", { status: 400 });
        }

        const category = await prisma.category.findUnique({ where: { id: params.categoryId } })

        if (!category) {
            return new NextResponse("Category not found", { status: 404 })
        }

        await prisma.category.delete({
            where: {
                id: params.categoryId
            },
        });

        return new NextResponse(null, { status: 200 });
    } catch (error) {
        return new NextResponse('Internal error', { status: 500 })
    }
}


export async function PATCH(req: NextRequest,
    { params }: { params: { categoryId: string } }) {
    try {
        const body = await req.json();

        const { name } = body;

        if (!params.categoryId) {
            return new NextResponse("Category id is required", { status: 400 });
        }

        const existingCategory = await prisma.category.findUnique({ where: { id: params.categoryId } })

        if (!existingCategory) {
            return new NextResponse("Category not found", { status: 404 })
        }

        const category = await prisma.category.update({
            where: {
                id: params.categoryId
            },
            data: { name },
        });

        return NextResponse.json(category);
    } catch (error) {
        return new NextResponse('Internal error', { status: 500 })
    }
}

