"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { BackButton } from "@/components/back-button"
import { BottomNavigation } from "@/components/bottom-navigation"
import { BookOpen, Plus, Heart, MessageCircle, Camera } from "lucide-react"
import { useRouter } from "next/navigation"

export default function DiaryPage() {
  const router = useRouter()

  const [diaries] = useState([
    {
      id: 1,
      title: "初めてのデート",
      content: "今日は映画を見に行きました。とても楽しかった！",
      mood: "😊",
      date: "2024-06-15",
      author: "あなた",
      isShared: true,
      photos: 2,
      likes: 1,
      comments: 2,
    },
    {
      id: 2,
      title: "お料理チャレンジ",
      content: "一緒にパスタを作りました。少し焦がしちゃったけど美味しかった！",
      mood: "🤩",
      date: "2024-06-14",
      author: "パートナー",
      isShared: true,
      photos: 3,
      likes: 2,
      comments: 1,
    },
    {
      id: 3,
      title: "お疲れの一日",
      content: "今日は仕事が忙しくて疲れました。でも帰ったら温かい夕飯が待っていて嬉しかった。",
      mood: "😴",
      date: "2024-06-13",
      author: "あなた",
      isShared: true,
      photos: 0,
      likes: 1,
      comments: 0,
    },
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-red-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BackButton href="/" />
              <div className="flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-orange-600" />
                <h1 className="font-bold text-lg text-gray-800">ふたりの日記</h1>
              </div>
            </div>
            <Button
              size="sm"
              className="bg-orange-500 hover:bg-orange-600"
              onClick={() => router.push("/diary/create")}
            >
              <Plus className="w-4 h-4 mr-1" />
              投稿
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{diaries.length}</div>
              <div className="text-sm text-gray-500">投稿数</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-pink-600">
                {diaries.reduce((sum, diary) => sum + diary.likes, 0)}
              </div>
              <div className="text-sm text-gray-500">いいね</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {diaries.reduce((sum, diary) => sum + diary.photos, 0)}
              </div>
              <div className="text-sm text-gray-500">写真</div>
            </CardContent>
          </Card>
        </div>

        {/* Diary Entries */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">最近の投稿</h2>
          {diaries.map((diary) => (
            <Card key={diary.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback
                        className={`${
                          diary.author === "あなた" ? "bg-pink-200 text-pink-700" : "bg-orange-200 text-orange-700"
                        }`}
                      >
                        {diary.author === "あなた" ? "あ" : "パ"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{diary.title}</h3>
                        <span className="text-lg">{diary.mood}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>{diary.author}</span>
                        <span>•</span>
                        <span>{diary.date}</span>
                      </div>
                    </div>
                  </div>
                  {diary.isShared && <Badge className="bg-green-100 text-green-700">共有中</Badge>}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-700 leading-relaxed">{diary.content}</p>

                {diary.photos > 0 && (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Camera className="w-4 h-4" />
                    <span>{diary.photos}枚の写真</span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="flex items-center gap-1 text-red-500">
                      <Heart className="w-4 h-4" />
                      {diary.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-500">
                      <MessageCircle className="w-4 h-4" />
                      {diary.comments}
                    </Button>
                  </div>
                  <Button size="sm" variant="outline">
                    詳細
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-orange-100 to-pink-100 border-orange-200">
          <CardContent className="p-6 text-center">
            <BookOpen className="w-12 h-12 text-orange-600 mx-auto mb-3" />
            <h3 className="font-medium text-orange-800 mb-2">今日の出来事を記録しよう</h3>
            <p className="text-sm text-orange-700 mb-4">ふたりの大切な瞬間を写真と一緒に記録できます。</p>
            <Button onClick={() => router.push("/diary/create")} className="bg-orange-500 hover:bg-orange-600">
              <Plus className="w-4 h-4 mr-2" />
              日記を書く
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="h-20"></div>
      <BottomNavigation />
    </div>
  )
}
