"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BackButton } from "@/components/back-button"
import { Bell, Heart, CheckSquare, Calendar, Gift, MessageCircle, Save } from "lucide-react"

export default function NotificationSettingsPage() {
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: false,
    thanksPoints: true,
    tasks: true,
    anniversaries: true,
    wishlist: true,
    messages: true,
    quietHours: true,
    quietStart: "22:00",
    quietEnd: "08:00",
    frequency: "immediate", // immediate, hourly, daily
  })

  const handleSave = () => {
    console.log("通知設定保存:", settings)
    alert("設定を保存しました")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-red-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <BackButton />
            <h1 className="font-bold text-lg text-gray-800">通知設定</h1>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-1" />
              保存
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* 基本設定 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-orange-600" />
              基本設定
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>プッシュ通知</Label>
                <p className="text-sm text-gray-500">アプリからの通知を受け取る</p>
              </div>
              <Switch
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => setSettings({ ...settings, pushNotifications: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>メール通知</Label>
                <p className="text-sm text-gray-500">メールでの通知を受け取る</p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
              />
            </div>
            <div>
              <Label>通知頻度</Label>
              <Select
                value={settings.frequency}
                onValueChange={(value) => setSettings({ ...settings, frequency: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">即座に通知</SelectItem>
                  <SelectItem value="hourly">1時間ごとにまとめて</SelectItem>
                  <SelectItem value="daily">1日1回まとめて</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* 通知タイプ */}
        <Card>
          <CardHeader>
            <CardTitle>通知タイプ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-pink-500" />
                <div>
                  <Label>ありがとうポイント</Label>
                  <p className="text-sm text-gray-500">ポイント獲得時の通知</p>
                </div>
              </div>
              <Switch
                checked={settings.thanksPoints}
                onCheckedChange={(checked) => setSettings({ ...settings, thanksPoints: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckSquare className="w-5 h-5 text-green-500" />
                <div>
                  <Label>タスク</Label>
                  <p className="text-sm text-gray-500">タスクの追加・完了通知</p>
                </div>
              </div>
              <Switch
                checked={settings.tasks}
                onCheckedChange={(checked) => setSettings({ ...settings, tasks: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-purple-500" />
                <div>
                  <Label>記念日</Label>
                  <p className="text-sm text-gray-500">記念日のリマインダー</p>
                </div>
              </div>
              <Switch
                checked={settings.anniversaries}
                onCheckedChange={(checked) => setSettings({ ...settings, anniversaries: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Gift className="w-5 h-5 text-orange-500" />
                <div>
                  <Label>おねだりリスト</Label>
                  <p className="text-sm text-gray-500">リスト更新の通知</p>
                </div>
              </div>
              <Switch
                checked={settings.wishlist}
                onCheckedChange={(checked) => setSettings({ ...settings, wishlist: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-blue-500" />
                <div>
                  <Label>メッセージ</Label>
                  <p className="text-sm text-gray-500">新しいメッセージの通知</p>
                </div>
              </div>
              <Switch
                checked={settings.messages}
                onCheckedChange={(checked) => setSettings({ ...settings, messages: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* サイレント時間 */}
        <Card>
          <CardHeader>
            <CardTitle>サイレント時間</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>サイレント時間を有効にする</Label>
                <p className="text-sm text-gray-500">指定した時間は通知を停止</p>
              </div>
              <Switch
                checked={settings.quietHours}
                onCheckedChange={(checked) => setSettings({ ...settings, quietHours: checked })}
              />
            </div>
            {settings.quietHours && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>開始時間</Label>
                  <Select
                    value={settings.quietStart}
                    onValueChange={(value) => setSettings({ ...settings, quietStart: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }, (_, i) => (
                        <SelectItem key={i} value={`${i.toString().padStart(2, "0")}:00`}>
                          {`${i.toString().padStart(2, "0")}:00`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>終了時間</Label>
                  <Select
                    value={settings.quietEnd}
                    onValueChange={(value) => setSettings({ ...settings, quietEnd: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }, (_, i) => (
                        <SelectItem key={i} value={`${i.toString().padStart(2, "0")}:00`}>
                          {`${i.toString().padStart(2, "0")}:00`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
