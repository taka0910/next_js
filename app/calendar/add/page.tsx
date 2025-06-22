"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BackButton } from "@/components/back-button"
import { CalendarIcon, Save, Palette } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AddCalendarEventPage() {
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    type: "",
    location: "",
    owner: "",
    color: "",
  })

  const router = useRouter()

  const eventTypes = [
    { value: "記念日", label: "記念日", defaultColor: "red" },
    { value: "デート", label: "デート", defaultColor: "pink" },
    { value: "健康", label: "健康管理", defaultColor: "purple" },
    { value: "個人", label: "個人の予定", defaultColor: "blue" },
    { value: "仕事", label: "仕事", defaultColor: "gray" },
    { value: "その他", label: "その他", defaultColor: "green" },
  ]

  const colors = [
    { value: "red", label: "赤", class: "bg-red-400" },
    { value: "pink", label: "ピンク", class: "bg-pink-400" },
    { value: "purple", label: "紫", class: "bg-purple-400" },
    { value: "blue", label: "青", class: "bg-blue-400" },
    { value: "green", label: "緑", class: "bg-green-400" },
    { value: "yellow", label: "黄", class: "bg-yellow-400" },
    { value: "orange", label: "オレンジ", class: "bg-orange-400" },
    { value: "gray", label: "グレー", class: "bg-gray-400" },
  ]

  const owners = [
    { value: "あなた", label: "あなたの予定", color: "blue" },
    { value: "パートナー", label: "パートナーの予定", color: "purple" },
    { value: "共通", label: "共通の予定", color: "green" },
  ]

  const handleTypeChange = (type: string) => {
    const eventType = eventTypes.find((t) => t.value === type)
    setNewEvent((prev) => ({
      ...prev,
      type,
      color: eventType?.defaultColor || "",
    }))
  }

  const handleSave = () => {
    if (newEvent.title && newEvent.date && newEvent.type && newEvent.owner) {
      // ここで実際の保存処理を行う
      console.log("新しい予定を保存:", newEvent)
      router.push("/calendar")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-red-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <BackButton href="/calendar" />
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-6 h-6 text-pink-600" />
              <h1 className="font-bold text-lg text-gray-800">予定を追加</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">新しい予定の詳細</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">予定のタイトル *</label>
              <Input
                placeholder="例：映画デート"
                value={newEvent.title}
                onChange={(e) => setNewEvent((prev) => ({ ...prev, title: e.target.value }))}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">日付 *</label>
              <Input
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent((prev) => ({ ...prev, date: e.target.value }))}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">時間</label>
              <Input
                type="time"
                value={newEvent.time}
                onChange={(e) => setNewEvent((prev) => ({ ...prev, time: e.target.value }))}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">予定の種類 *</label>
              <Select value={newEvent.type} onValueChange={handleTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="予定の種類を選択" />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">予定の所有者 *</label>
              <Select
                value={newEvent.owner}
                onValueChange={(value) => setNewEvent((prev) => ({ ...prev, owner: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="予定の所有者を選択" />
                </SelectTrigger>
                <SelectContent>
                  {owners.map((owner) => (
                    <SelectItem key={owner.value} value={owner.value}>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 bg-${owner.color}-400 rounded-full`}></div>
                        {owner.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                <Palette className="w-4 h-4" />
                カラー選択
              </label>
              <div className="grid grid-cols-4 gap-3">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setNewEvent((prev) => ({ ...prev, color: color.value }))}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      newEvent.color === color.value ? "border-gray-800 scale-105" : "border-gray-200"
                    }`}
                  >
                    <div className={`w-6 h-6 ${color.class} rounded-full mx-auto mb-1`}></div>
                    <div className="text-xs text-gray-600">{color.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">場所</label>
              <Input
                placeholder="例：映画館、レストラン"
                value={newEvent.location}
                onChange={(e) => setNewEvent((prev) => ({ ...prev, location: e.target.value }))}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">詳細・メモ</label>
              <Textarea
                placeholder="詳細な説明やメモを入力してください"
                value={newEvent.description}
                onChange={(e) => setNewEvent((prev) => ({ ...prev, description: e.target.value }))}
                className="min-h-[80px]"
              />
            </div>

            <Button onClick={handleSave} className="w-full bg-pink-500 hover:bg-pink-600">
              <Save className="w-4 h-4 mr-2" />
              予定を保存
            </Button>
          </CardContent>
        </Card>

        {/* Preview */}
        {newEvent.title && (
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg">プレビュー</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`p-3 rounded-lg border ${
                  newEvent.color
                    ? `bg-${newEvent.color}-100 text-${newEvent.color}-700 border-${newEvent.color}-200`
                    : "bg-gray-100 text-gray-700 border-gray-200"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium">{newEvent.title}</h3>
                  <div className="flex items-center gap-1">
                    {newEvent.color && <div className={`w-3 h-3 bg-${newEvent.color}-400 rounded-full`}></div>}
                    <span className="text-xs">{newEvent.owner}</span>
                  </div>
                </div>
                <div className="text-sm space-y-1">
                  <div>{newEvent.date}</div>
                  {newEvent.time && <div>時間: {newEvent.time}</div>}
                  {newEvent.location && <div>場所: {newEvent.location}</div>}
                  {newEvent.description && <div>詳細: {newEvent.description}</div>}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
