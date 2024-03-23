import { config } from "@/config";
import { Metadata } from "next";

export const metadata = { title: `Sign in | Auth | ${config.site.name}` } satisfies Metadata;

function SignInLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {children}
        </div>
    )
}

export default SignInLayout;
