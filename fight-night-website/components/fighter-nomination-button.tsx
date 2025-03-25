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
import { useToast } from "@/hooks/use-toast"
import { API_ENDPOINTS } from "./api-config"

export default function FighterNominationButton() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  // Form state
  const [yourName, setYourName] = useState("")
  const [yourEmail, setYourEmail] = useState("")
  const [nomineeName, setNomineeName] = useState("")
  const [nomineeEmail, setNomineeEmail] = useState("")
  const [nomineePhone, setNomineePhone] = useState("")
  const [reason, setReason] = useState("")
  const [isFormValid, setIsFormValid] = useState(false)
  const [formErrors, setFormErrors] = useState({
    yourEmail: "",
    nomineeEmail: "",
    nomineePhone: "",
  })

  // Validate email with regex
  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email)
  }

  // Handle your email input
  const handleYourEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setYourEmail(value)

    if (value && !validateEmail(value)) {
      setFormErrors({ ...formErrors, yourEmail: "Please enter a valid email address" })
    } else {
      setFormErrors({ ...formErrors, yourEmail: "" })
    }
  }

  // Handle nominee email input
  const handleNomineeEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setNomineeEmail(value)

    if (value && !validateEmail(value)) {
      setFormErrors({ ...formErrors, nomineeEmail: "Please enter a valid email address" })
    } else {
      setFormErrors({ ...formErrors, nomineeEmail: "" })
    }
  }

  // Handle nominee phone input - only allow 10 digits
  const handleNomineePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "") // Remove non-digits
    if (value.length <= 10) {
      setNomineePhone(value)

      if (value.length > 0 && value.length < 10) {
        setFormErrors({ ...formErrors, nomineePhone: "Phone number must be 10 digits" })
      } else {
        setFormErrors({ ...formErrors, nomineePhone: "" })
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

  // Check form validity
  useEffect(() => {
    const isValid =
      yourName !== "" &&
      validateEmail(yourEmail) &&
      nomineeName !== "" &&
      validateEmail(nomineeEmail) &&
      reason !== "" &&
      !formErrors.yourEmail &&
      !formErrors.nomineeEmail &&
      !formErrors.nomineePhone

    setIsFormValid(isValid)
  }, [yourName, yourEmail, nomineeName, nomineeEmail, reason, formErrors])

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
        yourName,
        yourEmail,
        nomineeName,
        nomineeEmail,
        nomineePhone: nomineePhone || undefined,
        reason,
      }

      console.log(`Submitting fighter nomination to ${API_ENDPOINTS.FIGHTER_NOMINATION}`)

      // Submit to API
      const response = await fetch(API_ENDPOINTS.FIGHTER_NOMINATION, {
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
          title: "Nomination Submitted!",
          description: `Thank you for nominating ${nomineeName}! We'll reach out to them about participating in White Collar Fight Night.`,
          duration: 6000,
        })

        // Reset form
        setYourName("")
        setYourEmail("")
        setNomineeName("")
        setNomineeEmail("")
        setNomineePhone("")
        setReason("")
        setOpen(false)
      } else {
        toast({
          title: "Submission Error",
          description: result.message || "There was a problem submitting your nomination.",
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
        <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
          Nominate a Fighter
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-black border border-gray-800">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Fighter Nomination</DialogTitle>
            <DialogDescription>
              Know someone who would be great for the White Collar Fight Night? Nominate them here.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="yourName">Your Name</Label>
              <Input id="yourName" value={yourName} onChange={(e) => setYourName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="yourEmail">Your Email</Label>
              <Input
                id="yourEmail"
                type="email"
                value={yourEmail}
                onChange={handleYourEmailChange}
                required
                className={formErrors.yourEmail ? "border-red-500" : ""}
              />
              {formErrors.yourEmail && <p className="text-red-500 text-xs mt-1">{formErrors.yourEmail}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="nomineeName">Nominee's Name</Label>
              <Input id="nomineeName" value={nomineeName} onChange={(e) => setNomineeName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nomineeEmail">Nominee's Email</Label>
              <Input
                id="nomineeEmail"
                type="email"
                value={nomineeEmail}
                onChange={handleNomineeEmailChange}
                required
                className={formErrors.nomineeEmail ? "border-red-500" : ""}
              />
              {formErrors.nomineeEmail && <p className="text-red-500 text-xs mt-1">{formErrors.nomineeEmail}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="nomineePhone">Nominee's Phone (if known)</Label>
              <Input
                id="nomineePhone"
                type="tel"
                value={formatPhone(nomineePhone)}
                onChange={handleNomineePhoneChange}
                className={formErrors.nomineePhone ? "border-red-500" : ""}
                placeholder="(123) 456-7890"
              />
              {formErrors.nomineePhone && <p className="text-red-500 text-xs mt-1">{formErrors.nomineePhone}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Why would they be a good fighter?</Label>
              <Textarea id="reason" value={reason} onChange={(e) => setReason(e.target.value)} required />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={isSubmitting || !isFormValid}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600"
            >
              {isSubmitting ? "Submitting..." : "Submit Nomination"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

