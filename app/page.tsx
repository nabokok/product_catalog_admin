'use client'

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function Home() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login')
    },
  })

  if (session) {
    redirect('/dashboard')
  }

  return null;
}