"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { BackButton } from "@/components/back-button"
import { Brain, Send, Sparkles, Heart, AlertTriangle, MessageCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AIConsultationPage() {
  const [message, setMessage] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<any>(null)
  const router = useRouter()

  const handleSubmit = () => {
    setIsAnalyzing(true)
    // Simulate AI analysis
    setTimeout(() => {
      setResult({
        sentiment: "やや注意",
        softMessage:
          "「最近お疲れ様！いつもありがとう。ちょっとだけお話があるんだけど、時間あるときに聞いてもらえる？」",
        tips: ["感謝の気持ちを最初に伝える", "相手の状況を気遣う言葉を入れる", "押し付けがましくない表現を使う"],
        riskLevel: 2,
      })
      setIsAnalyzing(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-red-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <BackButton href="/" />
            <div className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-purple-600" />
              <h1 className="font-bold text-lg text-gray-800">AI相談</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Sparkles className="w-6 h-6 text-purple-600 mt-1" />
              <div>
                <h3 className="font-medium text-purple-800 mb-1">AIアシスタント</h3>
                <p className="text-sm text-purple-700">
                  言いにくいことを入力すると、相手を傷つけずに伝える方法をアドバイスします。
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">相談内容を入力</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="例：最近家事を手伝ってくれないことが気になっています..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[120px] resize-none"
            />
            <Button
              onClick={handleSubmit}
              disabled={!message.trim() || isAnalyzing}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              {isAnalyzing ? (
                <>
                  <Brain className="w-4 h-4 mr-2 animate-pulse" />
                  分析中...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  AIに相談する
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {result && (
          <Card className="border-2 border-purple-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  AI分析結果
                </CardTitle>
                <Badge
                  variant={result.riskLevel <= 1 ? "default" : result.riskLevel <= 2 ? "secondary" : "destructive"}
                  className="flex items-center gap-1"
                >
                  {result.riskLevel <= 1 ? <Heart className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                  {result.sentiment}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-green-800">おすすめの伝え方</h4>
                  <Button
                    size="sm"
                    onClick={() => router.push(`/chat?message=${encodeURIComponent(result.softMessage)}`)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <MessageCircle className="w-3 h-3 mr-1" />
                    送信
                  </Button>
                </div>
                <p className="text-sm text-green-700 leading-relaxed">"{result.softMessage}"</p>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-3">コミュニケーションのコツ</h4>
                <div className="space-y-2">
                  {result.tips.map((tip: string, index: number) => (
                    <div key={index} className="flex items-start gap-2 p-2 bg-purple-50 rounded">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                      <span className="text-sm text-purple-700">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
