"use client"

import { useState, useEffect } from "react"
import type React from "react"
import { Award, Users, Crown } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useIntersectionObserver } from "@/lib/use-intersection-observer"

interface Project {
  title: string
  description: string
  icon: React.ReactNode
}

const projects: Project[] = [
  {
    title: "ハッカソン表彰",
    description: "アプリ開発コンテスト(ハッカソン)で、7チームのうち、参加者投票の過半数を獲得。google mapを用いて現在地を取得し、ウォーキングルートを提案するWebアプリを開発しました。また、AIを用いてユーザーの要望に沿ったルートを提案する機能も実装しました。",
    icon: <Award className="h-10 w-10" />,
  },
  {
    title: "大学部活動の部長",
    description: "大学の部活動(写真部)で部長を務め、部員97名をまとめています。部員が活発に活動できるよう、イベントの企画や運営を行い、部の活性化に貢献しています。近隣企業とのコラボイベントを企画し、地域貢献にも取り組んでいます。(造船所様との撮影会→写真展開催など)",
    icon: <Users className="h-10 w-10" />,
  },
  {
    title: "生徒会長",
    description:
      "高校で生徒会長を務め、学校全体の活動や行事の企画・運営を行いました。特に，数十年ぶりに文化祭を復活させました。生徒の意見を尊重し、先生方との調整をして学校の活性化に貢献しました。生徒会活動を通じて、リーダーシップやコミュニケーション能力を磨きました。",
    icon: <Crown className="h-10 w-10" />,
  },
]

export default function ProjectsSection() {
  // Intersection Observerを使用してセクションが表示されたときにアニメーションを開始
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.2, // 20%表示されたらトリガー
    rootMargin: "-100px 0px", // 上部から100px入ってからトリガー
  })

  const [visibleProjects, setVisibleProjects] = useState<boolean[]>([])

  // セクションが表示されたときにアニメーションを開始
  useEffect(() => {
    if (isIntersecting) {
      projects.forEach((_, index) => {
        setTimeout(
          () => {
            setVisibleProjects((prev) => {
              const newVisible = [...prev]
              newVisible[index] = true
              return newVisible
            })
          },
          500 + index * 200, // 初期遅延を500msに増やし、各カードを200msずつ遅らせて表示
        )
      })
    } else {
      setVisibleProjects([])
    }
  }, [isIntersecting])

  return (
    <section id="projects" className="section-padding">
      <div ref={ref} className="container mx-auto px-4">
        <h2 className="section-title">実績・プロジェクト</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`transition-all duration-700 ease-out ${visibleProjects[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
            >
              <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-3">
                  <div className="mb-2 text-primary">
                    <div className="transform transition-all duration-500 hover:scale-110">{project.icon}</div>
                  </div>
                  <CardTitle>{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{project.description}</CardDescription>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
