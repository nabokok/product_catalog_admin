

import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const categories = await prisma.category.findMany()
        return NextResponse.json(categories)
    } catch(error) {
        return new NextResponse('Internal error', {status: 500})
    }
}

export async function POST(req:  NextRequest) {
    try {
        const body = await req.json();

        const { name } = body;

        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
          }

        const existingCategory = await prisma.category.findFirst({ where: { name } });

        if (existingCategory) {
              return new NextResponse("Category already exists", { status: 409 });
        }
    
        const category = await prisma.category.create({
            data: {
             name
            },
          });
    
        return NextResponse.json(category)
    } catch (error) {
        return new NextResponse('Internal error', {status: 500})
    }
    
}