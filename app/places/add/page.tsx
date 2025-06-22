"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BackButton } from "@/components/back-button"
import { MapPin, Star, Save } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AddPlacePage() {
  const [newPlace, setNewPlace] = useState({
    name: "",
    category: "",
    description: "",
    rating: "",
    url: "",
    address: "",
    notes: "",
  })

  const router = useRouter()

  const handleSave = () => {
    if (newPlace.name && newPlace.category) {
      // ここで実際の保存処理を行う
      console.log("新しい場所を保存:", newPlace)
      router.push("/places")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-red-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <BackButton href="/places" />
            <div className="flex items-center gap-2">
              <MapPin className="w-6 h-6 text-blue-600" />
              <h1 className="font-bold text-lg text-gray-800">場所を追加</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">新しい場所の情報</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">場所名 *</label>
              <Input
                placeholder="例：新宿御苑"
                value={newPlace.name}
                onChange={(e) => setNewPlace((prev) => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">カテゴリ *</label>
              <Select
                value={newPlace.category}
                onValueChange={(value) => setNewPlace((prev) => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="カテゴリを選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="公園">公園</SelectItem>
                  <SelectItem value="レストラン">レストラン</SelectItem>
                  <SelectItem value="カフェ">カフェ</SelectItem>
                  <SelectItem value="観光">観光地</SelectItem>
                  <SelectItem value="アート">アート・文化</SelectItem>
                  <SelectItem value="ショッピング">ショッピング</SelectItem>
                  <SelectItem value="エンターテイメント">エンターテイメント</SelectItem>
                  <SelectItem value="その他">その他</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">説明・理由</label>
              <Textarea
                placeholder="なぜここに行きたいのか、どんな場所なのかを書いてください"
                value={newPlace.description}
                onChange={(e) => setNewPlace((prev) => ({ ...prev, description: e.target.value }))}
                className="min-h-[80px]"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">住所</label>
              <Input
                placeholder="例：東京都新宿区内藤町11"
                value={newPlace.address}
                onChange={(e) => setNewPlace((prev) => ({ ...prev, address: e.target.value }))}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">評価</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setNewPlace((prev) => ({ ...prev, rating: rating.toString() }))}
                    className="p-1"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        Number.parseInt(newPlace.rating) >= rating ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
                <span className="text-sm text-gray-500 ml-2">
                  {newPlace.rating ? `${newPlace.rating}/5` : "未評価"}
                </span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">参考URL</label>
              <Input
                placeholder="公式サイトやSNSのURLなど"
                value={newPlace.url}
                onChange={(e) => setNewPlace((prev) => ({ ...prev, url: e.target.value }))}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">メモ</label>
              <Textarea
                placeholder="営業時間、予算、注意事項など"
                value={newPlace.notes}
                onChange={(e) => setNewPlace((prev) => ({ ...prev, notes: e.target.value }))}
                className="min-h-[60px]"
              />
            </div>

            <Button onClick={handleSave} className="w-full bg-blue-500 hover:bg-blue-600">
              <Save className="w-4 h-4 mr-2" />
              保存
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
