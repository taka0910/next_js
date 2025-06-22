"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BackButton } from "@/components/back-button"
import { Calculator, Plus, TrendingUp, TrendingDown, Receipt, Settings, PiggyBank } from "lucide-react"
import { useRouter } from "next/navigation"

export default function HouseholdPage() {
  const [expenses] = useState([
    { id: 1, category: "食費", amount: 45000, paidBy: "あなた", date: "2024-06-10", status: "完了", type: "expense" },
    {
      id: 2,
      category: "光熱費",
      amount: 12000,
      paidBy: "パートナー",
      date: "2024-06-08",
      status: "完了",
      type: "expense",
    },
    { id: 3, category: "家賃", amount: 80000, paidBy: "あなた", date: "2024-06-01", status: "完了", type: "expense" },
    {
      id: 4,
      category: "日用品",
      amount: 8500,
      paidBy: "パートナー",
      date: "2024-06-12",
      status: "完了",
      type: "expense",
    },
    { id: 5, category: "通信費", amount: 15000, paidBy: "あなた", date: "2024-06-05", status: "完了", type: "expense" },
    { id: 6, category: "二人貯金", amount: 50000, paidBy: "共同", date: "2024-06-01", status: "完了", type: "savings" },
  ])

  const [showAddExpense, setShowAddExpense] = useState(false)
  const [newExpense, setNewExpense] = useState({
    category: "",
    amount: "",
    paidBy: "",
    date: "",
    type: "expense",
  })

  const router = useRouter()

  const totalExpenses = expenses.filter((e) => e.type === "expense").reduce((sum, expense) => sum + expense.amount, 0)
  const totalSavings = expenses.filter((e) => e.type === "savings").reduce((sum, expense) => sum + expense.amount, 0)
  const myExpenses = expenses
    .filter((e) => e.paidBy === "あなた" && e.type === "expense")
    .reduce((sum, expense) => sum + expense.amount, 0)
  const partnerExpenses = expenses
    .filter((e) => e.paidBy === "パートナー" && e.type === "expense")
    .reduce((sum, expense) => sum + expense.amount, 0)
  const balance = myExpenses - partnerExpenses

  const categoryTotals = expenses
    .filter((e) => e.type === "expense")
    .reduce(
      (acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount
        return acc
      },
      {} as Record<string, number>,
    )

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-red-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BackButton href="/" />
              <div className="flex items-center gap-2">
                <Calculator className="w-6 h-6 text-indigo-600" />
                <h1 className="font-bold text-lg text-gray-800">家計簿</h1>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => router.push("/household/settings")}>
                <Settings className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                className="bg-indigo-500 hover:bg-indigo-600"
                onClick={() => setShowAddExpense(!showAddExpense)}
              >
                <Plus className="w-4 h-4 mr-1" />
                追加
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-gradient-to-br from-red-100 to-red-200 border-red-300">
            <CardContent className="p-4 text-center">
              <TrendingDown className="w-6 h-6 text-red-600 mx-auto mb-2" />
              <div className="text-lg font-bold text-red-700">¥{totalExpenses.toLocaleString()}</div>
              <div className="text-xs text-red-600">今月の支出</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-100 to-green-200 border-green-300">
            <CardContent className="p-4 text-center">
              <PiggyBank className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <div className="text-lg font-bold text-green-700">¥{totalSavings.toLocaleString()}</div>
              <div className="text-xs text-green-600">二人貯金</div>
            </CardContent>
          </Card>
          <Card
            className={`bg-gradient-to-br ${balance >= 0 ? "from-blue-100 to-blue-200 border-blue-300" : "from-orange-100 to-orange-200 border-orange-300"}`}
          >
            <CardContent className="p-4 text-center">
              {balance >= 0 ? (
                <TrendingUp className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              ) : (
                <TrendingDown className="w-6 h-6 text-orange-600 mx-auto mb-2" />
              )}
              <div className={`text-lg font-bold ${balance >= 0 ? "text-blue-700" : "text-orange-700"}`}>
                ¥{Math.abs(balance).toLocaleString()}
              </div>
              <div className={`text-xs ${balance >= 0 ? "text-blue-600" : "text-orange-600"}`}>
                {balance >= 0 ? "あなたが多く" : "パートナーが多く"}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Individual Spending */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-xl font-bold text-pink-600">¥{myExpenses.toLocaleString()}</div>
              <div className="text-sm text-gray-500">あなたの支出</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-xl font-bold text-orange-600">¥{partnerExpenses.toLocaleString()}</div>
              <div className="text-sm text-gray-500">パートナーの支出</div>
            </CardContent>
          </Card>
        </div>

        {/* Add Expense Form */}
        {showAddExpense && (
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg">新しい記録を追加</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select
                value={newExpense.type}
                onValueChange={(value) => setNewExpense((prev) => ({ ...prev, type: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="種類を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="expense">支出</SelectItem>
                  <SelectItem value="savings">二人貯金</SelectItem>
                </SelectContent>
              </Select>

              {newExpense.type === "expense" && (
                <Select
                  value={newExpense.category}
                  onValueChange={(value) => setNewExpense((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="カテゴリを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="食費">食費</SelectItem>
                    <SelectItem value="光熱費">光熱費</SelectItem>
                    <SelectItem value="家賃">家賃</SelectItem>
                    <SelectItem value="日用品">日用品</SelectItem>
                    <SelectItem value="通信費">通信費</SelectItem>
                    <SelectItem value="交通費">交通費</SelectItem>
                    <SelectItem value="娯楽費">娯楽費</SelectItem>
                    <SelectItem value="その他">その他</SelectItem>
                  </SelectContent>
                </Select>
              )}

              <Input
                placeholder="金額"
                type="number"
                value={newExpense.amount}
                onChange={(e) => setNewExpense((prev) => ({ ...prev, amount: e.target.value }))}
              />

              {newExpense.type === "expense" && (
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
              )}

              <Input
                type="date"
                value={newExpense.date}
                onChange={(e) => setNewExpense((prev) => ({ ...prev, date: e.target.value }))}
              />
              <div className="flex gap-2">
                <Button className="flex-1">保存</Button>
                <Button variant="outline" onClick={() => setShowAddExpense(false)}>
                  キャンセル
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">カテゴリ別支出</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(categoryTotals).map(([category, amount]) => (
              <div
                key={category}
                className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200"
              >
                <div className="flex items-center gap-3">
                  <Receipt className="w-4 h-4 text-red-500" />
                  <span className="font-medium text-red-800">{category}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-red-700">¥{amount.toLocaleString()}</div>
                  <div className="text-xs text-red-600">{((amount / totalExpenses) * 100).toFixed(1)}%</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Records */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">最近の記録</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {expenses.slice(0, 5).map((expense) => (
              <div key={expense.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{expense.category || "二人貯金"}</span>
                    <Badge variant="outline" className="text-xs">
                      {expense.paidBy}
                    </Badge>
                    {expense.type === "savings" && <Badge className="bg-green-100 text-green-700 text-xs">貯金</Badge>}
                  </div>
                  <div className="text-xs text-gray-500">{expense.date}</div>
                </div>
                <div className="text-right">
                  <div className={`font-bold ${expense.type === "expense" ? "text-red-600" : "text-green-600"}`}>
                    {expense.type === "expense" ? "-" : "+"}¥{expense.amount.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
