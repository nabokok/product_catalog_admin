'use client'

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function DashboardPage() {
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/login')
        },
    });



    if (status === 'loading') {
        return 'loading...'
    }
    return (
        <h1>Dashboard</h1>
    )
}