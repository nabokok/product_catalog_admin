import type { Metadata } from "next";
import { NavBar } from "@/components/dashboard/layout/nav-bar";
import { Header } from "@/components/dashboard/layout/header";


export const metadata: Metadata = {
    title: "Dashboard"
};

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <NavBar />
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <Header />
                <div>{children}</div>
            </div>
        </div >
    );
}
