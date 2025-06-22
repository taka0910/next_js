"use client"

import { Button } from "@/components/ui/button"
import { useRouter, usePathname } from "next/navigation"
import { Heart, MessageCircle, Calendar, BookOpen } from "lucide-react"

export function BottomNavigation() {
  const router = useRouter()
  const pathname = usePathname()

  const navItems = [
    { icon: Heart, label: "ホーム", path: "/" },
    { icon: MessageCircle, label: "チャット", path: "/chat" },
    { icon: Calendar, label: "カレンダー", path: "/calendar" },
    { icon: BookOpen, label: "日記", path: "/diary" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="max-w-md mx-auto px-4">
        <div className="flex justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.path
            return (
              <Button
                key={item.path}
                variant="ghost"
                size="sm"
                className={`flex-col gap-1 h-auto py-2 ${isActive ? "text-pink-600" : "text-gray-500"}`}
                onClick={() => router.push(item.path)}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </Button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
