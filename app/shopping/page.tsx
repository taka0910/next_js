"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { BackButton } from "@/components/back-button"
import { ShoppingCart, Plus, Trash2, Check } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ShoppingPage() {
  const [shoppingList, setShoppingList] = useState([
    { id: 1, item: "牛乳", category: "乳製品", quantity: "1本", bought: false, addedBy: "あなた" },
    { id: 2, item: "卵", category: "食材", quantity: "1パック", bought: true, addedBy: "パートナー" },
    { id: 3, item: "パン", category: "食材", quantity: "1斤", bought: false, addedBy: "あなた" },
    { id: 4, item: "シャンプー", category: "日用品", quantity: "1本", bought: false, addedBy: "パートナー" },
    { id: 5, item: "トマト", category: "野菜", quantity: "3個", bought: false, addedBy: "あなた" },
  ])

  const [newItem, setNewItem] = useState({
    item: "",
    category: "",
    quantity: "",
  })

  const [showAddForm, setShowAddForm] = useState(false)
  const router = useRouter()

  const addItem = () => {
    if (newItem.item) {
      setShoppingList((prev) => [
        ...prev,
        {
          id: Date.now(),
          item: newItem.item,
          category: newItem.category || "その他",
          quantity: newItem.quantity || "1個",
          bought: false,
          addedBy: "あなた",
        },
      ])
      setNewItem({ item: "", category: "", quantity: "" })
      setShowAddForm(false)
    }
  }

  const toggleBought = (id: number) => {
    setShoppingList((prev) => prev.map((item) => (item.id === id ? { ...item, bought: !item.bought } : item)))
  }

  const removeItem = (id: number) => {
    setShoppingList((prev) => prev.filter((item) => item.id !== id))
  }

  const pendingItems = shoppingList.filter((item) => !item.bought)
  const boughtItems = shoppingList.filter((item) => item.bought)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "食材":
        return "bg-green-100 text-green-700"
      case "野菜":
        return "bg-emerald-100 text-emerald-700"
      case "乳製品":
        return "bg-blue-100 text-blue-700"
      case "日用品":
        return "bg-purple-100 text-purple-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-red-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BackButton href="/" />
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
                <h1 className="font-bold text-lg text-gray-800">買い物リスト</h1>
              </div>
            </div>
            <Button size="sm" className="bg-blue-500 hover:bg-blue-600" onClick={() => setShowAddForm(!showAddForm)}>
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
              <div className="text-2xl font-bold text-blue-600">{pendingItems.length}</div>
              <div className="text-sm text-gray-500">未購入</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{boughtItems.length}</div>
              <div className="text-sm text-gray-500">購入済み</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{shoppingList.length}</div>
              <div className="text-sm text-gray-500">合計</div>
            </CardContent>
          </Card>
        </div>

        {/* Add Item Form */}
        {showAddForm && (
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg">新しいアイテムを追加</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="商品名（例：牛乳）"
                value={newItem.item}
                onChange={(e) => setNewItem((prev) => ({ ...prev, item: e.target.value }))}
              />
              <Input
                placeholder="カテゴリ（例：食材）"
                value={newItem.category}
                onChange={(e) => setNewItem((prev) => ({ ...prev, category: e.target.value }))}
              />
              <Input
                placeholder="数量（例：1本）"
                value={newItem.quantity}
                onChange={(e) => setNewItem((prev) => ({ ...prev, quantity: e.target.value }))}
              />
              <div className="flex gap-2">
                <Button onClick={addItem} className="flex-1">
                  追加
                </Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  キャンセル
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Pending Items */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-blue-600" />
              買い物リスト ({pendingItems.length}件)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingItems.length > 0 ? (
              pendingItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                  <Checkbox checked={item.bought} onCheckedChange={() => toggleBought(item.id)} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{item.item}</h3>
                      <Badge className={getCategoryColor(item.category)} variant="outline">
                        {item.category}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-500">
                      {item.quantity} • {item.addedBy}が追加
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">買い物リストは空です</p>
            )}
          </CardContent>
        </Card>

        {/* Bought Items */}
        {boughtItems.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                購入済み ({boughtItems.length}件)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {boughtItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200 opacity-75"
                >
                  <Checkbox checked={item.bought} onCheckedChange={() => toggleBought(item.id)} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium line-through text-gray-500">{item.item}</h3>
                      <Badge className="bg-green-100 text-green-700" variant="outline">
                        購入済み
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-400">
                      {item.quantity} • {item.addedBy}が追加
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
