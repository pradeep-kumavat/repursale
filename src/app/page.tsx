"use client"
import { useAuth, SignInButton, SignUpButton } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { BookOpen, ArrowRight, ChevronDown } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  const { isSignedIn } = useAuth()
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard")
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isSignedIn, router])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <header className={`fixed w-full z-10 transition-all duration-300 ${scrolled ? 'bg-gray-900/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center group cursor-pointer">
            <BookOpen className="h-8 w-8 text-blue-400 mr-2 transition-transform group-hover:scale-110 duration-300" />
            <span className="font-bold text-xl text-white group-hover:text-blue-400 transition-colors duration-300">Repursale</span>
          </div>
          <div className="hidden md:flex space-x-8">
            {["Features", "How It Works", "Testimonials", "FAQ"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="relative text-gray-300 hover:text-blue-400 transition-colors duration-300 group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>
          <div className="flex items-center space-x-6">
            <SignInButton mode="modal">
              <button className="text-gray-300 hover:text-blue-400 transition-all duration-300 hover:scale-105">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-600/25">
                Sign Up
              </button>
            </SignUpButton>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:py-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-transparent to-transparent"></div>
          <div className="container mx-auto px-6 relative">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                Simplify Your Business Finances with <span className="text-blue-400">Repursale</span>
              </h1>
              <p className="text-xl md:text-2xl mb-12 text-gray-300">
                Track purchases, monitor sales, and gain intelligent insights to empower your business decisions
              </p>
              <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
                <SignUpButton mode="modal">
                  <button className="group w-full md:w-auto bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/25">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5 inline-block transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </SignUpButton>
                <a
                  href="#features"
                  className="group w-full md:w-auto bg-gray-800 text-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:bg-gray-700 hover:shadow-xl"
                >
                  Learn More
                  <ChevronDown className="ml-2 h-5 w-5 inline-block transition-transform duration-300 group-hover:translate-y-1" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gray-900/50">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
              Why Choose Repursale?
            </h2>
            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  title: "Easy Tracking",
                  icon: "📊",
                  description: "Effortlessly monitor your purchases and sales with our intuitive interface.",
                },
                {
                  title: "Financial Insights",
                  icon: "💡",
                  description: "Gain valuable insights with our comprehensive financial reports.",
                },
                {
                  title: "Time-Saving",
                  icon: "⏱️",
                  description: "Streamline your record-keeping process and focus on growing your business.",
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="group bg-gray-800/50 p-8 rounded-xl shadow-lg transition-all duration-500 hover:shadow-2xl hover:shadow-blue-600/10 hover:bg-gray-800 hover:-translate-y-2"
                >
                  <div className="text-4xl mb-6 transform transition-transform duration-300 group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-blue-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-gray-800/50">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
              How Repursale Works
            </h2>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-12 md:space-y-0 md:space-x-12">
              {[
                { step: 1, title: "Sign Up", description: "Create your account in minutes" },
                { step: 2, title: "Input Data", description: "Easily enter your purchases and sales data" },
                { step: 3, title: "Analyze", description: "Get powerful insights for your business" },
              ].map((item) => (
                <div
                  key={item.step}
                  className="group text-center"
                >
                  <div className="bg-blue-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-600/50">
                    <span className="text-2xl font-bold text-white">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-blue-400 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-gray-900/50">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
              What Our Customers Say
            </h2>
            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  quote: "Repursale has revolutionized how I manage my business finances. It's intuitive and powerful!",
                  author: "Sarah J., Small Business Owner",
                },
                {
                  quote: "The insights I get from Repursale have helped me make better business decisions. Highly recommended!",
                  author: "Mike T., Entrepreneur",
                },
                {
                  quote: "I love how easy it is to track my purchases and sales. Repursale has saved me so much time!",
                  author: "Emily R., Freelancer",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="group bg-gray-800/50 p-8 rounded-xl shadow-lg transition-all duration-500 hover:shadow-2xl hover:shadow-blue-600/10 hover:bg-gray-800 hover:-translate-y-2"
                >
                  <p className="mb-6 text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <p className="font-semibold text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                    {testimonial.author}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-gray-800/50">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <div className="space-y-8 max-w-3xl mx-auto">
              {[
                {
                  question: "How secure is my data?",
                  answer: "We use industry-standard encryption and security measures to protect your data. Your privacy and security are our top priorities.",
                },
                {
                  question: "Can I export my data?",
                  answer: "Yes, you can export your data in various formats, including CSV and PDF, for your records or further analysis.",
                },
                {
                  question: "Is there a mobile app?",
                  answer: "We're currently developing mobile apps for iOS and Android. Stay tuned for their release!",
                },
                {
                  question: "What kind of support do you offer?",
                  answer: "We offer email support for all users, with priority support available for higher-tier plans.",
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="group bg-gray-800/50 p-6 rounded-xl transition-all duration-300 hover:bg-gray-800"
                >
                  <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-blue-400 transition-colors duration-300">
                    {faq.question}
                  </h3>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 py-12 text-white border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Link href="/" className="text-2xl font-bold flex items-center group">
                <BookOpen className="h-8 w-8 text-blue-400 mr-2 transition-transform group-hover:scale-110 duration-300" />
                <span className="group-hover:text-blue-400 transition-colors duration-300">Repursale</span>
              </Link>
              <p className="text-sm text-gray-400 mt-2">© 2025 Repursale. All rights reserved.</p>
            </div>
            <div className="flex space-x-8">
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors duration-300 relative group"
              >
                Terms
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors duration-300 relative group"
              >
                Privacy
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/contact"
                className="text-gray-400 hover:text-white transition-colors duration-300 relative group"
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}