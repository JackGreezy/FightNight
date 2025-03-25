import Link from "next/link"
import { MainNav } from "@/components/main-nav"

export default function FAQPage() {
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
                <h1 className="text-3xl font-bold tracking-tighter md:text-4xl text-white">FAQ</h1>
                <div className="w-24 h-1 bg-red-500 mx-auto"></div>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                  Answers to frequently asked questions about our events.
                </p>
              </div>
              <div className="grid gap-4 mt-8 w-full max-w-3xl text-left">
                {[
                  {
                    question: "Who can participate in the fights?",
                    answer:
                      "Anyone 18 or older who passes our medical screening can apply to participate. No prior boxing experience is necessary.",
                  },
                  {
                    question: "How long is the training period?",
                    answer:
                      "Participants typically train for 8-12 weeks before the event under professional supervision.",
                  },
                  {
                    question: "Is it safe?",
                    answer:
                      "Safety is our top priority. All matches are supervised by licensed officials, and participants wear protective gear.",
                  },
                  {
                    question: "How can I get tickets?",
                    answer:
                      "Tickets will be available online once the event date is announced. Sign up for our mailing list to be notified.",
                  },
                  {
                    question: "What should I wear to the event?",
                    answer:
                      "The dress code is casual to semi-formal. Many attendees dress up for the occasion, but there's no strict requirement.",
                  },
                  {
                    question: "Are there food and drinks available?",
                    answer:
                      "Yes, the venue will have food and beverage options available for purchase during the event.",
                  },
                  {
                    question: "Can I sponsor a fighter or the event?",
                    answer: "We offer various sponsorship packages. Please contact us for more information.",
                  },
                  {
                    question: "How are fighters matched?",
                    answer:
                      "Fighters are matched based on weight, age, fitness level, and experience to ensure fair and competitive bouts.",
                  },
                ].map((faq, index) => (
                  <div key={index} className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                    <h3 className="text-xl font-bold text-red-500 mb-2">{faq.question}</h3>
                    <p className="text-gray-300">{faq.answer}</p>
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

