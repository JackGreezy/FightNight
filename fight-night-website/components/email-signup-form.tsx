"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { API_ENDPOINTS } from "./api-config"

export default function EmailSignupForm() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const [error, setError] = useState("")
  const { toast } = useToast()

  // Validate email with regex
  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email)
  }

  // Handle email input
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)

    if (value && !validateEmail(value)) {
      setError("Please enter a valid email address")
      setIsValid(false)
    } else {
      setError("")
      setIsValid(value !== "")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address.",
        variant: "destructive",
      })
      return
    }

    if (!validateEmail(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      console.log(`Submitting email to ${API_ENDPOINTS.EMAIL_SIGNUP}`)

      // Submit to API
      const response = await fetch(API_ENDPOINTS.EMAIL_SIGNUP, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const result = await response.json()
      console.log("API response:", result)

      if (result.success) {
        toast({
          title: "Success!",
          description:
            "You've been added to our waiting list. We'll keep you updated on all White Collar Fight Night events!",
          duration: 5000,
        })
        setEmail("")
      } else {
        toast({
          title: "Submission Error",
          description: result.message || "There was a problem with your signup.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Connection Error",
        description: "Unable to connect to the API server. Please make sure the server is running.",
        variant: "destructive",
        duration: 7000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            className={error ? "border-red-500" : ""}
            required
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
        <Button
          type="submit"
          disabled={isSubmitting || !isValid}
          className="bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-600"
        >
          {isSubmitting ? "Signing up..." : "Sign Up"}
        </Button>
      </div>
      <p className="text-xs text-gray-500">We respect your privacy. Unsubscribe at any time.</p>
    </form>
  )
}

