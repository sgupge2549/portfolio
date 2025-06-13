import { Mail, Instagram, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactSection() {
  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto px-4">
        <h2 className="section-title">連絡先</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 連絡先情報 */}
          <div>
            <h3 className="section-subtitle">お問い合わせ</h3>
            <p className="mb-6 text-gray-700">
              お問い合わせやご質問がありましたら、以下の連絡先までお気軽にご連絡ください。
            </p>

            <div className="space-y-4">
              <a
                href="mailto:your.email@university.ac.jp"
                className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Mail className="h-6 w-6 text-primary" />
                <span>your.email@university.ac.jp</span>
              </a>

              <a
                href="https://instagram.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Instagram className="h-6 w-6 text-primary" />
                <span>@yourusername</span>
              </a>

              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Github className="h-6 w-6 text-primary" />
                <span>@yourusername</span>
              </a>
            </div>
          </div>

          {/* コンタクトフォーム */}
          <div>
            <h3 className="section-subtitle">メッセージを送る</h3>

            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  お名前
                </label>
                <Input id="name" type="text" placeholder="山田 太郎" required />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  メールアドレス
                </label>
                <Input id="email" type="email" placeholder="example@email.com" required />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  メッセージ
                </label>
                <Textarea id="message" placeholder="メッセージを入力してください" rows={5} required />
              </div>

              <Button type="submit" className="w-full">
                送信する
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
