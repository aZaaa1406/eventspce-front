"use client";

import { usePathname } from "next/navigation";
import NavBarHome from "@/components/nav-bar-home";

export default function NavbarWrapper() {
  const pathname = usePathname();

  const isHomepage = pathname === "/" || pathname.startsWith("/formsAuth") || pathname.startsWith("/forgot-password") || pathname.startsWith("/reset-password") || pathname.startsWith("/unauthorized") || pathname.startsWith("/terms-and-conditions") || pathname.startsWith("/privacy-policy") || pathname.startsWith("/about-us") || pathname.startsWith("/contact-us") || pathname.startsWith("/reset-password");  

  return isHomepage ? <NavBarHome /> : null;
}
