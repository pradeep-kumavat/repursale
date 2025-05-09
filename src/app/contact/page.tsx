"use client"
import { useState } from "react"
import toast, { Toaster } from 'react-hot-toast'
import axios from "axios"
import { BookOpen, Mail, Phone, MapPin, Send } from "lucide-react"
import Link from "next/link"

export default function Contact() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })

  const handleSubmit = async () => {
    try {
      if (!formData.name || !formData.email || !formData.message || !formData.subject) {
        toast.error("All fields are required")
        return;
      }
      if (!loading) {
        const toastId = toast.loading("Sending message...")
        const response = await axios.post("/api/send-msg", formData)
        console.log(response)
        toast.dismiss(toastId)
        toast.success("Message sent successfully")
        setFormData({ name: "", email: "", subject: "", message: "" })
        setLoading(false)
      }
    } catch (error: unknown) {
      toast.error("Failed to send message")
      console.log(error)
      setFormData({ name: "", email: "", subject: "", message: "" })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <Toaster />
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
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center text-white">Contact Us</h1>
          
          <div className="grid md:grid-cols-2 gap-12 mt-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold mb-6 text-blue-400">Get in Touch</h2>
                <p className="text-gray-300 leading-relaxed mb-8">
                  Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4 group">
                  <Mail className="w-6 h-6 text-blue-400 mt-1 transition-transform duration-300 group-hover:scale-110" />
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">Email</h3>
                    <p className="text-gray-300">support@repursale.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <Phone className="w-6 h-6 text-blue-400 mt-1 transition-transform duration-300 group-hover:scale-110" />
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">Phone</h3>
                    <p className="text-gray-300">+91 8458899008</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <MapPin className="w-6 h-6 text-blue-400 mt-1 transition-transform duration-300 group-hover:scale-110" />
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">Address</h3>
                    <p className="text-gray-300">
                      96 Hilink City<br />
                      Near Airport<br />
                      452005 Indore M.P. 
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gray-800 rounded-lg hover:bg-gray-800/80 transition-colors duration-300">
                <h3 className="font-semibold text-white mb-2">Business Hours</h3>
                <p className="text-gray-300">
                  Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                  Saturday: 10:00 AM - 4:00 PM EST<br />
                  Sunday: Closed
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-800 p-8 rounded-lg hover:bg-gray-800/90 transition-all duration-300">
              <h2 className="text-2xl font-semibold mb-6 text-blue-400">Send Us a Message</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={4}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <button
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center space-x-2 group"
                  type="submit"
                  onClick={handleSubmit}
                >
                  <span>Send Message</span>
                  <Send className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}