"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface BackButtonProps {
  onClick?: () => void
  title?: string
  href?: string
}

export function BackButton({ onClick, title = "戻る", href }: BackButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else if (href) {
      router.push(href)
    } else {
      router.back()
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleClick}
      className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
    >
      <ArrowLeft className="w-4 h-4" />
      {title}
    </Button>
  )
}
