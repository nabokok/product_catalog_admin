
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const products = await prisma.product.findMany()
        return NextResponse.json(products)
    } catch(error) {
        return new NextResponse('Internal error', {status: 500})
    }
}

// export async function POST(request:  NextRequest) {
//     const res = await request.json();
//     return NextResponse.json({data: res})
// }