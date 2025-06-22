"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { BackButton } from "@/components/back-button"
import { ChefHat, Sparkles, Clock, Heart, Zap, Settings } from "lucide-react"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"

export default function MenuSuggestionPage() {
  const [preferences, setPreferences] = useState({
    diet: false,
    lowCost: true,
    quick: false,
    healthy: true,
  })

  const [favorites, setFavorites] = useState<number[]>([])

  const [suggestions] = useState([
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
    },
    {
      id: 2,
      name: "野菜たっぷり豚汁",
      time: "25分",
      cost: "¥350",
      calories: "280kcal",
      protein: "18g",
      fat: "12g",
      carbs: "25g",
      tags: ["節約", "栄養満点", "温まる"],
      ingredients: ["豚バラ肉", "大根", "人参", "ごぼう", "味噌"],
      allergens: ["大豆"],
      dietFriendly: false,
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
    },
  ])

  const router = useRouter()
  const [fridgeItems, setFridgeItems] = useState("")

  const toggleFavorite = (menuId: number) => {
    setFavorites((prev) => (prev.includes(menuId) ? prev.filter((id) => id !== menuId) : [...prev, menuId]))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-red-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BackButton href="/" />
              <div className="flex items-center gap-2">
                <ChefHat className="w-6 h-6 text-green-600" />
                <h1 className="font-bold text-lg text-gray-800">AI献立提案</h1>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => router.push("/menu-suggestion/favorites")}>
                <Heart className="w-4 h-4 mr-1" />
                お気に入り
              </Button>
              <Button size="sm" variant="outline" onClick={() => router.push("/menu-suggestion/settings")}>
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* AI Assistant */}
        <Card className="bg-gradient-to-r from-green-100 to-blue-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Sparkles className="w-6 h-6 text-green-600 mt-1" />
              <div>
                <h3 className="font-medium text-green-800 mb-1">AIシェフ</h3>
                <p className="text-sm text-green-700">お二人の好みや体調、予算を考慮して最適な献立を提案します。</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fridge Items */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">冷蔵庫にある具材</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="冷蔵庫にある具材を入力してください（例：鶏肉、玉ねぎ、人参、じゃがいも）"
              value={fridgeItems}
              onChange={(e) => setFridgeItems(e.target.value)}
              className="min-h-[80px]"
            />
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">今日の希望</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="diet"
                  checked={preferences.diet}
                  onCheckedChange={(checked) => setPreferences((prev) => ({ ...prev, diet: checked as boolean }))}
                />
                <label htmlFor="diet" className="text-sm">
                  ダイエット重視
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="lowCost"
                  checked={preferences.lowCost}
                  onCheckedChange={(checked) => setPreferences((prev) => ({ ...prev, lowCost: checked as boolean }))}
                />
                <label htmlFor="lowCost" className="text-sm">
                  節約重視
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="quick"
                  checked={preferences.quick}
                  onCheckedChange={(checked) => setPreferences((prev) => ({ ...prev, quick: checked as boolean }))}
                />
                <label htmlFor="quick" className="text-sm">
                  時短重視
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="healthy"
                  checked={preferences.healthy}
                  onCheckedChange={(checked) => setPreferences((prev) => ({ ...prev, healthy: checked as boolean }))}
                />
                <label htmlFor="healthy" className="text-sm">
                  健康重視
                </label>
              </div>
            </div>
            <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
              <Sparkles className="w-4 h-4 mr-2" />
              新しい献立を提案
            </Button>
          </CardContent>
        </Card>

        {/* Suggestions */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">今日のおすすめ</h2>
          {suggestions.map((menu) => (
            <Card key={menu.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{menu.name}</CardTitle>
                  {menu.dietFriendly && (
                    <Badge className="bg-green-100 text-green-700">
                      <Heart className="w-3 h-3 mr-1" />
                      ヘルシー
                    </Badge>
                  )}
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

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    レシピを見る
                  </Button>
                  <Button
                    size="sm"
                    variant={favorites.includes(menu.id) ? "default" : "outline"}
                    onClick={() => toggleFavorite(menu.id)}
                    className={favorites.includes(menu.id) ? "bg-red-500 hover:bg-red-600" : ""}
                  >
                    <Heart className={`w-3 h-3 mr-1 ${favorites.includes(menu.id) ? "fill-current" : ""}`} />
                    {favorites.includes(menu.id) ? "お気に入り済み" : "お気に入り"}
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
