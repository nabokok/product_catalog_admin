'use client';

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"


export default function LoginPage() {
    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Login</h1>
                    </div>
                    <div className="grid gap-4">
                        <Button
                            className="w-full"
                            onClick={(e) => {
                                e.preventDefault()
                                signIn('github', { callbackUrl: '/dashboard' })
                            }}
                        >
                            Login with GitHub
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                        >
                            Login with Google
                        </Button>
                    </div>
                </div>
            </div>
            <div className="hidden bg-muted lg:block">
                <Image
                    src="/images/login_page_img.jpeg"
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}
