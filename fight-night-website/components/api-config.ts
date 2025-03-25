// Central place to configure API URL
// Use environment variable if available, otherwise fallback to the Vercel deployment URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://v0-white-collar-fight-site.vercel.app/";

export const API_ENDPOINTS = {
  HEALTH: `${API_BASE_URL}/api/health`,
  EMAIL_SIGNUP: `${API_BASE_URL}/api/email-signup`,
  FIGHTER_APPLICATION: `${API_BASE_URL}/api/fighter-application`,
  FIGHTER_NOMINATION: `${API_BASE_URL}/api/fighter-nomination`,
}

export default API_BASE_URL

