"use client"

import Link from "next/link"
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="w-full bg-white shadow px-6 py-3 flex justify-between items-center">
      {/* App name */}
      <Link href="/" className="text-xl font-bold text-gray-800">
        Waterlily
      </Link>

      {/* Navigation menu */}
      <NavigationMenu>
        <NavigationMenuList className="flex gap-4 items-center">
          <NavigationMenuItem>
            <Link href="/responses" legacyBehavior passHref>
              <NavigationMenuLink className="px-3 py-2 text-gray-700 hover:text-black">
                Responses
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Button variant="outline">Logout</Button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  )
}
