"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/ui/Navbar";
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast";

export default function SurveyPage(){
    const router = useRouter()
    const {toast} = useToast()
    const [questions,setQuestions] = useState<any[]>([])
    const [answers,setAnswers] = useState<{ questionId: number; value: string }[]>([])
    const [currentIndex,setCurrentIndex] = useState(0)
    const [error, setError] = useState("")
    useEffect(()=>{
        const fetchQuestions = async()=>{
            try{
                const res = await fetch('api/survey')
                if(res.ok){
                    const data = await res.json()
                    setQuestions(data.questions)
                    console.log(data.questions)

                }
            }catch(err){
                console.error("Failed to fetch questions:", err)
            }
        }
        fetchQuestions()
    },[])
    if (questions.length === 0) {
        return <p className="text-center mt-10">Loading questions...</p>
    }
    const currentQuestion = questions[currentIndex]
    console.log(questions)
    console.log(typeof questions)
    console.log(currentQuestion)
    const handleNext = ()=>{
        const currentAnswer  = answers.find((a)=>a.questionId===currentQuestion.id)?.value||""
        if (!currentAnswer.trim()) {
            setError("This field is required")
            return
        }
        console.log(error)
        setError("")
        setCurrentIndex((prev) => Math.min(prev + 1, questions.length - 1))
    }
    const handleAnswerChange = (questionId:number,value:string)=>{
        setAnswers((prev)=>{
            const existing = prev.find((a) => a.questionId === questionId)
            if (existing) {
            // update existing
            return prev.map((a) =>
                a.questionId === questionId ? { ...a, value } : a
            )
            } else {
            // add new
            return [...prev, { questionId, value }]
            }
        })
    } 
    const handleSubmit = async () => {
  try {
    const res = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ answers }), // ✅ send directly
    })

    if (res.ok) {
      toast({ title: "Survey submitted!", description: "Thank you 🎉" })
      router.push("/responses")
    } else {
      toast({ title: "Error", description: "Failed to submit survey", variant: "destructive" })
    }
  } catch (err) {
    console.error("Error submitting:", err)
  }
}

    return(
    <>
            <Navbar/>
            <div className="mb-6 text-center mt-6">
                <h1 className="text-2xl font-bold">Welcome to Waterlily!!</h1>
                <p className="text-muted-foreground">
                Let’s begin your survey! Please answer the following questions.
                </p>
            </div>
            <div className="flex flex-col items-center w-full mb-6">
                <div className="w-[60%] max-w-md">
                    <Progress value={((currentIndex+1)/questions.length)*100}/>
                    <p className="text-sm text-center mt-2 text-muted-foreground">
                        Question {currentIndex + 1} of {questions.length}
                    </p>
                </div>
            </div>
            <div className="flex mt-6 mb-6 items-center justify-center bg-gray-50">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>
                            {currentQuestion.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4">{currentQuestion.description}</p>
                        <Input type = "text" placeholder="Your Answer"
                        value={answers.find((a) => a.questionId === currentQuestion.id)?.value || ""}
  onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)} required></Input>
                        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                    </CardContent>
                    <CardFooter className={currentIndex<questions.length-1?"flex justify-center gap-4":"flex justify-between"}>
                        <Button variant="outline"
                            onClick={()=>setCurrentIndex((prev)=>Math.max(prev - 1, 0))}
                            disabled={currentIndex===0}>
                        <ChevronLeft className="w-4 h-4 mr-2" />Prev</Button>
                        <Button variant ="outline"
                            onClick={handleNext}
                            disabled = {currentIndex===questions.length-1}
                        >
                         Next<ChevronRight className="w-4 h-4 mr-2" />
                        </Button>
                        {currentIndex===questions.length-1 && (
                            <Button
                                className="bg-green-600 text-white ml-auto"
                                onClick={handleSubmit}
                            >
                            Submit
                            </Button>
                        )}
                    </CardFooter>
                </Card>
            </div>
        </>
    )

}