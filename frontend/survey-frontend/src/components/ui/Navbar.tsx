import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu"
import Link from "next/link"
import { Button } from "./button"
import { useRouter } from "next/navigation"
export default function Navbar(){
    const router = useRouter()
    const handleLogout = async ()=>{
      try{
        const res = await fetch('api/auth/logout',{
          method: "POST",
          credentials: "include",
        })
        if(res.ok){
            router.push('/')
        }else {
        console.error("Failed to logout")
        }
      }catch(err){
        console.log(err)
      }
  }
return(
<nav className="w-full bg-white shadow px-6 py-3 flex justify-between items-center">
        {/* App name */}
        <Link href="/" className="text-xl font-bold text-gray-800">
            Waterlily
        </Link>

        {/* Navigation menu */}
        <NavigationMenu>
            <NavigationMenuList className="flex gap-4 items-center">
            <NavigationMenuItem>
                <Link href="/survey" legacyBehavior passHref>
                <NavigationMenuLink className="px-3 py-2 text-gray-700 hover:text-black">
                    Survey
                </NavigationMenuLink>
                </Link>
                <Link href="/responses" legacyBehavior passHref>
                <NavigationMenuLink className="px-3 py-2 text-gray-700 hover:text-black">
                    Responses
                </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <Button variant="outline" onClick={handleLogout}>Logout</Button>
            </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
        </nav>)
}