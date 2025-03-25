import Link from "next/link"
import Image from "next/image"
import { MainNav } from "@/components/main-nav"
import { Instagram, Mail, MapPin, Music, Trophy } from "lucide-react"

export default function AboutPage() {
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
        <section className="w-full py-12 md:py-24 relative overflow-hidden">
          {/* Starry Background */}
          <div className="absolute inset-0 w-full h-full z-0 bg-black">
            <div className="stars-container">
              <div className="stars"></div>
              <div className="stars2"></div>
              <div className="stars3"></div>
            </div>
          </div>

          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-4 text-center mb-12">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-gradient-to-r from-red-600 via-white to-blue-600 text-transparent bg-clip-text">
                ABOUT THE EVENT
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-red-600 via-white to-blue-600 mx-auto"></div>
            </div>

            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="relative h-[400px] overflow-hidden rounded-lg border-2 border-blue-600 shadow-lg shadow-blue-600/20">
                <Image
                  src="/placeholder.svg?height=800&width=600&text=Boxing+Coach"
                  alt="Boxing coach training fighters"
                  fill
                  className="object-cover"
                />
              </div>

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
            </div>

            {/* Features Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg border border-red-600">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mr-4">
                    <Trophy className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Expert Coaching</h3>
                </div>
                <p className="text-gray-300">
                  Train with a coach who has developed national and regional champions, bringing professional-level
                  expertise to newcomers.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg border border-white/30">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4">
                    <MapPin className="h-6 w-6 text-black" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Local Community</h3>
                </div>
                <p className="text-gray-300">
                  Supporting and growing Austin&apos;s boxing community by creating opportunities for new fighters and
                  fans alike.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg border border-blue-600">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                    <Music className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Complete Experience</h3>
                </div>
                <p className="text-gray-300">
                  More than just boxing - enjoy a full night of entertainment with action-packed matchups, drinks, and
                  music.
                </p>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-16 bg-gradient-to-r from-red-900/40 via-black to-blue-900/40 p-8 rounded-lg border border-gray-800">
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold text-white">Be Part of the Action</h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Whether you want to step into the ring or cheer from the sidelines, White Collar Fight Night offers an
                  unforgettable experience for everyone.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                  <Link
                    href="/#signup"
                    className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors font-medium"
                  >
                    Apply to Fight
                  </Link>
                  <Link
                    href="/#signup"
                    className="border border-blue-600 text-blue-500 px-6 py-3 rounded-md hover:bg-blue-600 hover:text-white transition-colors font-medium"
                  >
                    Join Our Mailing List
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
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

