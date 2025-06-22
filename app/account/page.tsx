"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BackButton } from "@/components/back-button"
import {
  Settings,
  Heart,
  Shield,
  Bell,
  HelpCircle,
  LogOut,
  Edit,
  Camera,
  Crown,
  Coins,
  Calendar,
  ChevronRight,
  Check,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function AccountPage() {
  const router = useRouter()
  const [user] = useState({
    name: "あなた",
    email: "you@example.com",
    mbtiType: "ENFP",
    avatar: "/placeholder.svg?height=80&width=80",
    joinDate: "2024年1月15日",
    thanksPoints: 85,
    relationshipDays: 127,
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState(user)

  // menuItems配列からプロフィール編集の項目を削除

  const menuItems = [
    {
      icon: Heart,
      title: "カップル設定",
      description: "パートナーとの関係設定",
      path: "/account/couple",
      color: "text-pink-600",
    },
    {
      icon: Bell,
      title: "通知設定",
      description: "通知の種類と頻度を設定",
      path: "/account/notifications",
      color: "text-orange-600",
    },
    {
      icon: Shield,
      title: "プライバシー設定",
      description: "データの共有範囲を設定",
      path: "/account/privacy",
      color: "text-green-600",
    },
    {
      icon: Settings,
      title: "アプリ設定",
      description: "テーマ、言語、その他の設定",
      path: "/account/settings",
      color: "text-gray-600",
    },
    {
      icon: HelpCircle,
      title: "ヘルプ・サポート",
      description: "よくある質問とお問い合わせ",
      path: "/account/help",
      color: "text-purple-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BackButton />
              <h1 className="font-bold text-lg text-gray-800">アカウント</h1>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                if (isEditing) {
                  // 保存処理
                  console.log("保存:", editedUser)
                  setIsEditing(false)
                } else {
                  setIsEditing(true)
                }
              }}
            >
              {isEditing ? <Check className="w-5 h-5" /> : <Edit className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* プロフィールカード */}
        <Card className="bg-gradient-to-r from-pink-500 to-orange-500 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="w-16 h-16 border-3 border-white">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-white text-pink-600 text-lg font-bold">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute -bottom-1 -right-1 w-6 h-6 bg-white text-pink-600 hover:bg-gray-100"
                >
                  <Camera className="w-3 h-3" />
                </Button>
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <input
                    type="text"
                    value={editedUser.name}
                    onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                    className="font-bold text-xl bg-transparent border-b border-white/50 text-white placeholder-white/70"
                  />
                ) : (
                  <h2 className="font-bold text-xl">{editedUser.name}</h2>
                )}

                {isEditing ? (
                  <input
                    type="email"
                    value={editedUser.email}
                    onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                    className="text-sm opacity-90 bg-transparent border-b border-white/50 text-white placeholder-white/70"
                  />
                ) : (
                  <p className="text-sm opacity-90">{editedUser.email}</p>
                )}
                <div className="flex items-center gap-2 mt-2">
                  {isEditing ? (
                    <select
                      value={editedUser.mbtiType}
                      onChange={(e) => setEditedUser({ ...editedUser, mbtiType: e.target.value })}
                      className="bg-white/20 text-white border-white/30 rounded px-2 py-1 text-sm"
                    >
                      <option value="ENFP">ENFP</option>
                      <option value="INFP">INFP</option>
                      <option value="ENFJ">ENFJ</option>
                      <option value="INFJ">INFJ</option>
                      <option value="ENTP">ENTP</option>
                      <option value="INTP">INTP</option>
                      <option value="ENTJ">ENTJ</option>
                      <option value="INTJ">INTJ</option>
                      <option value="ESFP">ESFP</option>
                      <option value="ISFP">ISFP</option>
                      <option value="ESFJ">ESFJ</option>
                      <option value="ISFJ">ISFJ</option>
                      <option value="ESTP">ESTP</option>
                      <option value="ISTP">ISTP</option>
                      <option value="ESTJ">ESTJ</option>
                      <option value="ISTJ">ISTJ</option>
                    </select>
                  ) : (
                    <Badge className="bg-white/20 text-white border-white/30">{editedUser.mbtiType}</Badge>
                  )}
                  <Badge className="bg-white/20 text-white border-white/30">
                    <Crown className="w-3 h-3 mr-1" />
                    プレミアム
                  </Badge>
                  {isEditing && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditedUser(user)
                        setIsEditing(false)
                      }}
                      className="text-white hover:bg-white/20"
                    >
                      キャンセル
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 統計情報 */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="text-center">
            <CardContent className="p-4">
              <Coins className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <div className="text-lg font-bold text-gray-800">{user.thanksPoints}</div>
              <div className="text-xs text-gray-500">ポイント</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <Calendar className="w-6 h-6 text-pink-500 mx-auto mb-2" />
              <div className="text-lg font-bold text-gray-800">{user.relationshipDays}</div>
              <div className="text-xs text-gray-500">日目</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <Heart className="w-6 h-6 text-red-500 mx-auto mb-2" />
              <div className="text-lg font-bold text-gray-800">87%</div>
              <div className="text-xs text-gray-500">相性度</div>
            </CardContent>
          </Card>
        </div>

        {/* メニュー項目 */}
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Card
                key={item.path}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => router.push(item.path)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-gray-100 ${item.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">{item.title}</h3>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* アカウント情報 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-600">アカウント情報</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">登録日</span>
              <span className="text-sm font-medium">{user.joinDate}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">プラン</span>
              <Badge className="bg-gradient-to-r from-pink-500 to-orange-500 text-white">プレミアム</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">バージョン</span>
              <span className="text-sm font-medium">1.0.0</span>
            </div>
          </CardContent>
        </Card>

        {/* ログアウト */}
        <Card className="border-red-200">
          <CardContent className="p-4">
            <Button
              variant="ghost"
              className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => {
                // ログアウト処理
                console.log("ログアウト")
              }}
            >
              <LogOut className="w-5 h-5 mr-2" />
              ログアウト
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
