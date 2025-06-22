"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BackButton } from "@/components/back-button"
import { Settings, Plus, Trash2 } from "lucide-react"

export default function ThanksPointsSettingsPage() {
  const [pointActions, setPointActions] = useState([
    { id: 1, action: "洗濯物を畳む", points: 10 },
    { id: 2, action: "料理を作る", points: 15 },
    { id: 3, action: "掃除をする", points: 12 },
    { id: 4, action: "買い物に行く", points: 8 },
  ])

  const [newAction, setNewAction] = useState({ action: "", points: "" })

  const addAction = () => {
    if (newAction.action && newAction.points) {
      setPointActions((prev) => [
        ...prev,
        {
          id: Date.now(),
          action: newAction.action,
          points: Number.parseInt(newAction.points),
        },
      ])
      setNewAction({ action: "", points: "" })
    }
  }

  const removeAction = (id: number) => {
    setPointActions((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-red-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <BackButton href="/thanks-points" />
            <div className="flex items-center gap-2">
              <Settings className="w-6 h-6 text-gray-600" />
              <h1 className="font-bold text-lg text-gray-800">ポイント設定</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Add New Action */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">新しいアクション追加</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="アクション名（例：洗濯物を畳む）"
              value={newAction.action}
              onChange={(e) => setNewAction((prev) => ({ ...prev, action: e.target.value }))}
            />
            <Input
              placeholder="獲得ポイント"
              type="number"
              value={newAction.points}
              onChange={(e) => setNewAction((prev) => ({ ...prev, points: e.target.value }))}
            />
            <Button onClick={addAction} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              追加
            </Button>
          </CardContent>
        </Card>

        {/* Current Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">現在のアクション</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pointActions.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium">{item.action}</h3>
                  <p className="text-sm text-gray-500">{item.points}ポイント</p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => removeAction(item.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
