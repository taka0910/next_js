"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BackButton } from "@/components/back-button"
import { Heart, Clock, Zap, Star, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: "鶏胸肉のヘルシーサラダ",
      time: "15分",
      cost: "¥400",
      calories: "320kcal",
      protein: "35g",
      fat: "8g",
      carbs: "12g",
      tags: ["ダイエット", "高タンパク", "簡単"],
      ingredients: ["鶏胸肉", "レタス", "トマト", "アボカド"],
      allergens: [],
      dietFriendly: true,
      addedDate: "2024-06-15",
    },
    {
      id: 3,
      name: "サーモンのムニエル",
      time: "20分",
      cost: "¥600",
      calories: "450kcal",
      protein: "32g",
      fat: "28g",
      carbs: "8g",
      tags: ["オメガ3", "美容", "おしゃれ"],
      ingredients: ["サーモン", "バター", "レモン", "パセリ"],
      allergens: [],
      dietFriendly: true,
      addedDate: "2024-06-14",
    },
    {
      id: 4,
      name: "野菜炒め",
      time: "10分",
      cost: "¥300",
      calories: "180kcal",
      protein: "8g",
      fat: "12g",
      carbs: "15g",
      tags: ["簡単", "野菜たっぷり", "時短"],
      ingredients: ["キャベツ", "人参", "ピーマン", "もやし"],
      allergens: [],
      dietFriendly: true,
      addedDate: "2024-06-13",
    },
  ])

  const router = useRouter()

  const removeFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-red-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <BackButton href="/menu-suggestion" />
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-500" />
              <h1 className="font-bold text-lg text-gray-800">お気に入り献立</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        <Card className="bg-gradient-to-r from-red-100 to-pink-100 border-red-200">
          <CardContent className="p-4 text-center">
            <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-700">{favorites.length}</div>
            <div className="text-sm text-red-600">お気に入り登録済み</div>
          </CardContent>
        </Card>

        {/* Favorites List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">お気に入りの献立</h2>
          {favorites.length > 0 ? (
            favorites.map((menu) => (
              <Card key={menu.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{menu.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      {menu.dietFriendly && (
                        <Badge className="bg-green-100 text-green-700">
                          <Heart className="w-3 h-3 mr-1" />
                          ヘルシー
                        </Badge>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeFavorite(menu.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {menu.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-lg">¥</span>
                      {menu.cost.replace("¥", "")}
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="w-4 h-4" />
                      {menu.calories}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center p-2 bg-red-50 rounded">
                      <div className="font-medium text-red-700">P: {menu.protein}</div>
                      <div className="text-red-600">タンパク質</div>
                    </div>
                    <div className="text-center p-2 bg-yellow-50 rounded">
                      <div className="font-medium text-yellow-700">F: {menu.fat}</div>
                      <div className="text-yellow-600">脂質</div>
                    </div>
                    <div className="text-center p-2 bg-blue-50 rounded">
                      <div className="font-medium text-blue-700">C: {menu.carbs}</div>
                      <div className="text-blue-600">炭水化物</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {menu.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">材料</h4>
                    <p className="text-sm text-gray-600">{menu.ingredients.join("、")}</p>
                  </div>

                  {menu.allergens.length > 0 && (
                    <div className="p-2 bg-yellow-50 rounded border border-yellow-200">
                      <p className="text-xs text-yellow-700">アレルギー注意: {menu.allergens.join("、")}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      お気に入り登録日: {menu.addedDate}
                    </div>
                    <Button size="sm" className="bg-green-500 hover:bg-green-600">
                      レシピを見る
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">お気に入りがありません</h3>
                <p className="text-sm text-gray-500 mb-4">献立提案ページでお気に入りを追加してみましょう</p>
                <Button onClick={() => router.push("/menu-suggestion")} className="bg-green-500 hover:bg-green-600">
                  献立を探す
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
