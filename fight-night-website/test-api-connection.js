// Save this as test-api-connection.js and run with: node test-api-connection.js
const fetch = require("node-fetch")

const API_URL = "http://localhost:5000"

async function testConnection() {
  try {
    console.log(`Testing connection to ${API_URL}/api/health...`)
    const response = await fetch(`${API_URL}/api/health`)

    if (response.ok) {
      const data = await response.json()
      console.log("✅ Connection successful!")
      console.log("Response:", data)
    } else {
      console.log(`❌ Server responded with status: ${response.status}`)
    }
  } catch (error) {
    console.log("❌ Connection failed with error:")
    console.log(error.message)

    // Provide troubleshooting advice
    console.log("\nPossible solutions:")
    console.log("1. Make sure your Flask API is running on port 5000")
    console.log("2. Check for any firewall or network issues")
    console.log("3. Verify the API URL is correct")
  }
}

testConnection()

