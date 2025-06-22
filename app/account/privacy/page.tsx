"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BackButton } from "@/components/back-button"
import { Shield, Eye, Lock, Trash2, Download, Save } from "lucide-react"

export default function PrivacySettingsPage() {
  const [settings, setSettings] = useState({
    profileVisibility: "partner", // partner, private
    locationSharing: true,
    activityStatus: true,
    dataCollection: false,
    analyticsSharing: false,
    thirdPartySharing: false,
    autoDelete: false,
    autoDeleteDays: "365",
    twoFactorAuth: false,
  })

  const handleSave = () => {
    console.log("プライバシー設定保存:", settings)
    alert("設定を保存しました")
  }

  const handleDataExport = () => {
    console.log("データエクスポート開始")
    alert("データのエクスポートを開始しました。完了時にメールでお知らせします。")
  }

  const handleDataDelete = () => {
    if (confirm("本当にすべてのデータを削除しますか？この操作は取り消せません。")) {
      console.log("データ削除実行")
      alert("データの削除を開始しました。")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-red-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <BackButton />
            <h1 className="font-bold text-lg text-gray-800">プライバシー設定</h1>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-1" />
              保存
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* プロフィール設定 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-green-600" />
              プロフィール設定
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>プロフィールの公開範囲</Label>
              <Select
                value={settings.profileVisibility}
                onValueChange={(value) => setSettings({ ...settings, profileVisibility: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="partner">パートナーのみ</SelectItem>
                  <SelectItem value="private">非公開</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>位置情報の共有</Label>
                <p className="text-sm text-gray-500">パートナーと位置情報を共有</p>
              </div>
              <Switch
                checked={settings.locationSharing}
                onCheckedChange={(checked) => setSettings({ ...settings, locationSharing: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>アクティビティ状態</Label>
                <p className="text-sm text-gray-500">オンライン状態を表示</p>
              </div>
              <Switch
                checked={settings.activityStatus}
                onCheckedChange={(checked) => setSettings({ ...settings, activityStatus: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* データ設定 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              データ設定
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>データ収集を許可</Label>
                <p className="text-sm text-gray-500">アプリ改善のためのデータ収集</p>
              </div>
              <Switch
                checked={settings.dataCollection}
                onCheckedChange={(checked) => setSettings({ ...settings, dataCollection: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>分析データの共有</Label>
                <p className="text-sm text-gray-500">匿名化された使用統計の共有</p>
              </div>
              <Switch
                checked={settings.analyticsSharing}
                onCheckedChange={(checked) => setSettings({ ...settings, analyticsSharing: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>第三者との共有</Label>
                <p className="text-sm text-gray-500">パートナー企業とのデータ共有</p>
              </div>
              <Switch
                checked={settings.thirdPartySharing}
                onCheckedChange={(checked) => setSettings({ ...settings, thirdPartySharing: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* セキュリティ */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-green-600" />
              セキュリティ
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>二段階認証</Label>
                <p className="text-sm text-gray-500">ログイン時の追加認証</p>
              </div>
              <Switch
                checked={settings.twoFactorAuth}
                onCheckedChange={(checked) => setSettings({ ...settings, twoFactorAuth: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>自動データ削除</Label>
                <p className="text-sm text-gray-500">古いデータの自動削除</p>
              </div>
              <Switch
                checked={settings.autoDelete}
                onCheckedChange={(checked) => setSettings({ ...settings, autoDelete: checked })}
              />
            </div>
            {settings.autoDelete && (
              <div>
                <Label>削除期間</Label>
                <Select
                  value={settings.autoDeleteDays}
                  onValueChange={(value) => setSettings({ ...settings, autoDeleteDays: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="90">90日後</SelectItem>
                    <SelectItem value="180">180日後</SelectItem>
                    <SelectItem value="365">1年後</SelectItem>
                    <SelectItem value="730">2年後</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </CardContent>
        </Card>

        {/* データ管理 */}
        <Card>
          <CardHeader>
            <CardTitle>データ管理</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full" onClick={handleDataExport}>
              <Download className="w-4 h-4 mr-2" />
              データをエクスポート
            </Button>
            <Button variant="destructive" className="w-full" onClick={handleDataDelete}>
              <Trash2 className="w-4 h-4 mr-2" />
              すべてのデータを削除
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
