"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export function MainNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const items = [
    {
      title: "Home",
      href: "/",
    },
    // {
    //   title: "Events",
    //   href: "/#events",
    // },
    // {
    //   title: "About",
    //   href: "/#about",
    // },
    // {
    //   title: "Philanthropy",
    //   href: "/#philanthropy",
    // },
    {
      title: "Contact",
      href: "/contact",
    },
  ]

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-8">
        <Link href="/" className="text-red-500 hover:text-red-400 transition-colors font-medium">
          HOME
        </Link>
        {/* <div className="relative group">
          <Link
            href="/events"
            className="flex items-center text-white hover:text-red-400 transition-colors font-medium"
          >
            EVENTS
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-1"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </Link>
          <div className="absolute left-0 mt-2 w-48 bg-black border border-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
            <Link href="/events/upcoming" className="block px-4 py-2 text-sm text-white hover:bg-gray-800">
              Upcoming Events
            </Link>
            <Link href="/events/past" className="block px-4 py-2 text-sm text-white hover:bg-gray-800">
              Past Events
            </Link>
          </div>
        </div> */}
        {/* <Link href="/about" className="text-white hover:text-red-400 transition-colors font-medium">
          ABOUT
        </Link> */}
        <Link href="/gallery" className="text-blue-500 hover:text-blue-400 transition-colors font-medium">
          GALLERY
        </Link>

        {/* <Link href="/philanthropy" className="text-white hover:text-red-400 transition-colors font-medium">
          PHILANTHROPY
        </Link> */}

        <Link href="/faq" className="text-blue-500 hover:text-blue-400 transition-colors font-medium">
          FAQ
        </Link>
      </nav>

      {/* Mobile Navigation Button */}
      <button className="md:hidden text-white focus:outline-none" onClick={toggleMenu} aria-label="Toggle menu">
        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-black border-b border-gray-800 z-50 md:hidden">
          <div className="flex flex-col p-4 space-y-4">
            <Link
              href="/"
              className="text-red-500 hover:text-red-400 transition-colors font-medium"
              onClick={toggleMenu}
            >
              HOME
            </Link>
            {/* <div className="space-y-2">
              <Link
                href="/events"
                className="text-white hover:text-red-400 transition-colors font-medium"
                onClick={toggleMenu}
              >
                EVENTS
              </Link>
              <div className="pl-4 space-y-2 mt-2">
                <Link
                  href="/events/upcoming"
                  className="block text-sm text-gray-300 hover:text-red-400"
                  onClick={toggleMenu}
                >
                  Upcoming Events
                </Link>
                <Link
                  href="/events/past"
                  className="block text-sm text-gray-300 hover:text-red-400"
                  onClick={toggleMenu}
                >
                  Past Events
                </Link>
              </div>
            </div> */}
            {/* <Link
              href="/about"
              className="text-white hover:text-red-400 transition-colors font-medium"
              onClick={toggleMenu}
            >
              ABOUT
            </Link> */}
            <Link
              href="/gallery"
              className="text-blue-500 hover:text-blue-400 transition-colors font-medium"
              onClick={toggleMenu}
            >
              GALLERY
            </Link>

            {/* <Link
              href="/philanthropy"
              className="text-white hover:text-red-400 transition-colors font-medium"
              onClick={toggleMenu}
            >
              PHILANTHROPY
            </Link> */}

            <Link
              href="/faq"
              className="text-blue-500 hover:text-blue-400 transition-colors font-medium"
              onClick={toggleMenu}
            >
              FAQ
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

