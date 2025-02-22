"use client"
import { BookOpen } from "lucide-react"
import Link from "next/link"

export default function privacy() {
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
          <h1 className="text-4xl font-bold mb-8 text-white">Privacy Policy</h1>
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">1. Information We Collect</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Account information (name, email, business details)</li>
                <li>Transaction data (purchases, sales, financial records)</li>
                <li>Usage information (how you interact with our services)</li>
                <li>Communication preferences</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">2. How We Use Your Information</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Provide and maintain our services</li>
                <li>Process your transactions</li>
                <li>Send you important updates and notifications</li>
                <li>Improve our services and develop new features</li>
                <li>Protect against fraud and unauthorized access</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">3. Data Security</h2>
              <p className="text-gray-300 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing, accidental loss, destruction, or damage. However, please note that no method of transmission over the Internet or electronic storage is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">4. Data Sharing</h2>
              <p className="text-gray-300 leading-relaxed">
                We do not sell your personal information. We may share your information with third-party service providers who assist us in operating our platform, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">5. Your Rights</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                You have certain rights regarding your personal data:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Right to access your personal data</li>
                <li>Right to correct inaccurate data</li>
                <li>Right to request deletion of your data</li>
                <li>Right to restrict processing of your data</li>
                <li>Right to data portability</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">6. Cookies and Tracking</h2>
              <p className="text-gray-300 leading-relaxed">
                We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">7. Contact Us</h2>
              <p className="text-gray-300 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at privacy@repursale.com.
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