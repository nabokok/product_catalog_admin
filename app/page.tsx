'use client'

import { CreateProduct } from "@/components/dashboard/createProduct/createProduct"
import { paths } from "@/constants/paths"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function Home() {
  return (
    <CreateProduct />
  )
}
