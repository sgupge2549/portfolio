"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Instagram, Github, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    const formData = new FormData(e.currentTarget)

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        setSubmitStatus("success")
        // フォームをリセット
        e.currentTarget.reset()
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto px-4">
        <h2 className="section-title">連絡先</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 連絡先情報 */}
          <div>
            <h3 className="section-subtitle">お問い合わせ</h3>
            <p className="mb-6 text-gray-700">
              お問い合わせやご質問がありましたら、以下の連絡先までご連絡ください。
            </p>

            <div className="space-y-4">
              <a
                href="mailto:tomytech626@gmail.com"
                className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Mail className="h-6 w-6 text-primary" />
                <span>tomytech626@gmail.com</span>
              </a>

              <a
                href="https://instagram.com/tomy_tech626"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Instagram className="h-6 w-6 text-primary" />
                <span>@tomy_tech626</span>
              </a>

              <a
                href="https://github.com/sgupge2549"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Github className="h-6 w-6 text-primary" />
                <span>@sgupge2549</span>
              </a>
            </div>
          </div>

          {/* コンタクトフォーム */}
          <div>
            <h3 className="section-subtitle">メッセージを送る(現在不安定，調整中です)</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Web3Forms用の隠しフィールド */}
              <input type="hidden" name="access_key" value="0adf00f3-ec07-4883-b1af-cb2a39bfafd7" />
              <input type="hidden" name="subject" value="ポートフォリオサイトからのお問い合わせ" />
              <input type="hidden" name="from_name" value="ポートフォリオサイト" />

              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  お名前 <span className="text-red-500">*</span>
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="山田 太郎"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  メールアドレス <span className="text-red-500">*</span>
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  メッセージ <span className="text-red-500">*</span>
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="メッセージを入力してください"
                  rows={5}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "送信中..." : "送信する"}
              </Button>

              {/* 送信結果の表示 */}
              {submitStatus === "success" && (
                <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-md">
                  <CheckCircle className="h-5 w-5" />
                  <span>メッセージが正常に送信されました。ありがとうございます！</span>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-md">
                  <AlertCircle className="h-5 w-5" />
                  <span>送信に失敗しました。しばらく時間をおいて再度お試しください。</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
