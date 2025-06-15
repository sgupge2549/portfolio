"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

// 異なる色のダミー画像を用意
const carouselImages = [
  {
    src: "/images/img_slide(1).jpg?height=800&width=1200&text=Slide 1",
    alt: "スライド1",
  },
  {
    src: "/images/img_slide(2).JPG?height=800&width=1200&text=Slide 2",
    alt: "スライド2",
  },
  {
    src: "/images/img_slide(3).jpg?height=800&width=1200&text=Slide 3",
    alt: "スライド3",
  },
]

export default function AboutSection() {
  const [currentImage, setCurrentImage] = useState(0)

  // 自動スライドショー
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % carouselImages.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

  return (
    <section id="about" className="section-padding pt-24">
      <div className="container mx-auto px-4">
        <h2 className="section-title">自己紹介</h2>

        {/* フレックスレイアウトに変更して上端を揃える */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-12">
          {/* スライドショー部分 - マージントップを追加 */}
          <div className="lg:w-1/2 lg:mt-[6px]">
            <div className="relative aspect-[4/3] md:aspect-[16/10] lg:aspect-[4/3] xl:aspect-[16/9] rounded-lg shadow-xl overflow-hidden">
              {/* カルーセル画像 */}
              {carouselImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImage ? "opacity-100" : "opacity-0"
                    }`}
                >
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                  {/* 各スライドの色付きオーバーレイ */}
                  <div className={`absolute inset-0 ${image.bgColor}`}></div>
                </div>
              ))}

              {/* ナビゲーションボタン */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors z-10"
                aria-label="前のスライド"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors z-10"
                aria-label="次のスライド"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* インジケーター */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-3 z-10">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`h-3 w-3 rounded-full transition-all duration-300 ${index === currentImage ? "bg-white scale-125" : "bg-white/50"
                      }`}
                    aria-label={`スライド ${index + 1} に移動`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* テキストコンテンツ部分 */}
          <div className="lg:w-1/2">
            <p className="text-base md:text-lg mb-6 leading-relaxed">
              ご訪問ありがとうございます。tomyと申します。大学で情報工学を専攻しており、プログラミング・写真撮影・ドライブが趣味です。よろしくお願いします。
            </p>

            <div className="space-y-4 md:space-y-5 lg:space-y-4 xl:space-y-5">
              <div className="p-3 md:p-4 bg-primary/10 rounded-lg border border-primary/20">
                <h3 className="text-lg md:text-xl font-bold text-primary mb-1">Challenging manager</h3>
                <p className="text-sm md:text-base">
                  常に新たな挑戦を求め、メンバーとコミュニケーションを取りながらチームをリードします。
                </p>
              </div>

              <div className="p-3 md:p-4 bg-primary/10 rounded-lg border border-primary/20">
                <h3 className="text-lg md:text-xl font-bold text-primary mb-1">Developing programmer</h3>
                <p className="text-sm md:text-base">
                  日々スキルを磨き、新しい技術を学び活用しながら、成長を続けるプログラマーです。
                </p>
              </div>

              <div className="p-3 md:p-4 bg-primary/10 rounded-lg border border-primary/20">
                <h3 className="text-lg md:text-xl font-bold text-primary mb-1">Emerging photographer</h3>
                <p className="text-sm md:text-base">
                  多方向から世界を切り取り、被写体の魅力を引き出します。写真を通じて新たな視点をお届けします。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
