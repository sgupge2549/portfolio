"use client"

import { useState, useEffect } from "react"

// 一度だけ実行されるアニメーション用のフック
export function useOneTimeAnimation(delay = 0) {
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasAnimated(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  return hasAnimated
}
