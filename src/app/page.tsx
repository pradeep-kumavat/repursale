"use client"

import { useAuth, SignInButton, SignUpButton } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { BookOpen, ArrowRight } from "lucide-react"

export default function LandingPage() {
  const { isSignedIn } = useAuth()
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard")
    }
    setIsVisible(true)
  }, [isSignedIn, router])

  return (
    <div className={`min-h-screen bg-gray-900 text-gray-100 ${isVisible ? "fade-in" : ""}`}>
      <header className="bg-gray-800 bg-opacity-50 backdrop-blur-md fixed w-full z-10">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-blue-400 mr-2" />
            <span className="font-bold text-xl text-white">Repursale</span>
          </div>
          <div className="hidden md:flex space-x-6">
            {["Features", "How It Works", "Testimonials", "FAQ"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="text-gray-300 hover:text-blue-400 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <SignInButton mode="modal">
              <button className="text-gray-300 hover:text-blue-400 transition-colors flex items-center">Sign In</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center">
                Sign Up
              </button>
            </SignUpButton>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 md:py-40 bg-gray-800">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-white animate-fade-in-up">
                Simplify Your Business Finances with <span className="text-blue-400">Repursale</span>
              </h1>
              <p className="text-xl md:text-2xl mb-12 text-gray-300 animate-fade-in-up animation-delay-300">
                Track purchases, monitor sales, and gain intelligent insights to empower your business decisions
              </p>
              <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6 animate-fade-in-up animation-delay-600">
                <SignUpButton mode="modal">
                  <button className="w-full md:w-auto bg-blue-600 text-white px-8 py-4 rounded-md text-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </SignUpButton>
                <a
                  href="#features"
                  className="w-full md:w-auto bg-gray-700 text-gray-100 px-8 py-4 rounded-md text-lg font-semibold hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gray-900">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">Why Choose Repursale?</h2>
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
              ].map((feature, index) => (
                <div
                  key={feature.title}
                  className="bg-gray-800 p-8 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 animate-fade-in-up"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="text-4xl mb-6">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-4 text-white">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-gray-800">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">How Repursale Works</h2>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-12 md:space-y-0 md:space-x-12">
              {[
                { step: 1, title: "Sign Up", description: "Create your account in minutes" },
                { step: 2, title: "Input Data", description: "Easily enter your purchases and sales data" },
                { step: 3, title: "Analyze", description: "Get powerful insights for your business" },
              ].map((item, index) => (
                <div
                  key={item.step}
                  className="text-center animate-fade-in-up"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="bg-blue-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 transform transition-transform duration-500 hover:scale-110">
                    <span className="text-2xl font-bold text-white">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-white">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-gray-900">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">What Our Customers Say</h2>
            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  quote: "Repursale has revolutionized how I manage my business finances. It's intuitive and powerful!",
                  author: "Sarah J., Small Business Owner",
                },
                {
                  quote:
                    "The insights I get from Repursale have helped me make better business decisions. Highly recommended!",
                  author: "Mike T., Entrepreneur",
                },
                {
                  quote: "I love how easy it is to track my purchases and sales. Repursale has saved me so much time!",
                  author: "Emily R., Freelancer",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-gray-800 p-8 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 animate-fade-in-up"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <p className="mb-6 text-gray-300">{testimonial.quote}</p>
                  <p className="font-semibold text-blue-400">{testimonial.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-gray-800">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">Frequently Asked Questions</h2>
            <div className="space-y-8 max-w-3xl mx-auto">
              {[
                {
                  question: "How secure is my data?",
                  answer:
                    "We use industry-standard encryption and security measures to protect your data. Your privacy and security are our top priorities.",
                },
                {
                  question: "Can I export my data?",
                  answer:
                    "Yes, you can export your data in various formats, including CSV and PDF, for your records or further analysis.",
                },
                {
                  question: "Is there a mobile app?",
                  answer: "We're currently developing mobile apps for iOS and Android. Stay tuned for their release!",
                },
                {
                  question: "What kind of support do you offer?",
                  answer:
                    "We offer email support for all users, with priority support available for higher-tier plans.",
                },
              ].map((faq, index) => (
                <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 200}ms` }}>
                  <h3 className="text-xl font-semibold mb-4 text-white">{faq.question}</h3>
                  <p className="text-gray-300">{faq.answer}</p>
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
              <span className="text-2xl font-bold flex items-center">
                <BookOpen className="h-8 w-8 text-blue-400 mr-2" />
                Repursale
              </span>
              <p className="text-sm text-gray-400 mt-2">© 2023 Repursale. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              {["Terms", "Privacy", "Contact"].map((item) => (
                <a key={item} href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

