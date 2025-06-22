"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BackButton } from "@/components/back-button"
import { User, Camera, MapPin, Coffee, Palette, Edit, Save, X } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PartnerProfile() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "パートナー",
    nickname: "パーちゃん",
    birthday: "1993-08-22",
    bloodType: "B型",
    mbtiType: "ISFJ",
    hometown: "大阪府",
    job: "エンジニア",
    hobbies: ["プログラミング", "ゲーム", "料理", "散歩"],
    favoriteFood: "ラーメン、お寿司",
    favoriteColor: "ブルー",
    dreamDestination: "北欧",
  })

  const handleSave = () => {
    setIsEditing(false)
    // ここでAPIに保存処理を追加
  }

  const handleCancel = () => {
    setIsEditing(false)
    // 元の値に戻す処理
  }

  const addHobby = (hobby: string) => {
    if (hobby && !profile.hobbies.includes(hobby)) {
      setProfile({ ...profile, hobbies: [...profile.hobbies, hobby] })
    }
  }

  const removeHobby = (hobby: string) => {
    setProfile({ ...profile, hobbies: profile.hobbies.filter((h) => h !== hobby) })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <BackButton />
            <h1 className="font-bold text-lg text-gray-800">パートナーのプロフィール</h1>
            <Button
              variant={isEditing ? "default" : "ghost"}
              size="sm"
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
            >
              {isEditing ? <Save className="w-4 h-4 mr-1" /> : <Edit className="w-4 h-4 mr-1" />}
              {isEditing ? "保存" : "編集"}
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* プロフィール写真 */}
        <Card className="bg-gradient-to-r from-orange-100 to-amber-100 border-orange-200">
          <CardContent className="p-6 text-center">
            <div className="relative inline-block">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src="/placeholder.svg?height=96&width=96" />
                <AvatarFallback className="bg-orange-200 text-orange-700 text-2xl">パ</AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button size="icon" variant="secondary" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8">
                  <Camera className="w-4 h-4" />
                </Button>
              )}
            </div>
            <div className="space-y-2">
              {isEditing ? (
                <div className="space-y-2">
                  <Input
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="text-center font-bold text-lg"
                  />
                  <Input
                    value={profile.nickname}
                    onChange={(e) => setProfile({ ...profile, nickname: e.target.value })}
                    className="text-center text-sm"
                    placeholder="ニックネーム"
                  />
                </div>
              ) : (
                <>
                  <h2 className="font-bold text-xl text-gray-800">{profile.name}</h2>
                  <p className="text-gray-600">"{profile.nickname}"</p>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 基本情報 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-orange-600" />
              基本情報
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-gray-600">誕生日</Label>
                {isEditing ? (
                  <Input
                    type="date"
                    value={profile.birthday}
                    onChange={(e) => setProfile({ ...profile, birthday: e.target.value })}
                  />
                ) : (
                  <p className="font-medium">{new Date(profile.birthday).toLocaleDateString("ja-JP")}</p>
                )}
              </div>
              <div>
                <Label className="text-sm text-gray-600">血液型</Label>
                {isEditing ? (
                  <Input
                    value={profile.bloodType}
                    onChange={(e) => setProfile({ ...profile, bloodType: e.target.value })}
                  />
                ) : (
                  <p className="font-medium">{profile.bloodType}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-gray-600">MBTI</Label>
                {isEditing ? (
                  <Input
                    value={profile.mbtiType}
                    onChange={(e) => setProfile({ ...profile, mbtiType: e.target.value })}
                  />
                ) : (
                  <Badge variant="outline" className="font-medium">
                    {profile.mbtiType}
                  </Badge>
                )}
              </div>
              <div>
                <Label className="text-sm text-gray-600">出身地</Label>
                {isEditing ? (
                  <Input
                    value={profile.hometown}
                    onChange={(e) => setProfile({ ...profile, hometown: e.target.value })}
                  />
                ) : (
                  <p className="font-medium">{profile.hometown}</p>
                )}
              </div>
            </div>
            <div>
              <Label className="text-sm text-gray-600">職業</Label>
              {isEditing ? (
                <Input value={profile.job} onChange={(e) => setProfile({ ...profile, job: e.target.value })} />
              ) : (
                <p className="font-medium">{profile.job}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 趣味・興味 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-orange-600" />
              趣味・興味
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-3">
              {profile.hobbies.map((hobby, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {hobby}
                  {isEditing && <X className="w-3 h-3 cursor-pointer" onClick={() => removeHobby(hobby)} />}
                </Badge>
              ))}
            </div>
            {isEditing && (
              <div className="flex gap-2">
                <Input placeholder="新しい趣味を追加" id="new-hobby" />
                <Button
                  size="sm"
                  onClick={() => {
                    const input = document.getElementById("new-hobby") as HTMLInputElement
                    addHobby(input.value)
                    input.value = ""
                  }}
                >
                  追加
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 好きなもの */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coffee className="w-5 h-5 text-orange-600" />
              好きなもの
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm text-gray-600">好きな食べ物</Label>
              {isEditing ? (
                <Input
                  value={profile.favoriteFood}
                  onChange={(e) => setProfile({ ...profile, favoriteFood: e.target.value })}
                />
              ) : (
                <p className="font-medium">{profile.favoriteFood}</p>
              )}
            </div>
            <div>
              <Label className="text-sm text-gray-600">好きな色</Label>
              {isEditing ? (
                <Input
                  value={profile.favoriteColor}
                  onChange={(e) => setProfile({ ...profile, favoriteColor: e.target.value })}
                />
              ) : (
                <p className="font-medium">{profile.favoriteColor}</p>
              )}
            </div>
            <div>
              <Label className="text-sm text-gray-600">行ってみたい場所</Label>
              {isEditing ? (
                <Input
                  value={profile.dreamDestination}
                  onChange={(e) => setProfile({ ...profile, dreamDestination: e.target.value })}
                />
              ) : (
                <p className="font-medium flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  {profile.dreamDestination}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {isEditing && (
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={handleCancel}>
              <X className="w-4 h-4 mr-1" />
              キャンセル
            </Button>
            <Button className="flex-1" onClick={handleSave}>
              <Save className="w-4 h-4 mr-1" />
              保存する
            </Button>
          </div>
        )}
      </div>

      {/* Bottom padding */}
      <div className="h-6"></div>
    </div>
  )
}
