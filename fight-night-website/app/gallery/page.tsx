import Link from "next/link"
import Image from "next/image"
import { MainNav } from "@/components/main-nav"
import { Instagram } from "lucide-react"

export default function GalleryPage() {
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
                <h1 className="text-3xl font-bold tracking-tighter md:text-4xl text-white">GALLERY</h1>
                <div className="w-24 h-1 bg-red-500 mx-auto"></div>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">Photos coming soon.</p>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl mt-4">
                  <Link
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 flex items-center justify-center gap-2"
                  >
                    <Instagram className="h-5 w-5" />
                    Follow us on Instagram for updates
                  </Link>
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
                  <div key={item} className="relative aspect-square overflow-hidden rounded-lg">
                    <Image
                      src={`/placeholder.svg?height=400&width=400&text=Gallery+${item}`}
                      alt={`Gallery image ${item}`}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
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

