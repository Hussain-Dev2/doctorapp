"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

function Header() {
  const User = useKindeBrowserClient();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    console.log(User);
  }, [User]);
  const Menu = [
    { id: 1, title: "Home", link: "/" },
    { id: 2, title: "About", link: "/about" },
    { id: 3, title: "Contact", link: "/contact" },
  ];
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-4 py-3 border-b border-border/60 bg-background/70 glass">
      <div className="flex items-center gap-10">
        <Link href="/">
          <Image
            className="cursor-pointer transition-transform duration-200 hover:scale-[1.03]"
            src="/asset/health.png"
            alt="MediInfo logo"
            width={56}
            height={56}
            priority
          />
        </Link>
        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className="flex items-center gap-6 lg:gap-10 text-sm">
            {Menu.map((item) => (
              <li key={item.id} className="cursor-pointer">
                <Link href={item.link}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Only render theme-dependent UI after mount */}
        {mounted && (
          <>
            <Button
              className="rounded-full w-12"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? "🌞" : "🌙"}
            </Button>

            {User?.isAuthenticated ? (
              <LogoutLink>
                <Button className="hidden sm:inline-flex">Log out</Button>
                
              </LogoutLink>
            ) : (
              <LoginLink>
                <Button className="hidden sm:inline-flex">Get Started</Button>
                
              </LoginLink>
            )}
             
          </>
        )}
      </div>
      {/*import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";

<LoginLink>Sign in</LoginLink>

<RegisterLink>Sign up</RegisterLink>*/}
    </header>
  );
}

export default Header;
