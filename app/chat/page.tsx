"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BackButton } from "@/components/back-button"
import { Send, ImageIcon, Mic } from "lucide-react"
import { useRouter } from "next/navigation"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function ChatPage() {
  const [message, setMessage] = useState("")
  const [messages] = useState([
    {
      id: 1,
      sender: "partner",
      content: "お疲れ様！今日はどうだった？",
      time: "14:30",
      type: "text",
    },
    {
      id: 2,
      sender: "me",
      content: "お疲れ様！今日は会議が多くて疲れたよ😅",
      time: "14:32",
      type: "text",
    },
    {
      id: 3,
      sender: "partner",
      content: "お疲れ様💕 今日は私が夕飯作るね！",
      time: "14:35",
      type: "text",
    },
    {
      id: 4,
      sender: "me",
      content: "ありがとう！本当に助かる❤️",
      time: "14:36",
      type: "text",
    },
    {
      id: 5,
      sender: "partner",
      content: "何が食べたい？",
      time: "14:40",
      type: "text",
    },
  ])

  const router = useRouter()

  const handleSend = () => {
    if (message.trim()) {
      // Handle sending message
      setMessage("")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-red-50 flex flex-col">
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <BackButton href="/" />
            <div className="flex items-center gap-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback className="bg-orange-200 text-orange-700">パ</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="font-bold text-lg text-gray-800">パートナー</h1>
                <p className="text-xs text-green-600">オンライン</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 max-w-md mx-auto w-full px-4 py-6 space-y-4 overflow-y-auto">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
            <div className={`flex items-end gap-2 max-w-[80%] ${msg.sender === "me" ? "flex-row-reverse" : ""}`}>
              <Avatar className="w-6 h-6">
                <AvatarFallback
                  className={`text-xs ${
                    msg.sender === "me" ? "bg-pink-200 text-pink-700" : "bg-orange-200 text-orange-700"
                  }`}
                >
                  {msg.sender === "me" ? "あ" : "パ"}
                </AvatarFallback>
              </Avatar>
              <div className={`space-y-1 ${msg.sender === "me" ? "items-end" : "items-start"} flex flex-col`}>
                <div
                  className={`px-4 py-2 rounded-2xl ${
                    msg.sender === "me"
                      ? "bg-gradient-to-r from-pink-500 to-orange-500 text-white"
                      : "bg-white border border-gray-200 text-gray-800"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
                <span className="text-xs text-gray-500">{msg.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 sticky bottom-0">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-gray-500">
              <ImageIcon className="w-5 h-5" />
            </Button>
            <div className="flex-1 relative">
              <Input
                placeholder="メッセージを入力..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                className="pr-12"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                <Mic className="w-4 h-4" />
              </Button>
            </div>
            <Button
              onClick={handleSend}
              disabled={!message.trim()}
              size="icon"
              className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  )
}
