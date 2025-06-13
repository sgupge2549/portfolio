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
    title: "ガバイソン表彰",
    description: "優れた成果を上げたことによる表彰。プロジェクトでの貢献が評価されました。",
    icon: <Award className="h-10 w-10" />,
  },
  {
    title: "部長",
    description: "大学での部活動の部長を務め、チームをリードしました。メンバーの成長と成果に貢献しました。",
    icon: <Users className="h-10 w-10" />,
  },
  {
    title: "生徒会長",
    description:
      "高校で生徒会長を務め、学校全体の活動や行事の企画・運営を行いました。リーダーシップを発揮し、多くの改革を実現しました。",
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
              className={`transition-all duration-700 ease-out ${
                visibleProjects[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
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
