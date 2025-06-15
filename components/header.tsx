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
        isScrolled ? "bg-slate-800/90 backdrop-blur-sm shadow-lg" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a href="#" 
          className={cn(
              "flex items-center space-x-2 text-xl font-bold transition-colors duration-300",
              isScrolled ? "text-white hover:text-blue-300" : "text-gray-900 hover:text-primary",
            )}
          >
            <div 
            className={cn(
                "relative w-8 h-8 rounded-full overflow-hidden ring-2 transition-colors duration-300",
                isScrolled ? "ring-white/20" : "ring-gray-900/20",
              )}
            >
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
                className={cn(
                  "flex items-center space-x-1 text-sm font-medium transition-colors duration-300 px-3 py-2 rounded-md",
                  isScrolled
                    ? "text-white hover:text-blue-300 hover:bg-white/10"
                    : "text-gray-900 hover:text-primary hover:bg-gray-100",
                )}
              >
                {item.icon}
                <span>{item.name}</span>
              </a>
            ))}
          </nav>

          {/* モバイルメニューボタン */}
          <button 
            className={cn(
              "md:hidden p-2 rounded-md transition-colors duration-300",
              isScrolled ? "text-white hover:bg-white/10" : "text-gray-900 hover:bg-gray-100",
            )}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* モバイルナビゲーション */}
      {mobileMenuOpen && (
        <nav 
          className={cn(
            "md:hidden backdrop-blur-sm border-t",
            isScrolled ? "bg-slate-800/95 border-white/10" : "bg-white/95 border-gray-200",
          )}
        >
          <div className="container mx-auto px-4 py-3 space-y-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center space-x-2 p-3 rounded-md transition-colors duration-300",
                  isScrolled ? "text-white hover:bg-white/10" : "text-gray-900 hover:bg-gray-100",
                )}
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
