"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BackButton } from "@/components/back-button"
import { Palette, Globe, Smartphone, Save } from "lucide-react"

export default function AppSettingsPage() {
  const [settings, setSettings] = useState({
    theme: "system", // light, dark, system
    language: "ja",
    fontSize: "medium",
    autoSync: true,
    offlineMode: false,
    hapticFeedback: true,
    soundEffects: true,
    autoBackup: true,
    backgroundRefresh: true,
    dataUsage: "wifi", // wifi, cellular, both
  })

  const handleSave = () => {
    console.log("アプリ設定保存:", settings)
    alert("設定を保存しました")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-red-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <BackButton />
            <h1 className="font-bold text-lg text-gray-800">アプリ設定</h1>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-1" />
              保存
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* 外観設定 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-gray-600" />
              外観設定
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>テーマ</Label>
              <Select value={settings.theme} onValueChange={(value) => setSettings({ ...settings, theme: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">ライト</SelectItem>
                  <SelectItem value="dark">ダーク</SelectItem>
                  <SelectItem value="system">システム設定に従う</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>フォントサイズ</Label>
              <Select
                value={settings.fontSize}
                onValueChange={(value) => setSettings({ ...settings, fontSize: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">小</SelectItem>
                  <SelectItem value="medium">中</SelectItem>
                  <SelectItem value="large">大</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* 言語設定 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-gray-600" />
              言語設定
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label>言語</Label>
              <Select
                value={settings.language}
                onValueChange={(value) => setSettings({ ...settings, language: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ja">日本語</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ko">한국어</SelectItem>
                  <SelectItem value="zh">中文</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* 同期設定 */}
        <Card>
          <CardHeader>
            <CardTitle>同期設定</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>自動同期</Label>
                <p className="text-sm text-gray-500">データの自動同期を有効にする</p>
              </div>
              <Switch
                checked={settings.autoSync}
                onCheckedChange={(checked) => setSettings({ ...settings, autoSync: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>オフラインモード</Label>
                <p className="text-sm text-gray-500">ネット接続なしでも利用可能</p>
              </div>
              <Switch
                checked={settings.offlineMode}
                onCheckedChange={(checked) => setSettings({ ...settings, offlineMode: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>自動バックアップ</Label>
                <p className="text-sm text-gray-500">データの自動バックアップ</p>
              </div>
              <Switch
                checked={settings.autoBackup}
                onCheckedChange={(checked) => setSettings({ ...settings, autoBackup: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* デバイス設定 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-gray-600" />
              デバイス設定
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>触覚フィードバック</Label>
                <p className="text-sm text-gray-500">タップ時の振動</p>
              </div>
              <Switch
                checked={settings.hapticFeedback}
                onCheckedChange={(checked) => setSettings({ ...settings, hapticFeedback: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>効果音</Label>
                <p className="text-sm text-gray-500">アプリの効果音を再生</p>
              </div>
              <Switch
                checked={settings.soundEffects}
                onCheckedChange={(checked) => setSettings({ ...settings, soundEffects: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>バックグラウンド更新</Label>
                <p className="text-sm text-gray-500">アプリ非使用時の更新</p>
              </div>
              <Switch
                checked={settings.backgroundRefresh}
                onCheckedChange={(checked) => setSettings({ ...settings, backgroundRefresh: checked })}
              />
            </div>
            <div>
              <Label>データ使用量</Label>
              <Select
                value={settings.dataUsage}
                onValueChange={(value) => setSettings({ ...settings, dataUsage: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wifi">Wi-Fiのみ</SelectItem>
                  <SelectItem value="cellular">モバイルデータのみ</SelectItem>
                  <SelectItem value="both">Wi-Fi + モバイルデータ</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
