"use client"

import Link from "next/link"
import Image from "next/image"
import { Instagram, Mail } from "lucide-react"
import EmailSignupForm from "@/components/email-signup-form"
import FightApplicationButton from "@/components/fight-application-button"
import FighterNominationButton from "@/components/fighter-nomination-button"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
// Import the API status checker at the top of your page component
import ApiStatusChecker from "@/components/api-status-checker"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight text-red-600">TEXAS FIGHT COLLECTIVE</span>
          </Link>
          <MainNav />
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          {/* Starry Background */}
          <div className="absolute inset-0 w-full h-full z-0 bg-black">
            <div className="stars-container">
              <div className="stars"></div>
              <div className="stars2"></div>
              <div className="stars3"></div>
            </div>
          </div>

          <div className="container px-4 md:px-6 relative z-20">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="flex flex-col items-center justify-center">
                  <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
                    <span className="block bg-gradient-to-r from-red-600 via-white to-blue-600 text-transparent bg-clip-text">
                      WHITE COLLAR
                    </span>
                    <span className="block bg-gradient-to-r from-red-600 via-white to-blue-600 text-transparent bg-clip-text">
                      FIGHT NIGHT
                    </span>
                  </h1>
                  <div className="w-24 h-24 relative my-4">
                    <div className="w-full h-full border-4 border-red-500 border-r-blue-600 border-b-blue-600 transform rotate-45"></div>
                  </div>
                  <h2 className="text-xl md:text-2xl font-medium text-white tracking-widest">AUSTIN, TEXAS</h2>
                </div>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl mt-8">
                  First event coming soon, details to follow.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <FightApplicationButton />
                <Button
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                  onClick={() => document.getElementById("email-list")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Stay Up To Date
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section id="events" className="w-full py-12 md:py-24 relative">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-white">EVENTS</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-red-600 via-white to-blue-600 mx-auto"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 w-full max-w-4xl">
                <div className="bg-gray-900 p-6 rounded-lg border border-red-600">
                  <h3 className="text-xl font-bold text-red-500 mb-2">LOCATION</h3>
                  <p>Austin, Texas</p>
                  <p>Venue TBA</p>
                </div>
                <div className="bg-gray-900 p-6 rounded-lg border border-white/30">
                  <h3 className="text-xl font-bold text-white mb-2">DATE</h3>
                  <p>Coming Soon</p>
                </div>
                <div className="bg-gray-900 p-6 rounded-lg border border-blue-600">
                  <h3 className="text-xl font-bold text-blue-500 mb-2">TICKETS</h3>
                  <p>Available Soon</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-12 md:py-24 bg-gradient-to-b from-black to-blue-950/50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-red-500">ABOUT THE EVENT</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-red-600 via-white to-blue-600 mx-auto mt-4"></div>
            </div>
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-red-500">Austin&apos;s First White Collar Fight Night</h2>

                <p className="text-gray-300 text-lg leading-relaxed">
                  A passion project of a local coach who has trained multiple national and regional champions looking to
                  share his passion for boxing by creating a platform for newcomers to train and showcase their newfound
                  talents.
                </p>

                <p className="text-gray-300 text-lg leading-relaxed">
                  By bringing fresh attention to the sport, White Collar Fight Night helps grow and support local boxing
                  communities while delivering an unforgettable night of action-packed matchups, drinks, and music.
                </p>

                <div className="pt-4">
                  <p className="text-2xl font-bold text-white">
                    Get ready for Austin&apos;s premier boxing event of the year!!!
                  </p>
                </div>
              </div>
              <div className="relative h-[300px] overflow-hidden rounded-lg border-2 border-blue-600">
                <Image src="/placeholder.svg?height=600&width=800" alt="Boxing ring" fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Email List Section */}
        <section id="email-list" className="w-full py-12 md:py-24 bg-gradient-to-b from-black to-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-blue-500">STAY UPDATED</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-red-600 via-white to-blue-600 mx-auto mt-4"></div>
                <p className="text-gray-300 text-lg mt-6">
                  Sign up for our mailing list to receive the latest news about White Collar Fight Night events, ticket
                  releases, and fighter announcements.
                </p>
                <div className="max-w-md mx-auto mt-8">
                  <EmailSignupForm />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sign Up Section */}
        <section id="signup" className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-red-500">JOIN THE FIGHT</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-red-600 via-white to-blue-600 mx-auto mt-4"></div>
            </div>
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <p className="text-gray-300">
                  Whether you want to step into the ring, nominate a fighter, or just stay updated on event details,
                  we've got you covered. Sign up today to be part of this exciting event.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <FightApplicationButton />
                  <FighterNominationButton />
                </div>
              </div>
              <div className="space-y-4 bg-gradient-to-br from-gray-900 to-blue-950/30 p-6 rounded-lg border border-gray-800">
                <h3 className="text-xl font-bold text-blue-500">UPCOMING EVENTS</h3>
                <p className="text-gray-300">More events coming soon:</p>
                <ul className="list-disc pl-5 text-gray-300 space-y-2">
                  <li>New York</li>
                  <li>Chicago</li>
                  <li>Nashville</li>
                  <li>More locations TBA</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Then add it to your page JSX */}
      <ApiStatusChecker />
      <footer className="w-full border-t border-gray-800 bg-black text-white py-6">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold tracking-tight text-red-600">TEXAS FIGHT COLLECTIVE</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-red-500 transition-colors"
              >
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="mailto:info@texasfightcollective.com"
                className="text-white hover:text-red-500 transition-colors"
              >
                <Mail className="h-6 w-6" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} Texas Fight Collective. All rights reserved.
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <div className="h-1 w-full max-w-md bg-gradient-to-r from-red-600 via-white to-blue-600"></div>
          </div>
        </div>
      </footer>
    </div>
  )
}

