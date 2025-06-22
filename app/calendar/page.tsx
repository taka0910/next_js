"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BackButton } from "@/components/back-button"
import { BottomNavigation } from "@/components/bottom-navigation"
import { CalendarIcon, Heart, Plus, Clock, MapPin, User } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CalendarPage() {
  const router = useRouter()
  const [currentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const [events] = useState([
    {
      id: 1,
      title: "付き合って1年記念日",
      date: "2024-07-15",
      time: "19:00",
      type: "記念日",
      description: "特別なディナーを予約済み",
      location: "レストラン ABC",
      owner: "共通",
    },
    {
      id: 2,
      title: "映画デート",
      date: "2024-06-20",
      time: "14:00",
      type: "デート",
      description: "新作映画を見に行く",
      location: "映画館",
      owner: "共通",
    },
    {
      id: 3,
      title: "生理予定日",
      date: "2024-06-25",
      time: "",
      type: "健康",
      description: "",
      location: "",
      owner: "あなた",
    },
    {
      id: 4,
      title: "友達との飲み会",
      date: "2024-06-18",
      time: "18:30",
      type: "個人",
      description: "大学時代の友達と",
      location: "居酒屋",
      owner: "あなた",
    },
    {
      id: 5,
      title: "会社の会議",
      date: "2024-06-22",
      time: "10:00",
      type: "個人",
      description: "プロジェクト進捗会議",
      location: "オフィス",
      owner: "パートナー",
    },
  ])

  // 生理周期の計算（28日周期と仮定）
  const [lastPeriodDate] = useState(new Date("2024-06-01"))
  const getPeriodDates = () => {
    const periodDates = []
    const cycleLength = 28
    const periodLength = 5

    for (let i = 0; i < 12; i++) {
      const startDate = new Date(lastPeriodDate)
      startDate.setDate(startDate.getDate() + i * cycleLength)

      for (let j = 0; j < periodLength; j++) {
        const periodDate = new Date(startDate)
        periodDate.setDate(periodDate.getDate() + j)
        periodDates.push(periodDate.toISOString().split("T")[0])
      }
    }
    return periodDates
  }

  const periodDates = getPeriodDates()

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Previous month's days
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }

    return days
  }

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split("T")[0]
    return events.filter((event) => event.date === dateString)
  }

  const getEventTypeColor = (type: string, owner: string) => {
    if (type === "健康") {
      return "bg-pink-100 text-pink-700 border-pink-200"
    }

    switch (owner) {
      case "あなた":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "パートナー":
        return "bg-purple-100 text-purple-700 border-purple-200"
      case "共通":
        return "bg-green-100 text-green-700 border-green-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const days = getDaysInMonth(currentDate)
  const monthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-red-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BackButton href="/" />
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-6 h-6 text-pink-600" />
                <h1 className="font-bold text-lg text-gray-800">カレンダー</h1>
              </div>
            </div>
            <Button size="sm" className="bg-pink-500 hover:bg-pink-600" onClick={() => router.push("/calendar/add")}>
              <Plus className="w-4 h-4 mr-1" />
              予定追加
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Calendar Header */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">
              {currentDate.getFullYear()}年 {monthNames[currentDate.getMonth()]}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {["日", "月", "火", "水", "木", "金", "土"].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 p-2">
                  {day}
                </div>
              ))}
              {days.map((day, index) => {
                if (!day) {
                  return <div key={index} className="p-2"></div>
                }

                const dayEvents = getEventsForDate(day)
                const isToday = day.toDateString() === new Date().toDateString()
                const dateString = day.toISOString().split("T")[0]
                const isPeriodDay = periodDates.includes(dateString)

                return (
                  <div
                    key={index}
                    className={`p-2 text-center text-sm cursor-pointer rounded transition-colors relative ${
                      isToday ? "bg-pink-500 text-white" : "hover:bg-pink-100"
                    } ${isPeriodDay ? "bg-red-100 border border-red-300" : ""}`}
                    onClick={() => setSelectedDate(day)}
                  >
                    <div className="font-medium">{day.getDate()}</div>
                    {dayEvents.length > 0 && (
                      <div className="flex justify-center mt-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      </div>
                    )}
                    {isPeriodDay && (
                      <div className="absolute top-1 right-1">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Legend */}

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              今後の予定
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {events
              .filter((event) => new Date(event.date) >= new Date())
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .slice(0, 5)
              .map((event) => (
                <div key={event.id} className={`p-3 rounded-lg border ${getEventTypeColor(event.type, event.owner)}`}>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium">{event.title}</h3>
                    <div className="flex items-center gap-1">
                      <Badge variant="outline" className="text-xs">
                        {event.type}
                      </Badge>
                      <User className="w-3 h-3" />
                      <span className="text-xs">{event.owner}</span>
                    </div>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-3 h-3" />
                      {event.date}
                      {event.time && (
                        <>
                          <Clock className="w-3 h-3 ml-2" />
                          {event.time}
                        </>
                      )}
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3" />
                        {event.location}
                      </div>
                    )}
                    {event.description && <p className="text-sm text-gray-600 mt-2">{event.description}</p>}
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>

        {/* Selected Date Events */}
        {selectedDate && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {selectedDate.getMonth() + 1}月{selectedDate.getDate()}日の予定
              </CardTitle>
            </CardHeader>
            <CardContent>
              {getEventsForDate(selectedDate).length > 0 ? (
                <div className="space-y-3">
                  {getEventsForDate(selectedDate).map((event) => (
                    <div
                      key={event.id}
                      className={`p-3 rounded-lg border ${getEventTypeColor(event.type, event.owner)}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium">{event.title}</h3>
                        <div className="flex items-center gap-1">
                          <Badge variant="outline" className="text-xs">
                            {event.type}
                          </Badge>
                          <User className="w-3 h-3" />
                          <span className="text-xs">{event.owner}</span>
                        </div>
                      </div>
                      {event.time && (
                        <div className="flex items-center gap-2 text-sm mb-1">
                          <Clock className="w-3 h-3" />
                          {event.time}
                        </div>
                      )}
                      {event.location && (
                        <div className="flex items-center gap-2 text-sm mb-1">
                          <MapPin className="w-3 h-3" />
                          {event.location}
                        </div>
                      )}
                      {event.description && <p className="text-sm text-gray-600 mt-2">{event.description}</p>}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">この日の予定はありません</p>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      <div className="h-20"></div>
      <BottomNavigation />
    </div>
  )
}
