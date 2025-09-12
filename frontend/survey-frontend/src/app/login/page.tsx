"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export function LoginCard() {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const {toast} = useToast()
    const router = useRouter()
    const [error,setError] = useState("")
    const handleLogin= async (e:React.FormEvent)=>{
        e.preventDefault()
        console.log("Login data:", { email, password })
        try{
                const res = await fetch("api/auth/login",{
                    method:"POST",
                    headers:{ "Content-Type": "application/json" },
                    body :JSON.stringify({email,password}),
                    credentials:"include"
                })
                if(res.status===200){
                    router.push("/survey")
                    return
                }
                if(res.status===409){
                    setError("User does not exist!")
                    return
                }
                const data = res.json()
                console.log("response",data)
        }catch(err){
            alert("login failed!!")
        }
        }
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value = {email}
                onChange={(e)=>setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
            <Button type="submit" className="w-full">
                Login
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Link href="/signup" className="w-full">
          <Button variant="link" className="w-full">
            Don’t have an account? Sign up
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
