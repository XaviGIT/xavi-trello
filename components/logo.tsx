import Image from "next/image"
import Link from "next/link"
import { Oswald } from "next/font/google";
import { cn } from "@/lib/utils";

const headingFont = Oswald({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700"]
})

export const Logo = () => {
    return (
        <Link href="/">
            <div className="hover-opacity-75 transition items-center gap-x-2 hidden md:flex">
                <Image src="/logo.svg" alt="Taskify Logo" width={30} height={30} />
                <p className={cn("text-lg text-neutral-700 pb-1", headingFont.className)}>Taskify</p>
            </div>
        </Link>
    )
}