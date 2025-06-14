"use client"

import { useState, useEffect } from "react"
import type React from "react"
import { Code2, FileJson, Braces, Cpu, Coffee, Terminal, GitBranch, Container } from "lucide-react"
import { useIntersectionObserver } from "@/lib/use-intersection-observer"

interface Skill {
  name: string
  level: number // 0-100
  icon: React.ReactNode
}

const skills: Skill[] = [
  {
    name: "HTML",
    level: 80,
    icon: <Code2 className="h-6 w-6" />,
  },
  {
    name: "CSS",
    level: 75,
    icon: <FileJson className="h-6 w-6" />,
  },
  {
    name: "JavaScript",
    level: 40,
    icon: <Braces className="h-6 w-6" />,
  },
  {
    name: "C++",
    level: 75,
    icon: <Cpu className="h-6 w-6" />,
  },
  {
    name: "Java",
    level: 60,
    icon: <Coffee className="h-6 w-6" />,
  },
  {
    name: "Python",
    level: 85,
    icon: <Terminal className="h-6 w-6" />,
  },
  {
    name: "Git",
    level: 80,
    icon: <GitBranch className="h-6 w-6" />,
  },
  {
    name: "Docker",
    level: 50,
    icon: <Container className="h-6 w-6" />,
  },
]

export default function SkillsSection() {
  // Intersection Observerを使用してセクションが表示されたときにアニメーションを開始
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.2, // 20%表示されたらトリガー
    rootMargin: "-100px 0px", // 上部から100px入ってからトリガー
  })

  // アニメーション状態を管理
  const [skillLevels, setSkillLevels] = useState<number[]>(Array(skills.length).fill(0))

  // セクションが表示されたときにスキルバーをアニメーションさせる
  useEffect(() => {
    if (isIntersecting) {
      const timers = skills.map((skill, index) => {
        return setTimeout(
          () => {
            setSkillLevels((prev) => {
              const newLevels = [...prev]
              newLevels[index] = skill.level
              return newLevels
            })
          },
          500 + index * 100,
        ) // 初期遅延を500msに増やし、各スキルバーを100ms遅れて開始
      })

      return () => timers.forEach((timer) => clearTimeout(timer))
    }
  }, [isIntersecting])

  return (
    <section id="skills" className="section-padding bg-gray-50">
      <div ref={ref} className="container mx-auto px-4">
        <h2 className="section-title">スキル</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className="bg-white p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md"
            >
              <div className="flex items-center mb-3">
                <div className="mr-3 text-primary">
                  {/* アイコンの回転アニメーション */}
                  <div
                    className={`transition-transform duration-500 ${isIntersecting ? "rotate-0" : "rotate-180"}`}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    {skill.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold">{skill.name}</h3>
              </div>

              <div className="skill-bar">
                <div
                  className="skill-progress transition-all duration-1000 ease-out"
                  style={{ width: `${skillLevels[index]}%` }}
                />
              </div>

              <div className="mt-2 text-sm text-gray-600 flex justify-between">
                <span>初級</span>
                <span>中級</span>
                <span>上級</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
