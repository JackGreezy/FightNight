"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { API_ENDPOINTS } from "./api-config"

export default function FightApplicationButton() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  // Form state
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [jobCompany, setJobCompany] = useState("")
  const [experience, setExperience] = useState("0")
  const [why, setWhy] = useState("")
  const [charity, setCharity] = useState("")
  const [isFormValid, setIsFormValid] = useState(false)
  const [formErrors, setFormErrors] = useState({
    weight: "",
    height: "",
    phone: "",
    email: "",
  })

  // Validate email with regex
  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email)
  }

  // Handle weight input - only allow integers
  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Only allow digits
    if (value === "" || /^\d+$/.test(value)) {
      setWeight(value)
      setFormErrors({ ...formErrors, weight: "" })
    } else {
      setFormErrors({ ...formErrors, weight: "Please enter only whole numbers" })
    }
  }

  // Handle height input - only allow integers
  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Only allow digits
    if (value === "" || /^\d+$/.test(value)) {
      setHeight(value)
      setFormErrors({ ...formErrors, height: "" })
    } else {
      setFormErrors({ ...formErrors, height: "Please enter only whole numbers" })
    }
  }

  // Handle phone input - only allow 10 digits
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "") // Remove non-digits
    if (value.length <= 10) {
      setPhone(value)

      if (value.length === 10) {
        setFormErrors({ ...formErrors, phone: "" })
      } else if (value.length > 0) {
        setFormErrors({ ...formErrors, phone: "Phone number must be 10 digits" })
      } else {
        setFormErrors({ ...formErrors, phone: "" })
      }
    }
  }

  // Format phone for display
  const formatPhone = (phone: string) => {
    if (phone.length === 0) return ""
    if (phone.length <= 3) return phone
    if (phone.length <= 6) return `(${phone.slice(0, 3)}) ${phone.slice(3)}`
    return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`
  }

  // Handle email input
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)

    if (value && !validateEmail(value)) {
      setFormErrors({ ...formErrors, email: "Please enter a valid email address" })
    } else {
      setFormErrors({ ...formErrors, email: "" })
    }
  }

  // Check form validity
  useEffect(() => {
    const isValid =
      firstName !== "" &&
      lastName !== "" &&
      weight !== "" &&
      height !== "" &&
      phone.length === 10 &&
      validateEmail(email) &&
      jobCompany !== "" &&
      why !== "" &&
      !formErrors.weight &&
      !formErrors.height &&
      !formErrors.phone &&
      !formErrors.email

    setIsFormValid(isValid)
  }, [firstName, lastName, weight, height, phone, email, jobCompany, why, formErrors])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Additional validation before submission
    if (!isFormValid) {
      toast({
        title: "Form Error",
        description: "Please correct all errors before submitting.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Prepare form data
      const formData = {
        firstName,
        lastName,
        email,
        phone,
        jobCompany,
        weight,
        height,
        experience,
        why,
        charity,
      }

      console.log(`Submitting fighter application to ${API_ENDPOINTS.FIGHTER_APPLICATION}`)

      // Submit to API
      const response = await fetch(API_ENDPOINTS.FIGHTER_APPLICATION, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()
      console.log("API response:", result)

      if (result.success) {
        toast({
          title: "Application Submitted!",
          description:
            "Thank you for applying to fight! We've received your application and will be in touch soon about next steps.",
          duration: 6000,
        })

        // Reset form
        setFirstName("")
        setLastName("")
        setWeight("")
        setHeight("")
        setPhone("")
        setEmail("")
        setJobCompany("")
        setExperience("0")
        setWhy("")
        setCharity("")
        setOpen(false)
      } else {
        toast({
          title: "Submission Error",
          description: result.message || "There was a problem submitting your application.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Unable to connect to the API server. Please make sure the server is running.",
        variant: "destructive",
        duration: 7000,
      })
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-red-600 text-white hover:bg-red-700">Apply to Fight</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-black border border-gray-800">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Fighter Application</DialogTitle>
            <DialogDescription>
              Fill out this form to apply as a fighter for the White Collar Fight Night.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
                className={formErrors.email ? "border-red-500" : ""}
              />
              {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formatPhone(phone)}
                onChange={handlePhoneChange}
                required
                className={formErrors.phone ? "border-red-500" : ""}
                placeholder="(123) 456-7890"
              />
              {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobCompany">Job and Company</Label>
              <Input id="jobCompany" value={jobCompany} onChange={(e) => setJobCompany(e.target.value)} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (lbs)</Label>
                <Input
                  id="weight"
                  type="text"
                  inputMode="numeric"
                  value={weight}
                  onChange={handleWeightChange}
                  required
                  className={formErrors.weight ? "border-red-500" : ""}
                />
                {formErrors.weight && <p className="text-red-500 text-xs mt-1">{formErrors.weight}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height (inches)</Label>
                <Input
                  id="height"
                  type="text"
                  inputMode="numeric"
                  value={height}
                  onChange={handleHeightChange}
                  required
                  className={formErrors.height ? "border-red-500" : ""}
                />
                {formErrors.height && <p className="text-red-500 text-xs mt-1">{formErrors.height}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Previous Boxing/Fighting Experience</Label>
              <Select value={experience} onValueChange={setExperience}>
                <SelectTrigger id="experience">
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">None</SelectItem>
                  <SelectItem value="6-12">6-12 months</SelectItem>
                  <SelectItem value="1-2">1-2 years</SelectItem>
                  <SelectItem value="2-3">2-3 years</SelectItem>
                  <SelectItem value="3+">3+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="why">Why do you want to participate?</Label>
              <Textarea id="why" value={why} onChange={(e) => setWhy(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="charity">Is there a charity or organization you would like to fundraise for?</Label>
              <Input id="charity" value={charity} onChange={(e) => setCharity(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={isSubmitting || !isFormValid}
              className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

