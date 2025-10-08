// components/ui/header.jsx
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./button";
import { ChevronDown, FileText, GraduationCap, LayoutDashboard, PenBox, StarsIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { CheckUser } from "@/lib/checkUser";

export default async function Header() {
  const user = await CheckUser(); // works now, server-only

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="w-full px-4">
        <nav className="w-full h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image src="/logo1.png" alt="MakeYourCareer" width={200} height={60} className="h-12 w-auto object-contain" priority />
          </Link>

          <div className="flex items-center space-x-2 md:space-x-4">
            <SignedIn>
              <Link href="/dashboard">
                <Button>
                  <LayoutDashboard className="h-4 w-4" />
                  <span className="hidden md:block">Industry Insights</span>
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>
                    <StarsIcon className="h-4 w-4" />
                    <span className="hidden md:block">Growth Tools</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link href="/resume" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span>Build Resume</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/ai-cover-letter" className="flex items-center gap-2">
                      <PenBox className="h-4 w-4" />
                      <span>Cover Letter</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/interview" className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      <span>Interview Preparation</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SignedIn>

            <SignedOut>
              <SignInButton>
                <Button variant="outline">Sign in</Button>
              </SignInButton>
              <SignUpButton>
                <Button variant="outline">Sign Up</Button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                    userButtonPopoverCard: "shadow-xl",
                    userPreviewMainIdentifier: "font-semibold",
                  },
                }}
                afterSignOutUrl="/"
              />
            </SignedIn>
          </div>
        </nav>
      </div>
    </header>
  );
}
