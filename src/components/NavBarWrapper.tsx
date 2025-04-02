"use client";

import { usePathname } from "next/navigation";
import NavBarHome from "@/components/nav-bar-home";

export default function NavbarWrapper() {
  const pathname = usePathname();

  const isHomepage = pathname === "/" || pathname.startsWith("/formsAuth");

  return isHomepage ? <NavBarHome /> : null;
}
