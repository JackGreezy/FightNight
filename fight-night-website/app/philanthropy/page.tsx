import Link from "next/link"
import { MainNav } from "@/components/main-nav"

export default function PhilanthropyPage() {
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
        <section className="w-full py-12 md:py-24 relative">
          <div className="absolute inset-0 w-full h-full z-0 bg-black">
            <div className="stars-container">
              <div className="stars"></div>
              <div className="stars2"></div>
              <div className="stars3"></div>
            </div>
          </div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter md:text-4xl text-white">PHILANTHROPY</h1>
                <div className="w-24 h-1 bg-red-500 mx-auto"></div>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                  Our events support local charities and community initiatives.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                  <h3 className="text-xl font-bold text-red-500 mb-2">OUR MISSION</h3>
                  <p className="text-gray-300">
                    To raise funds and awareness for local charities while providing an unforgettable experience for
                    participants and spectators.
                  </p>
                </div>
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                  <h3 className="text-xl font-bold text-red-500 mb-2">IMPACT</h3>
                  <p className="text-gray-300">
                    Our events have raised thousands of dollars for various causes throughout Texas.
                  </p>
                </div>
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                  <h3 className="text-xl font-bold text-red-500 mb-2">GET INVOLVED</h3>
                  <p className="text-gray-300">
                    Become a sponsor, volunteer, or participant to help make a difference in our community.
                  </p>
                </div>
              </div>
              <div className="mt-12 max-w-3xl">
                <h2 className="text-2xl font-bold text-white mb-6">Our Charity Partners</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div
                      key={item}
                      className="bg-black p-4 rounded-lg border border-gray-800 flex items-center justify-center"
                    >
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gray-800 rounded-full mx-auto mb-2"></div>
                        <p className="text-white font-medium">Charity {item}</p>
                      </div>
                    </div>
                  ))}
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
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} Texas Fight Collective. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

