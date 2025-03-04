import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Github, Youtube } from "lucide-react"


function Footer() {
  return (
    <footer className="text-slate-300 py-12 px-4 bg-black">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Logo and Social Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              {/* Replace with your actual logo */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-8 w-8"
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
            </div>
            <p className="text-slate-400 mb-6 max-w-sm">
              Making the world a better place through constructing elegant hierarchies.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-slate-100 transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-slate-100 transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-slate-100 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-slate-100 transition-colors">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-slate-100 transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Solutions Column */}
          <div className="space-y-4">
            <h3 className="text-slate-100 font-semibold">Solutions</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="hover:text-slate-100 transition-colors">
                  Marketing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-slate-100 transition-colors">
                  Analytics
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-slate-100 transition-colors">
                  Automation
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-slate-100 transition-colors">
                  Commerce
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-slate-100 transition-colors">
                  Insights
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="space-y-4">
            <h3 className="text-slate-100 font-semibold">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="hover:text-slate-100 transition-colors">
                  Submit ticket
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-slate-100 transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-slate-100 transition-colors">
                  Guides
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-4">
            <h3 className="text-slate-100 font-semibold">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="hover:text-slate-100 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-slate-100 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-slate-100 transition-colors">
                  Jobs
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-slate-100 transition-colors">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="space-y-4">
            <h3 className="text-slate-100 font-semibold">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="hover:text-slate-100 transition-colors">
                  Terms of service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-slate-100 transition-colors">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-slate-100 transition-colors">
                  License
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 mt-8 border-t border-slate-800">
          <p className="text-slate-400 text-sm">© {new Date().getFullYear()} Your Company, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer