"use client"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
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
import { Toast } from "@radix-ui/react-toast"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"


export default function SignUpCard() {
    const {toast} = useToast()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const router = useRouter()
    const [error,setError] = useState("")
    const handleSignUp = async (e:React.FormEvent)=>{
        e.preventDefault()
        if(password!=confirmPassword){
            setError("Password does not match!!")
            return
        }
        console.log("Login data:", { email, password })
        try{
            const res = await fetch("api/auth/signup",{
                method:"POST",
                headers:{ "Content-Type": "application/json" },
                body :JSON.stringify({email,password})
            })
            if(res.status===200){
                router.push("/survey")
                return
            }
             if (res.status === 409) {
                setError("User already exist!! try to login")
                return
            }
            const data = res.json()
            console.log("response",data)
        }catch(err){
            console.log(err);
        }
    }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sign up for an account</CardTitle>
        <CardDescription>
          Enter your details below to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignUp}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} required />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
            <Button type="submit" className="w-full">
                Sign Up
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Link href="/" className="w-full">
          <Button variant="link" className="w-full">
            Already have an account? Login
          </Button>
        </Link>
      </CardFooter>
    </Card>
    </div>
  )
}
