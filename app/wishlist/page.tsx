"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { BackButton } from "@/components/back-button"
import { Gift, Plus, Heart, Star, ExternalLink, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      title: "新しいカフェでデート",
      description: "インスタで見つけたおしゃれなカフェ",
      price: 3000,
      priority: "高",
      category: "デート",
      addedBy: "あなた",
      url: "https://example.com",
      achieved: false,
    },
    {
      id: 2,
      title: "マッサージ30分",
      description: "肩こりがひどいので...",
      price: 0,
      priority: "中",
      category: "リラックス",
      addedBy: "パートナー",
      url: "",
      achieved: false,
    },
    {
      id: 3,
      title: "新しいゲーム",
      description: "一緒にできるパズルゲーム",
      price: 5000,
      priority: "低",
      category: "娯楽",
      addedBy: "あなた",
      url: "https://example.com",
      achieved: true,
    },
    {
      id: 4,
      title: "温泉旅行",
      description: "箱根の温泉に行きたい",
      price: 25000,
      priority: "高",
      category: "旅行",
      addedBy: "パートナー",
      url: "",
      achieved: false,
    },
  ])

  const [showAddItem, setShowAddItem] = useState(false)
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    price: "",
    priority: "",
    category: "",
    url: "",
  })

  const router = useRouter()

  const addItem = () => {
    if (newItem.title && newItem.priority && newItem.category) {
      setWishlist((prev) => [
        ...prev,
        {
          id: Date.now(),
          title: newItem.title,
          description: newItem.description,
          price: Number.parseInt(newItem.price) || 0,
          priority: newItem.priority,
          category: newItem.category,
          addedBy: "あなた",
          url: newItem.url,
          achieved: false,
        },
      ])
      setNewItem({
        title: "",
        description: "",
        price: "",
        priority: "",
        category: "",
        url: "",
      })
      setShowAddItem(false)
    }
  }

  const removeItem = (id: number) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id))
  }

  const toggleAchieved = (id: number) => {
    setWishlist((prev) => prev.map((item) => (item.id === id ? { ...item, achieved: !item.achieved } : item)))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "高":
        return "bg-red-100 text-red-700"
      case "中":
        return "bg-yellow-100 text-yellow-700"
      case "低":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "デート":
        return "💕"
      case "リラックス":
        return "🧘‍♀️"
      case "娯楽":
        return "🎮"
      case "旅行":
        return "✈️"
      case "ファッション":
        return "👗"
      case "グルメ":
        return "🍽️"
      default:
        return "🎁"
    }
  }

  const activeItems = wishlist.filter((item) => !item.achieved)
  const achievedItems = wishlist.filter((item) => item.achieved)

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-red-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BackButton href="/" />
              <div className="flex items-center gap-2">
                <Gift className="w-6 h-6 text-pink-500" />
                <h1 className="font-bold text-lg text-gray-800">おねだりリスト</h1>
              </div>
            </div>
            <Button size="sm" className="bg-pink-500 hover:bg-pink-600" onClick={() => setShowAddItem(!showAddItem)}>
              <Plus className="w-4 h-4 mr-1" />
              追加
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-pink-600">{activeItems.length}</div>
              <div className="text-sm text-gray-500">欲しいもの</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{achievedItems.length}</div>
              <div className="text-sm text-gray-500">達成済み</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                ¥{activeItems.reduce((sum, item) => sum + item.price, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">総額</div>
            </CardContent>
          </Card>
        </div>

        {/* Add Item Form */}
        {showAddItem && (
          <Card className="bg-pink-50 border-pink-200">
            <CardHeader>
              <CardTitle className="text-lg">新しい欲しいものを追加</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="欲しいもの（例：新しいカフェでデート）"
                value={newItem.title}
                onChange={(e) => setNewItem((prev) => ({ ...prev, title: e.target.value }))}
              />
              <Textarea
                placeholder="詳細説明（任意）"
                value={newItem.description}
                onChange={(e) => setNewItem((prev) => ({ ...prev, description: e.target.value }))}
                className="min-h-[60px]"
              />
              <Input
                placeholder="予算（円）"
                type="number"
                value={newItem.price}
                onChange={(e) => setNewItem((prev) => ({ ...prev, price: e.target.value }))}
              />
              <Select
                value={newItem.priority}
                onValueChange={(value) => setNewItem((prev) => ({ ...prev, priority: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="優先度" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="高">高</SelectItem>
                  <SelectItem value="中">中</SelectItem>
                  <SelectItem value="低">低</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={newItem.category}
                onValueChange={(value) => setNewItem((prev) => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="カテゴリ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="デート">デート</SelectItem>
                  <SelectItem value="リラックス">リラックス</SelectItem>
                  <SelectItem value="娯楽">娯楽</SelectItem>
                  <SelectItem value="旅行">旅行</SelectItem>
                  <SelectItem value="ファッション">ファッション</SelectItem>
                  <SelectItem value="グルメ">グルメ</SelectItem>
                  <SelectItem value="その他">その他</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="参考URL（任意）"
                value={newItem.url}
                onChange={(e) => setNewItem((prev) => ({ ...prev, url: e.target.value }))}
              />
              <div className="flex gap-2">
                <Button onClick={addItem} className="flex-1">
                  追加
                </Button>
                <Button variant="outline" onClick={() => setShowAddItem(false)}>
                  キャンセル
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Active Wishlist */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              欲しいものリスト
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {activeItems.length > 0 ? (
              activeItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="text-2xl">{getCategoryIcon(item.category)}</div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800 mb-1">{item.title}</h3>
                        {item.description && <p className="text-sm text-gray-600 mb-2">{item.description}</p>}
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getPriorityColor(item.priority)}>{item.priority}優先度</Badge>
                          <Badge variant="outline" className="text-xs">
                            {item.category}
                          </Badge>
                          <Avatar className="w-5 h-5">
                            <AvatarFallback className="bg-pink-200 text-pink-700 text-xs">
                              {item.addedBy === "あなた" ? "あ" : "パ"}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        {item.price > 0 && (
                          <div className="text-lg font-bold text-green-600">¥{item.price.toLocaleString()}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => toggleAchieved(item.id)}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      <Heart className="w-3 h-3 mr-1" />
                      達成
                    </Button>
                    {item.url && (
                      <Button size="sm" variant="outline" asChild>
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          詳細
                        </a>
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">まだ欲しいものがありません</p>
            )}
          </CardContent>
        </Card>

        {/* Achieved Items */}
        {achievedItems.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Heart className="w-5 h-5 text-green-500" />
                達成済み
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {achievedItems.map((item) => (
                <div key={item.id} className="p-4 bg-green-50 rounded-lg border border-green-200 opacity-75">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="text-2xl">{getCategoryIcon(item.category)}</div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800 mb-1 line-through">{item.title}</h3>
                        {item.description && <p className="text-sm text-gray-600 mb-2">{item.description}</p>}
                        <Badge className="bg-green-100 text-green-700">達成済み ✓</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
