"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { User, Code, Trophy, Target, Mail, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface NavItem {
  name: string
  href: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  {
    name: "自己紹介",
    href: "#about",
    icon: <User className="h-5 w-5" />,
  },
  {
    name: "スキル",
    href: "#skills",
    icon: <Code className="h-5 w-5" />,
  },
  {
    name: "実績",
    href: "#projects",
    icon: <Trophy className="h-5 w-5" />,
  },
  {
    name: "展望",
    href: "#goals",
    icon: <Target className="h-5 w-5" />,
  },
  {
    name: "連絡先",
    href: "#contact",
    icon: <Mail className="h-5 w-5" />,
  },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-slate-800/90 backdrop-blur-sm shadow-sm" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center space-x-2 text-xl font-bold">
            <div className="relative w-8 h-8 rounded-full overflow-hidden">
              <Image
                src="/images/icon.png?height=32&width=32"
                alt="プロフィールアイコン"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <span>tomy_tech</span>
          </a>

          {/* デスクトップナビゲーション */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center space-x-1 text-sm font-medium hover:text-primary transition-colors"
              >
                {item.icon}
                <span>{item.name}</span>
              </a>
            ))}
          </nav>

          {/* モバイルメニューボタン */}
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* モバイルナビゲーション */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-slate-800 border-t">
          <div className="container mx-auto px-4 py-3 space-y-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon}
                <span>{item.name}</span>
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
