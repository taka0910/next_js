"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BackButton } from "@/components/back-button"
import { Heart, Calendar, Save, Users } from "lucide-react"

export default function CoupleSettingsPage() {
  const [settings, setSettings] = useState({
    partnerName: "パートナー",
    partnerEmail: "partner@example.com",
    relationshipStart: "2023-06-15",
    firstMeetDate: "2023-05-01",
    livingTogetherDate: "2024-01-15",
    marriageDate: "",
    shareLocation: true,
    shareCalendar: true,
    shareExpenses: true,
    allowPartnerEdit: true,
    anniversaryReminders: true,
  })

  const handleSave = () => {
    console.log("カップル設定保存:", settings)
    alert("設定を保存しました")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-red-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <BackButton />
            <h1 className="font-bold text-lg text-gray-800">カップル設定</h1>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-1" />
              保存
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* パートナー情報 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-pink-600" />
              パートナー情報
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src="/placeholder.svg?height=64&width=64" />
                <AvatarFallback className="bg-orange-200 text-orange-700">パ</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <div>
                  <Label htmlFor="partnerName">パートナーの名前</Label>
                  <Input
                    id="partnerName"
                    value={settings.partnerName}
                    onChange={(e) => setSettings({ ...settings, partnerName: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="partnerEmail">パートナーのメール</Label>
                  <Input
                    id="partnerEmail"
                    type="email"
                    value={settings.partnerEmail}
                    onChange={(e) => setSettings({ ...settings, partnerEmail: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 記念日設定 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-pink-600" />
              記念日設定
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="firstMeet">初めて出会った日</Label>
              <Input
                id="firstMeet"
                type="date"
                value={settings.firstMeetDate}
                onChange={(e) => setSettings({ ...settings, firstMeetDate: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="relationshipStart">付き合い始めた日</Label>
              <Input
                id="relationshipStart"
                type="date"
                value={settings.relationshipStart}
                onChange={(e) => setSettings({ ...settings, relationshipStart: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="livingTogether">同棲開始日</Label>
              <Input
                id="livingTogether"
                type="date"
                value={settings.livingTogetherDate}
                onChange={(e) => setSettings({ ...settings, livingTogetherDate: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="marriage">結婚記念日（任意）</Label>
              <Input
                id="marriage"
                type="date"
                value={settings.marriageDate}
                onChange={(e) => setSettings({ ...settings, marriageDate: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        {/* 共有設定 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-600" />
              共有設定
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>位置情報を共有</Label>
                <p className="text-sm text-gray-500">お互いの現在地を共有します</p>
              </div>
              <Switch
                checked={settings.shareLocation}
                onCheckedChange={(checked) => setSettings({ ...settings, shareLocation: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>カレンダーを共有</Label>
                <p className="text-sm text-gray-500">予定とイベントを共有します</p>
              </div>
              <Switch
                checked={settings.shareCalendar}
                onCheckedChange={(checked) => setSettings({ ...settings, shareCalendar: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>家計簿を共有</Label>
                <p className="text-sm text-gray-500">支出と収入を共有します</p>
              </div>
              <Switch
                checked={settings.shareExpenses}
                onCheckedChange={(checked) => setSettings({ ...settings, shareExpenses: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>パートナーの編集を許可</Label>
                <p className="text-sm text-gray-500">あなたの情報の編集を許可します</p>
              </div>
              <Switch
                checked={settings.allowPartnerEdit}
                onCheckedChange={(checked) => setSettings({ ...settings, allowPartnerEdit: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>記念日リマインダー</Label>
                <p className="text-sm text-gray-500">記念日の通知を受け取ります</p>
              </div>
              <Switch
                checked={settings.anniversaryReminders}
                onCheckedChange={(checked) => setSettings({ ...settings, anniversaryReminders: checked })}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
