"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { BackButton } from "@/components/back-button"
import { Settings, Plus, X, AlertTriangle, Heart } from "lucide-react"

export default function MenuSettingsPage() {
  const [allergies, setAllergies] = useState([
    { id: 1, name: "卵", active: false },
    { id: 2, name: "乳製品", active: false },
    { id: 3, name: "小麦", active: false },
    { id: 4, name: "大豆", active: true },
    { id: 5, name: "ナッツ類", active: false },
    { id: 6, name: "魚介類", active: false },
  ])

  const [dislikes, setDislikes] = useState(["パクチー", "セロリ", "レバー"])

  const [newAllergy, setNewAllergy] = useState("")
  const [newDislike, setNewDislike] = useState("")

  const toggleAllergy = (id: number) => {
    setAllergies((prev) =>
      prev.map((allergy) => (allergy.id === id ? { ...allergy, active: !allergy.active } : allergy)),
    )
  }

  const addAllergy = () => {
    if (newAllergy.trim()) {
      setAllergies((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: newAllergy.trim(),
          active: true,
        },
      ])
      setNewAllergy("")
    }
  }

  const addDislike = () => {
    if (newDislike.trim() && !dislikes.includes(newDislike.trim())) {
      setDislikes((prev) => [...prev, newDislike.trim()])
      setNewDislike("")
    }
  }

  const removeDislike = (item: string) => {
    setDislikes((prev) => prev.filter((dislike) => dislike !== item))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-red-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <BackButton href="/menu-suggestion" />
            <div className="flex items-center gap-2">
              <Settings className="w-6 h-6 text-gray-600" />
              <h1 className="font-bold text-lg text-gray-800">献立設定</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Allergies */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              アレルギー情報
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {allergies.map((allergy) => (
                <div key={allergy.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`allergy-${allergy.id}`}
                    checked={allergy.active}
                    onCheckedChange={() => toggleAllergy(allergy.id)}
                  />
                  <label htmlFor={`allergy-${allergy.id}`} className="text-sm">
                    {allergy.name}
                  </label>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="新しいアレルギーを追加"
                value={newAllergy}
                onChange={(e) => setNewAllergy(e.target.value)}
                className="flex-1"
              />
              <Button onClick={addAllergy} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {allergies
                .filter((a) => a.active)
                .map((allergy) => (
                  <Badge key={allergy.id} className="bg-red-100 text-red-700">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    {allergy.name}
                  </Badge>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Dislikes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <X className="w-5 h-5 text-orange-500" />
              苦手な食材
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="苦手な食材を追加"
                value={newDislike}
                onChange={(e) => setNewDislike(e.target.value)}
                className="flex-1"
              />
              <Button onClick={addDislike} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {dislikes.map((item, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-red-50"
                  onClick={() => removeDislike(item)}
                >
                  {item}
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Dietary Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Heart className="w-5 h-5 text-green-500" />
              食事の好み
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="vegetarian" />
                <label htmlFor="vegetarian" className="text-sm">
                  ベジタリアン
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="vegan" />
                <label htmlFor="vegan" className="text-sm">
                  ビーガン
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="low-carb" />
                <label htmlFor="low-carb" className="text-sm">
                  低糖質
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="high-protein" />
                <label htmlFor="high-protein" className="text-sm">
                  高タンパク
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
          設定を保存
        </Button>
      </div>
    </div>
  )
}
