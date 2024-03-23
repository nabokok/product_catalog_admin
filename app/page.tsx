'use client'

import { CreateProduct } from "@/components/dashboard/createProduct/createProduct"
import { paths } from "@/constants/paths"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function Home() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect(paths.auth.signIn)
    },
  })

  if (session) {
    redirect(paths.dashboard.products)
  }

  return null;
}
