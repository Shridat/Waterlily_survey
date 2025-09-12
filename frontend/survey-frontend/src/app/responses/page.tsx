"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Navbar from "@/components/ui/Navbar"
export default function ResponsesPage() {
  const [responses, setResponses] = useState<any[]>([])

  useEffect(()=>{
    const fetchResponses  = async () =>{
        try{
            const res = await fetch('api/responses')
            if(res.ok){
                const data = await res.json()
                console.log(data)
                console.log(data.response)
                setResponses(data.response)
            }
        }catch(err){
            console.log(err)
        }
    }
    fetchResponses()
  },[])
  console.log(responses)
  if (responses.length === 0) {
    return <p className="text-center mt-10">No responses submitted yet.</p>
  }

  return (
    <>
    <Navbar></Navbar>
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">📋 Your Survey Responses</h1>

      <div className="w-full max-w-2xl space-y-4 overflow-hidden rounded-md border">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[30%]">Questions</TableHead>
                    <TableHead className="w-[50%]">Description</TableHead>
                    <TableHead className="w-[30%]">Answers</TableHead>
                    <TableHead className="w-[20%]">Submitted At</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {responses.map((resp)=>(
                    <TableRow key={resp.id}>
                <TableCell className="font-medium">{resp.questions.title}</TableCell>
                <TableCell>{resp.questions.description}</TableCell>
                <TableCell>{resp.value}</TableCell>
                <TableCell>
                  {new Date(resp.submittedAt).toLocaleString()}
                </TableCell>
              </TableRow>
                ))}
            </TableBody>
        </Table>
      </div>
    </div>
    </>
  )
}
