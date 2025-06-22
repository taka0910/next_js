"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BackButton } from "@/components/back-button"
import { Bell, Heart, CheckSquare, Calendar, Gift, MessageCircle, Trash2, Settings } from "lucide-react"

interface Notification {
  id: string
  type: "thanks" | "task" | "anniversary" | "wishlist" | "message" | "system"
  title: string
  message: string
  time: string
  isRead: boolean
  avatar?: string
  sender?: string
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "thanks",
      title: "ありがとうポイントを獲得！",
      message: "パートナーから「夕食の準備」で5ポイントもらいました",
      time: "2分前",
      isRead: false,
      sender: "パートナー",
    },
    {
      id: "2",
      type: "task",
      title: "新しいタスクが追加されました",
      message: "「洗濯物を畳む」が明日の予定に追加されました",
      time: "1時間前",
      isRead: false,
      sender: "パートナー",
    },
    {
      id: "3",
      type: "anniversary",
      title: "記念日のリマインダー",
      message: "付き合って1年記念日まであと23日です",
      time: "3時間前",
      isRead: true,
    },
    {
      id: "4",
      type: "message",
      title: "新しいメッセージ",
      message: "「今日のお疲れ様でした！」",
      time: "5時間前",
      isRead: true,
      sender: "パートナー",
    },
    {
      id: "5",
      type: "wishlist",
      title: "おねだりリストが更新されました",
      message: "「新しいカフェでデート」が追加されました",
      time: "1日前",
      isRead: true,
      sender: "パートナー",
    },
  ])

  const unreadCount = notifications.filter((n) => !n.isRead).length

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "thanks":
        return <Heart className="w-5 h-5 text-pink-500" />
      case "task":
        return <CheckSquare className="w-5 h-5 text-green-500" />
      case "anniversary":
        return <Calendar className="w-5 h-5 text-purple-500" />
      case "wishlist":
        return <Gift className="w-5 h-5 text-orange-500" />
      case "message":
        return <MessageCircle className="w-5 h-5 text-blue-500" />
      default:
        return <Bell className="w-5 h-5 text-gray-500" />
    }
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, isRead: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BackButton />
              <div>
                <h1 className="font-bold text-lg text-gray-800">通知</h1>
                {unreadCount > 0 && <p className="text-xs text-gray-500">{unreadCount}件の未読通知</p>}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                  すべて既読
                </Button>
              )}
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6">
        {notifications.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="font-medium text-gray-600 mb-2">通知はありません</h3>
              <p className="text-sm text-gray-500">新しい通知が届くとここに表示されます</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <Card
                key={notification.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  !notification.isRead ? "border-pink-200 bg-pink-50/50" : ""
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h3
                            className={`font-medium text-sm ${
                              !notification.isRead ? "text-gray-900" : "text-gray-700"
                            }`}
                          >
                            {notification.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-gray-500">{notification.time}</span>
                            {notification.sender && (
                              <>
                                <span className="text-xs text-gray-300">•</span>
                                <span className="text-xs text-gray-500">{notification.sender}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {!notification.isRead && <div className="w-2 h-2 bg-pink-500 rounded-full"></div>}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-8 h-8 text-gray-400 hover:text-red-500"
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteNotification(notification.id)
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
