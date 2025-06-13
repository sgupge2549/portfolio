import { User, Code, Trophy, Target, Mail } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center items-center md:space-x-8 space-y-4 md:space-y-0 mb-8">
          <a href="#about" className="flex items-center space-x-1 hover:text-primary transition-colors">
            <User className="h-4 w-4" />
            <span>自己紹介</span>
          </a>
          <a href="#skills" className="flex items-center space-x-1 hover:text-primary transition-colors">
            <Code className="h-4 w-4" />
            <span>スキル</span>
          </a>
          <a href="#projects" className="flex items-center space-x-1 hover:text-primary transition-colors">
            <Trophy className="h-4 w-4" />
            <span>実績</span>
          </a>
          <a href="#goals" className="flex items-center space-x-1 hover:text-primary transition-colors">
            <Target className="h-4 w-4" />
            <span>展望</span>
          </a>
          <a href="#contact" className="flex items-center space-x-1 hover:text-primary transition-colors">
            <Mail className="h-4 w-4" />
            <span>連絡先</span>
          </a>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>© {currentYear} あなたの名前 All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
