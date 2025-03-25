"use client"

import { useState, useEffect } from "react"
import { API_ENDPOINTS } from "./api-config"

export default function ApiStatusChecker() {
  const [status, setStatus] = useState<"checking" | "connected" | "error">("checking")
  const [message, setMessage] = useState("Checking API connection...")

  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        console.log("Checking API health at:", API_ENDPOINTS.HEALTH)

        const response = await fetch(API_ENDPOINTS.HEALTH, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        })

        if (response.ok) {
          const data = await response.json()
          setStatus("connected")
          setMessage(`API connected successfully: ${data.message}`)
        } else {
          setStatus("error")
          setMessage(`API returned status: ${response.status}`)
        }
      } catch (error) {
        console.error("API connection error:", error)
        setStatus("error")
        setMessage("Cannot connect to API. Make sure your API is deployed correctly.")
      }
    }

    checkApiStatus()
  }, [])

  return (
    <div className="fixed bottom-4 right-4 p-3 rounded-md shadow-md z-50 text-sm font-mono">
      {status === "checking" && <div className="bg-yellow-100 text-yellow-800 p-2 rounded">{message}</div>}
      {status === "connected" && <div className="bg-green-100 text-green-800 p-2 rounded">✅ {message}</div>}
      {status === "error" && <div className="bg-red-100 text-red-800 p-2 rounded">❌ {message}</div>}
    </div>
  )
}

