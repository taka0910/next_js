"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { BackButton } from "@/components/back-button"
import { MapPin, Heart, MessageCircle, Plus, Search, Star } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PlacesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [places] = useState([
    {
      id: 1,
      name: "新宿御苑",
      category: "公園",
      description: "桜の季節に一緒に行きたい！",
      likes: 2,
      comments: 3,
      addedBy: "あなた",
      isLiked: true,
      rating: 4.5,
    },
    {
      id: 2,
      name: "チームラボボーダレス",
      category: "アート",
      description: "幻想的な空間でデートしたい",
      likes: 1,
      comments: 1,
      addedBy: "パートナー",
      isLiked: false,
      rating: 4.8,
    },
    {
      id: 3,
      name: "鎌倉小町通り",
      category: "観光",
      description: "食べ歩きデートしよう！",
      likes: 2,
      comments: 2,
      addedBy: "あなた",
      isLiked: true,
      rating: 4.3,
    },
  ])

  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-red-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BackButton href="/" />
              <div className="flex items-center gap-2">
                <MapPin className="w-6 h-6 text-blue-600" />
                <h1 className="font-bold text-lg text-gray-800">行きたい場所</h1>
              </div>
            </div>
            <Button size="sm" className="bg-blue-500 hover:bg-blue-600" onClick={() => router.push("/places/add")}>
              <Plus className="w-4 h-4 mr-1" />
              追加
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="場所を検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{places.length}</div>
              <div className="text-sm text-gray-500">登録済み</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">1</div>
              <div className="text-sm text-gray-500">訪問済み</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">2</div>
              <div className="text-sm text-gray-500">計画中</div>
            </CardContent>
          </Card>
        </div>

        {/* Places List */}
        <div className="space-y-4">
          {places.map((place) => (
            <Card key={place.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-lg">{place.name}</CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {place.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(place.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">{place.rating}</span>
                    </div>
                  </div>
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-pink-200 text-pink-700 text-xs">
                      {place.addedBy === "あなた" ? "あ" : "パ"}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-600">{place.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`flex items-center gap-1 ${place.isLiked ? "text-red-500" : "text-gray-500"}`}
                    >
                      <Heart className={`w-4 h-4 ${place.isLiked ? "fill-current" : ""}`} />
                      {place.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-500">
                      <MessageCircle className="w-4 h-4" />
                      {place.comments}
                    </Button>
                  </div>
                  <Button size="sm" variant="outline">
                    詳細
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
