"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { BackButton } from "@/components/back-button"
import { Settings, Plus, Trash2, Receipt } from "lucide-react"

export default function HouseholdSettingsPage() {
  const [fixedExpenses, setFixedExpenses] = useState([
    { id: 1, category: "家賃", amount: 80000, paidBy: "あなた", day: 1 },
    { id: 2, category: "光熱費", amount: 12000, paidBy: "パートナー", day: 25 },
    { id: 3, category: "通信費", amount: 15000, paidBy: "あなた", day: 10 },
    { id: 4, category: "保険料", amount: 8000, paidBy: "パートナー", day: 15 },
  ])

  const [newExpense, setNewExpense] = useState({
    category: "",
    amount: "",
    paidBy: "",
    day: "",
  })

  const addFixedExpense = () => {
    if (newExpense.category && newExpense.amount && newExpense.paidBy && newExpense.day) {
      setFixedExpenses((prev) => [
        ...prev,
        {
          id: Date.now(),
          category: newExpense.category,
          amount: Number.parseInt(newExpense.amount),
          paidBy: newExpense.paidBy,
          day: Number.parseInt(newExpense.day),
        },
      ])
      setNewExpense({ category: "", amount: "", paidBy: "", day: "" })
    }
  }

  const removeFixedExpense = (id: number) => {
    setFixedExpenses((prev) => prev.filter((expense) => expense.id !== id))
  }

  const saveSettings = () => {
    // ここで設定を保存する処理
    console.log("固定支出設定を保存:", fixedExpenses)
    alert("設定を保存しました")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-red-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <BackButton href="/household" />
            <div className="flex items-center gap-2">
              <Settings className="w-6 h-6 text-gray-600" />
              <h1 className="font-bold text-lg text-gray-800">家計簿設定</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Add New Fixed Expense */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">毎月の固定支出を追加</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select
              value={newExpense.category}
              onValueChange={(value) => setNewExpense((prev) => ({ ...prev, category: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="カテゴリを選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="家賃">家賃</SelectItem>
                <SelectItem value="光熱費">光熱費</SelectItem>
                <SelectItem value="通信費">通信費</SelectItem>
                <SelectItem value="保険料">保険料</SelectItem>
                <SelectItem value="サブスクリプション">サブスクリプション</SelectItem>
                <SelectItem value="ローン">ローン</SelectItem>
                <SelectItem value="その他">その他</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="金額"
              type="number"
              value={newExpense.amount}
              onChange={(e) => setNewExpense((prev) => ({ ...prev, amount: e.target.value }))}
            />
            <Select
              value={newExpense.paidBy}
              onValueChange={(value) => setNewExpense((prev) => ({ ...prev, paidBy: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="支払者" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="あなた">あなた</SelectItem>
                <SelectItem value="パートナー">パートナー</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="支払日（1-31）"
              type="number"
              min="1"
              max="31"
              value={newExpense.day}
              onChange={(e) => setNewExpense((prev) => ({ ...prev, day: e.target.value }))}
            />
            <Button onClick={addFixedExpense} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              固定支出を追加
            </Button>
          </CardContent>
        </Card>

        {/* Current Fixed Expenses */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">現在の固定支出</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {fixedExpenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Receipt className="w-4 h-4 text-red-500" />
                    <h3 className="font-medium text-red-800">{expense.category}</h3>
                    <Badge variant="outline" className="text-xs">
                      {expense.paidBy}
                    </Badge>
                  </div>
                  <div className="text-sm text-red-600">
                    ¥{expense.amount.toLocaleString()} • 毎月{expense.day}日
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => removeFixedExpense(expense.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Save Button */}
        <Button onClick={saveSettings} className="w-full bg-indigo-500 hover:bg-indigo-600">
          設定を保存
        </Button>
      </div>
    </div>
  )
}
