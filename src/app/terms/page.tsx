"use client"
import { BookOpen } from "lucide-react"
import Link from "next/link"

export default function terms() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <header className="bg-gray-900/95 backdrop-blur-lg shadow-lg">
        <nav className="container mx-auto px-6 py-4">
          <Link href="/" className="flex items-center group w-fit">
            <BookOpen className="h-8 w-8 text-blue-400 mr-2 transition-transform group-hover:scale-110 duration-300" />
            <span className="font-bold text-xl text-white group-hover:text-blue-400 transition-colors duration-300">
              Repursale
            </span>
          </Link>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-white">Terms and Conditions</h1>
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">1. Acceptance of Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                By accessing and using Repursale, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">2. Use of Services</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                You agree to use Repursale services only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of your account information and for all activities under your account.
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>You must be at least 18 years old to use our services</li>
                <li>You must provide accurate and complete information when creating an account</li>
                <li>You are responsible for maintaining the security of your account credentials</li>
                <li>You agree not to share your account access with third parties</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">3. Data Usage and Privacy</h2>
              <p className="text-gray-300 leading-relaxed">
                Your use of Repursale is also governed by our Privacy Policy. We collect and use your information as described in our Privacy Policy, which is incorporated into these Terms by reference.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">4. Service Modifications</h2>
              <p className="text-gray-300 leading-relaxed">
                We reserve the right to modify, suspend, or discontinue any part of our services at any time. We will provide notice of significant changes when possible, but are not obligated to do so.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">5. Termination</h2>
              <p className="text-gray-300 leading-relaxed">
                We reserve the right to terminate or suspend your account and access to our services at our discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">6. Limitation of Liability</h2>
              <p className="text-gray-300 leading-relaxed">
                Repursale and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">7. Contact Information</h2>
              <p className="text-gray-300 leading-relaxed">
                If you have any questions about these Terms, please contact us at legal@repursale.com.
              </p>
            </section>
          </div>

          <div className="mt-12 p-6 bg-gray-800 rounded-lg">
            <p className="text-gray-300 text-sm">
              Last updated: February 22, 2025
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}