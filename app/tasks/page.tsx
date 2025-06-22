"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { BackButton } from "@/components/back-button"
import { CheckSquare, Plus, Calendar, Clock, Star } from "lucide-react"
import { useRouter } from "next/navigation"

export default function TasksPage() {
  const [taskList, setTaskList] = useState([
    {
      id: 1,
      title: "ゴミ出し",
      assignee: "あなた",
      dueDate: "今日",
      completed: false,
      recurring: "毎週火・金",
      points: 5,
    },
    {
      id: 2,
      title: "夕食の準備",
      assignee: "パートナー",
      dueDate: "今日",
      completed: false,
      recurring: "毎日",
      points: 10,
    },
    {
      id: 3,
      title: "洗濯",
      assignee: "あなた",
      dueDate: "明日",
      completed: true,
      recurring: "毎週日・水",
      points: 8,
    },
    {
      id: 4,
      title: "掃除機かけ",
      assignee: "パートナー",
      dueDate: "明日",
      completed: false,
      recurring: "毎週土",
      points: 12,
    },
    {
      id: 5,
      title: "食器洗い",
      assignee: "あなた",
      dueDate: "今日",
      completed: true,
      recurring: "毎日",
      points: 5,
    },
  ])

  const router = useRouter()

  const toggleTask = (taskId: number) => {
    setTaskList((prev) => prev.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  const todayTasks = taskList.filter((task) => task.dueDate === "今日")
  const completedToday = todayTasks.filter((task) => task.completed).length
  const totalToday = todayTasks.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-red-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BackButton href="/" />
              <div className="flex items-center gap-2">
                <CheckSquare className="w-6 h-6 text-green-600" />
                <h1 className="font-bold text-lg text-gray-800">タスク管理</h1>
              </div>
            </div>
            <Button
              size="sm"
              className="bg-green-500 hover:bg-green-600"
              onClick={() => router.push("/tasks/settings")}
            >
              <Plus className="w-4 h-4 mr-1" />
              設定
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Progress */}
        <Card className="bg-gradient-to-r from-green-100 to-blue-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-green-800">今日の進捗</h3>
              <Badge className="bg-green-600">
                {completedToday}/{totalToday}
              </Badge>
            </div>
            <div className="w-full bg-white/50 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${(completedToday / totalToday) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-green-700 mt-2">
              {completedToday === totalToday
                ? "今日のタスク完了！お疲れ様✨"
                : `あと${totalToday - completedToday}個のタスクがあります`}
            </p>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-pink-600">
                {taskList.filter((t) => t.assignee === "あなた").length}
              </div>
              <div className="text-sm text-gray-500">あなたのタスク</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {taskList.filter((t) => t.assignee === "パートナー").length}
              </div>
              <div className="text-sm text-gray-500">パートナーのタスク</div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Tasks */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            今日のタスク
          </h2>
          <div className="space-y-3">
            {todayTasks.map((task) => (
              <Card key={task.id} className={`transition-all ${task.completed ? "opacity-60" : "hover:shadow-md"}`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.id)}
                      className="data-[state=checked]:bg-green-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`font-medium ${task.completed ? "line-through text-gray-500" : ""}`}>
                          {task.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-yellow-100 text-yellow-700 flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            {task.points}pt
                          </Badge>
                          <Avatar className="w-6 h-6">
                            <AvatarFallback
                              className={`text-xs ${
                                task.assignee === "あなた"
                                  ? "bg-pink-200 text-pink-700"
                                  : "bg-orange-200 text-orange-700"
                              }`}
                            >
                              {task.assignee === "あなた" ? "あ" : "パ"}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        {task.recurring}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">今後の予定</h2>
          <div className="space-y-3">
            {taskList
              .filter((task) => task.dueDate !== "今日")
              .map((task) => (
                <Card key={task.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium">{task.title}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {task.dueDate}
                            </Badge>
                            <Avatar className="w-6 h-6">
                              <AvatarFallback
                                className={`text-xs ${
                                  task.assignee === "あなた"
                                    ? "bg-pink-200 text-pink-700"
                                    : "bg-orange-200 text-orange-700"
                                }`}
                              >
                                {task.assignee === "あなた" ? "あ" : "パ"}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          {task.recurring}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
