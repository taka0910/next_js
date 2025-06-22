"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { BackButton } from "@/components/back-button"
import { Coins, Plus, Gift, History, Settings } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ThanksPointsPage() {
  const [myPoints] = useState(85)
  const [partnerPoints] = useState(72)
  const [showAddReward, setShowAddReward] = useState(false)
  const [newReward, setNewReward] = useState({ title: "", points: "", description: "" })

  const [rewards] = useState([
    { id: 1, title: "30分マッサージ", points: 50, description: "肩こり解消マッサージ", owner: "あなた" },
    { id: 2, title: "好きな映画を選ぶ権利", points: 30, description: "次のデート映画を選べる", owner: "パートナー" },
    { id: 3, title: "朝食作ってもらう", points: 40, description: "休日の朝食をお任せ", owner: "あなた" },
    { id: 4, title: "カフェデート", points: 80, description: "新しいカフェでデート", owner: "パートナー" },
  ])

  const [history] = useState([
    { id: 1, action: "洗濯物を畳んでくれた", points: 10, from: "パートナー", to: "あなた", date: "今日" },
    { id: 2, action: "美味しい夕飯を作ってくれた", points: 15, from: "あなた", to: "パートナー", date: "昨日" },
    { id: 3, action: "掃除を手伝ってくれた", points: 12, from: "パートナー", to: "あなた", date: "2日前" },
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
                <Coins className="w-6 h-6 text-orange-600" />
                <h1 className="font-bold text-lg text-gray-800">ありがとうポイント</h1>
              </div>
            </div>
            <Button size="sm" variant="outline" onClick={() => router.push("/thanks-points/settings")}>
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Current Points */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-gradient-to-br from-pink-100 to-pink-200 border-pink-300">
            <CardContent className="p-4 text-center">
              <Avatar className="w-12 h-12 mx-auto mb-2">
                <AvatarFallback className="bg-pink-500 text-white">あ</AvatarFallback>
              </Avatar>
              <div className="text-2xl font-bold text-pink-700">{myPoints}pt</div>
              <div className="text-sm text-pink-600">あなた</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-orange-100 to-orange-200 border-orange-300">
            <CardContent className="p-4 text-center">
              <Avatar className="w-12 h-12 mx-auto mb-2">
                <AvatarFallback className="bg-orange-500 text-white">パ</AvatarFallback>
              </Avatar>
              <div className="text-2xl font-bold text-orange-700">{partnerPoints}pt</div>
              <div className="text-sm text-orange-600">パートナー</div>
            </CardContent>
          </Card>
        </div>

        {/* Available Rewards */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Gift className="w-5 h-5 text-purple-600" />
                交換可能な特典
              </CardTitle>
              <Button size="sm" variant="outline" onClick={() => setShowAddReward(!showAddReward)}>
                <Plus className="w-4 h-4 mr-1" />
                追加
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {showAddReward && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4 space-y-3">
                  <Input
                    placeholder="特典名（例：マッサージ30分）"
                    value={newReward.title}
                    onChange={(e) => setNewReward((prev) => ({ ...prev, title: e.target.value }))}
                  />
                  <Input
                    placeholder="必要ポイント"
                    type="number"
                    value={newReward.points}
                    onChange={(e) => setNewReward((prev) => ({ ...prev, points: e.target.value }))}
                  />
                  <Textarea
                    placeholder="詳細説明"
                    value={newReward.description}
                    onChange={(e) => setNewReward((prev) => ({ ...prev, description: e.target.value }))}
                    className="min-h-[60px]"
                  />
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      保存
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setShowAddReward(false)}>
                      キャンセル
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {rewards.map((reward) => (
              <div
                key={reward.id}
                className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-purple-800">{reward.title}</h3>
                  <p className="text-sm text-purple-600">{reward.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {reward.owner}の特典
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className="bg-purple-600 mb-2">{reward.points}pt</Badge>
                  <Button
                    size="sm"
                    disabled={
                      (reward.owner === "あなた" && partnerPoints < reward.points) ||
                      (reward.owner === "パートナー" && myPoints < reward.points)
                    }
                  >
                    交換
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* History */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <History className="w-5 h-5 text-green-600" />
              最近の履歴
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {history.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.action}</p>
                  <p className="text-xs text-gray-500">
                    {item.from} → {item.to} • {item.date}
                  </p>
                </div>
                <Badge className="bg-green-600">+{item.points}pt</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
