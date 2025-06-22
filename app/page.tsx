"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Heart,
  MapPin,
  CheckSquare,
  Calendar,
  Coins,
  Calculator,
  ChefHat,
  Brain,
  Gift,
  Sparkles,
  Plus,
  Bell,
  ShoppingCart,
  Check,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function CoupleApp() {
  const [currentUser] = useState("あなた")
  const [partner] = useState("パートナー")
  const [thanksPoints] = useState(85)
  const router = useRouter()

  // 買い物リストのサンプルデータ
  const [shoppingList] = useState([
    { id: 1, item: "牛乳", bought: false, addedBy: "あなた" },
    { id: 2, item: "卵", bought: true, addedBy: "パートナー" },
    { id: 3, item: "パン", bought: false, addedBy: "あなた" },
    { id: 4, item: "トマト", bought: false, addedBy: "パートナー" },
  ])

  const pendingItems = shoppingList.filter((item) => !item.bought)
  const completedItems = shoppingList.filter((item) => item.bought)

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <Avatar
                  className="w-8 h-8 border-2 border-white cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => router.push("/profile/user")}
                >
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback className="bg-pink-200 text-pink-700">あ</AvatarFallback>
                </Avatar>
                <Avatar
                  className="w-8 h-8 border-2 border-white cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => router.push("/profile/partner")}
                >
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback className="bg-orange-200 text-orange-700">パ</AvatarFallback>
                </Avatar>
              </div>
              <div>
                <h1 className="font-bold text-lg text-gray-800">ふたりの時間</h1>
                <p className="text-xs text-gray-500">同棲開始から 127日目</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative" onClick={() => router.push("/notifications")}>
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
              </Button>
              <Button variant="ghost" size="icon" onClick={() => router.push("/account")}>
                <Avatar className="w-6 h-6">
                  <AvatarImage src="/placeholder.svg?height=24&width=24" />
                  <AvatarFallback className="bg-pink-200 text-pink-700 text-xs">あ</AvatarFallback>
                </Avatar>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* ありがとうポイント */}
        <Card
          className="bg-gradient-to-r from-pink-500 to-orange-500 text-white border-0 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => router.push("/thanks-points")}
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Coins className="w-5 h-5" />
              ありがとうポイント
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div className="text-center">
                <div className="text-2xl font-bold">85pt</div>
                <div className="text-sm opacity-90">あなた</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">72pt</div>
                <div className="text-sm opacity-90">パートナー</div>
              </div>
            </div>
            <p className="text-sm opacity-90">タップして詳細を見る</p>
          </CardContent>
        </Card>

        {/* 今日のタスク */}
        <Card
          className="bg-gradient-to-r from-green-100 to-blue-100 border-green-200 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => router.push("/tasks")}
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-green-600" />
              今日のタスク
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">ゴミ出し</span>
              </div>
              <Badge variant="outline" className="text-xs">
                あなた
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm">夕食の準備</span>
              </div>
              <Badge variant="outline" className="text-xs">
                パートナー
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* 買い物リスト */}
        <Card
          className="bg-gradient-to-r from-teal-100 to-cyan-100 border-teal-200 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => router.push("/shopping")}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-teal-600" />
                買い物リスト
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge className="bg-teal-600 text-white">{pendingItems.length}件</Badge>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation()
                    router.push("/shopping")
                  }}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  追加
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingItems.slice(0, 3).map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-teal-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <span className="text-sm">{item.item}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {item.addedBy}
                </Badge>
              </div>
            ))}
            {completedItems.length > 0 && (
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg opacity-75">
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-700">{completedItems.length}件購入済み</span>
                </div>
              </div>
            )}
            {pendingItems.length > 3 && (
              <div className="text-center">
                <span className="text-xs text-gray-500">他 {pendingItems.length - 3}件...</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 機能メニュー */}
        <div className="grid grid-cols-2 gap-4">
          <Card
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => router.push("/ai-consultation")}
          >
            <CardContent className="p-4 text-center">
              <Brain className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-medium text-sm">AI相談</h3>
              <p className="text-xs text-gray-500 mt-1">言いにくいことを相談</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => router.push("/places")}>
            <CardContent className="p-4 text-center">
              <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-medium text-sm">行きたい場所</h3>
              <p className="text-xs text-gray-500 mt-1">デートスポットリスト</p>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => router.push("/menu-suggestion")}
          >
            <CardContent className="p-4 text-center">
              <ChefHat className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-medium text-sm">献立提案</h3>
              <p className="text-xs text-gray-500 mt-1">AI栄養バランス考慮</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => router.push("/household")}>
            <CardContent className="p-4 text-center">
              <Calculator className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
              <h3 className="font-medium text-sm">家計簿</h3>
              <p className="text-xs text-gray-500 mt-1">生活費管理</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => router.push("/calendar")}>
            <CardContent className="p-4 text-center">
              <Calendar className="w-8 h-8 text-pink-600 mx-auto mb-2" />
              <h3 className="font-medium text-sm">カレンダー</h3>
              <p className="text-xs text-gray-500 mt-1">記念日・予定管理</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => router.push("/diary")}>
            <CardContent className="p-4 text-center">
              <Calendar className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-medium text-sm">ふたりの日記</h3>
              <p className="text-xs text-gray-500 mt-1">思い出を記録</p>
            </CardContent>
          </Card>
        </div>

        {/* 記念日カウンター */}
        <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-purple-800">次の記念日まで</h3>
                <p className="text-2xl font-bold text-purple-600">23日</p>
                <p className="text-sm text-purple-600">付き合って1年記念日</p>
              </div>
              <Sparkles className="w-12 h-12 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        {/* MBTI相性 */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              価値観相性度
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-3">
              <div className="text-center">
                <Badge variant="outline" className="mb-1">
                  ENFP
                </Badge>
                <p className="text-xs text-gray-500">あなた</p>
              </div>
              <div className="flex-1 mx-4">
                <div className="text-center mb-2">
                  <span className="text-2xl font-bold text-green-600">87%</span>
                </div>
                <Progress value={87} className="h-2" />
              </div>
              <div className="text-center">
                <Badge variant="outline" className="mb-1">
                  ISFJ
                </Badge>
                <p className="text-xs text-gray-500">パートナー</p>
              </div>
            </div>
            <p className="text-xs text-gray-600 text-center">お互いを補完し合う素晴らしい相性です！</p>
          </CardContent>
        </Card>

        {/* おねだりリスト */}
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => router.push("/wishlist")}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Gift className="w-5 h-5 text-pink-500" />
                おねだりリスト
              </CardTitle>
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation()
                  router.push("/wishlist")
                }}
              >
                <Plus className="w-4 h-4 mr-1" />
                追加
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
              <span className="text-sm">新しいカフェでデート</span>
              <Badge variant="secondary" className="text-xs">
                ¥3,000
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="text-sm">マッサージ30分</span>
              <Badge variant="secondary" className="text-xs">
                無料
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />

      {/* Bottom padding for fixed nav */}
      <div className="h-20"></div>
    </div>
  )
}
