"use client"

import { useState, useEffect } from "react"
import type React from "react"
import { Rocket, Zap } from "lucide-react"
import { useIntersectionObserver } from "@/lib/use-intersection-observer"

interface Goal {
  title: string
  description: string
  icon: React.ReactNode
}

const goals: Goal[] = [
  {
    title: "起業",
    description: "AIを活用したtoCサービスを開発し、多くの人々の生活を便利にするサービスを提供します。",
    icon: <Rocket className="h-8 w-8" />,
  },
  {
    title: "自動化ツールの活用",
    description: "日常業務の効率化を図るため、様々な自動化ツールを開発・活用し、生産性の向上を目指します。",
    icon: <Zap className="h-8 w-8" />,
  },
]

export default function GoalsSection() {
  // Intersection Observerを使用してセクションが表示されたときにアニメーションを開始
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.3, // 30%表示されたらトリガー
    rootMargin: "-100px 0px", // 上部から100px入ってからトリガー
  })

  const [activeGoal, setActiveGoal] = useState<number | null>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  // セクションが表示されたときにアニメーションを開始
  useEffect(() => {
    if (isIntersecting && !hasAnimated) {
      // 初期アニメーション
      setTimeout(() => {
        setActiveGoal(0)
        setTimeout(() => {
          setActiveGoal(1)
          setTimeout(() => {
            setActiveGoal(null)
            setHasAnimated(true)
          }, 1000)
        }, 1000)
      }, 500)
    }
  }, [isIntersecting, hasAnimated])

  // マウスホバー時のアニメーション
  const handleMouseEnter = (index: number) => {
    setActiveGoal(index)
  }

  const handleMouseLeave = () => {
    setActiveGoal(null)
  }

  return (
    <section id="goals" className="section-padding bg-gray-50">
      <div ref={ref} className="container mx-auto px-4">
        <h2 className="section-title">今後の展望・目標</h2>

        <div className="max-w-3xl mx-auto">
          {goals.map((goal, index) => (
            <div
              key={goal.title}
              className={`flex gap-6 mb-10 last:mb-0 transition-all duration-500 ${
                isIntersecting ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
              style={{ transitionDelay: `${500 + index * 200}ms` }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className={`
                  flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center
                  transition-all duration-500
                  ${activeGoal === index ? "bg-primary text-white animate-pulse" : "bg-primary/10 text-primary"}
                `}
              >
                {goal.icon}
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">{goal.title}</h3>
                <p className="text-gray-700">{goal.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
