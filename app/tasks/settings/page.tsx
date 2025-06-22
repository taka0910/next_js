"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { BackButton } from "@/components/back-button"
import { Settings, Plus, Trash2, User } from "lucide-react"

export default function TasksSettingsPage() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "ゴミ出し", assignee: "あなた", recurring: ["火", "金"], points: 5 },
    {
      id: 2,
      title: "夕食の準備",
      assignee: "パートナー",
      recurring: ["月", "火", "水", "木", "金", "土", "日"],
      points: 10,
    },
    { id: 3, title: "洗濯", assignee: "あなた", recurring: ["日", "水"], points: 8 },
    { id: 4, title: "掃除機かけ", assignee: "パートナー", recurring: ["土"], points: 12 },
    { id: 5, title: "食器洗い", assignee: "あなた", recurring: ["月", "火", "水", "木", "金", "土", "日"], points: 5 },
  ])

  const [newTask, setNewTask] = useState({
    title: "",
    assignee: "",
    recurring: [] as string[],
    points: "",
  })

  const weekdays = [
    { value: "月", label: "月" },
    { value: "火", label: "火" },
    { value: "水", label: "水" },
    { value: "木", label: "木" },
    { value: "金", label: "金" },
    { value: "土", label: "土" },
    { value: "日", label: "日" },
  ]

  const addTask = () => {
    if (newTask.title && newTask.assignee && newTask.recurring.length > 0 && newTask.points) {
      setTasks((prev) => [
        ...prev,
        {
          id: Date.now(),
          title: newTask.title,
          assignee: newTask.assignee,
          recurring: newTask.recurring,
          points: Number.parseInt(newTask.points),
        },
      ])
      setNewTask({ title: "", assignee: "", recurring: [], points: "" })
    }
  }

  const removeTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const toggleWeekday = (day: string) => {
    setNewTask((prev) => ({
      ...prev,
      recurring: prev.recurring.includes(day) ? prev.recurring.filter((d) => d !== day) : [...prev.recurring, day],
    }))
  }

  const formatRecurring = (days: string[]) => {
    if (days.length === 7) return "毎日"
    return `毎週${days.join("・")}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-red-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <BackButton href="/tasks" />
            <div className="flex items-center gap-2">
              <Settings className="w-6 h-6 text-gray-600" />
              <h1 className="font-bold text-lg text-gray-800">タスク設定</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Add New Task */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">新しいタスク追加</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="タスク名（例：ゴミ出し）"
              value={newTask.title}
              onChange={(e) => setNewTask((prev) => ({ ...prev, title: e.target.value }))}
            />
            <Select
              value={newTask.assignee}
              onValueChange={(value) => setNewTask((prev) => ({ ...prev, assignee: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="担当者を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="あなた">あなた</SelectItem>
                <SelectItem value="パートナー">パートナー</SelectItem>
              </SelectContent>
            </Select>

            {/* 曜日選択 */}
            <div>
              <label className="text-sm font-medium mb-2 block">実行する曜日</label>
              <div className="grid grid-cols-7 gap-2">
                {weekdays.map((day) => (
                  <div key={day.value} className="flex items-center justify-center">
                    <Checkbox
                      id={`day-${day.value}`}
                      checked={newTask.recurring.includes(day.value)}
                      onCheckedChange={() => toggleWeekday(day.value)}
                    />
                    <label htmlFor={`day-${day.value}`} className="text-sm ml-1">
                      {day.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Input
              placeholder="獲得ポイント"
              type="number"
              value={newTask.points}
              onChange={(e) => setNewTask((prev) => ({ ...prev, points: e.target.value }))}
            />
            <Button onClick={addTask} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              タスクを追加
            </Button>
          </CardContent>
        </Card>

        {/* Current Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">現在のタスク</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium">{task.title}</h3>
                    <Badge variant="outline" className="text-xs">
                      {task.points}pt
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <User className="w-3 h-3" />
                    {task.assignee}
                    <span>•</span>
                    {formatRecurring(task.recurring)}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => removeTask(task.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
