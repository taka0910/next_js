"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { BackButton } from "@/components/back-button"
import { BookOpen, Save, Camera } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CreateDiaryPage() {
  const [diary, setDiary] = useState({
    title: "",
    content: "",
    mood: "",
    date: new Date().toISOString().split("T")[0],
    isPublic: true,
    photos: [] as string[],
  })

  const router = useRouter()

  const moods = [
    { value: "very-happy", label: "とても嬉しい", emoji: "😄" },
    { value: "happy", label: "嬉しい", emoji: "😊" },
    { value: "normal", label: "普通", emoji: "😐" },
    { value: "sad", label: "悲しい", emoji: "😢" },
    { value: "angry", label: "怒り", emoji: "😠" },
    { value: "tired", label: "疲れた", emoji: "😴" },
    { value: "excited", label: "興奮", emoji: "🤩" },
    { value: "love", label: "愛情", emoji: "🥰" },
  ]

  const handleSave = () => {
    if (diary.title && diary.content) {
      // ここで実際の保存処理を行う
      console.log("日記を保存:", diary)
      router.push("/diary")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-red-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <BackButton href="/diary" />
            <div className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-orange-600" />
              <h1 className="font-bold text-lg text-gray-800">日記を書く</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">今日の出来事</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">タイトル *</label>
              <Input
                placeholder="例：楽しいデートの日"
                value={diary.title}
                onChange={(e) => setDiary((prev) => ({ ...prev, title: e.target.value }))}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">日付</label>
              <Input
                type="date"
                value={diary.date}
                onChange={(e) => setDiary((prev) => ({ ...prev, date: e.target.value }))}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">今日の気分</label>
              <Select value={diary.mood} onValueChange={(value) => setDiary((prev) => ({ ...prev, mood: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="気分を選択">
                    {diary.mood && (
                      <div className="flex items-center gap-2">
                        <span>{moods.find((m) => m.value === diary.mood)?.emoji}</span>
                        <span>{moods.find((m) => m.value === diary.mood)?.label}</span>
                      </div>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {moods.map((mood) => (
                    <SelectItem key={mood.value} value={mood.value}>
                      <div className="flex items-center gap-2">
                        <span>{mood.emoji}</span>
                        <span>{mood.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">内容 *</label>
              <Textarea
                placeholder="今日あった出来事や感じたことを書いてください..."
                value={diary.content}
                onChange={(e) => setDiary((prev) => ({ ...prev, content: e.target.value }))}
                className="min-h-[150px] resize-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">写真</label>
              <Button variant="outline" className="w-full">
                <Camera className="w-4 h-4 mr-2" />
                写真を追加
              </Button>
              <p className="text-xs text-gray-500 mt-1">思い出の写真を追加できます</p>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isPublic"
                checked={diary.isPublic}
                onCheckedChange={(checked) => setDiary((prev) => ({ ...prev, isPublic: checked as boolean }))}
              />
              <label htmlFor="isPublic" className="text-sm">
                パートナーと共有する
              </label>
            </div>

            <Button onClick={handleSave} className="w-full bg-orange-500 hover:bg-orange-600">
              <Save className="w-4 h-4 mr-2" />
              日記を保存
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
