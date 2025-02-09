"use client";
import React, { useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { usePathname } from "next/navigation";

export const NGOLogo = () => {
  return (
    <Link color="foreground" href="/">
      <img src="JC-logo.png" alt="JC Logo" className="responsiveLogo" />
    </Link>
  );
};

export default function App() {
  const router = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // Close the menu when the route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [router]);

  return (
    <Navbar
      className="bgt"
      isMenuOpen={isMenuOpen} // Controlled state for the menu
      onMenuOpenChange={setIsMenuOpen} // Update state when menu opens/closes
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden links"
        />
        <NavbarBrand>
          <NGOLogo />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={router === "/"}>
          <Link
            className={router === "/" ? undefined : "links"}
            href="/"
            color={router === "/" ? undefined : "foreground"}
          >
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            className={router === "/contact" ? undefined : "links"}
            href="/contact"
            color={router === "/contact" ? undefined : "foreground"}
          >
            Contact
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            className={router === "/int" ? undefined : "links"}
            color={router === "/int" ? undefined : "foreground"}
            href="/int"
          >
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} href="/find-a-hospital" variant="flat">
            Find A Hospital
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem>
          <Link className={router === "/" ? undefined : "linksm"} href="/" size="lg">
            Home
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            className={router === "/contact" ? undefined : "linksm"}
            href="/contact"
            size="lg"
          >
            Contact
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            className={router === "/int" ? undefined : "linksm"}
            href="/int"
            size="lg"
          >
            Integrations
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}