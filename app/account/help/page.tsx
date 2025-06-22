"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BackButton } from "@/components/back-button"
import { HelpCircle, MessageCircle, Mail, Phone, ChevronDown, ChevronRight, Send } from "lucide-react"

export default function HelpSupportPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [contactForm, setContactForm] = useState({
    category: "",
    subject: "",
    message: "",
    email: "you@example.com",
  })

  const faqs = [
    {
      question: "パートナーを招待するにはどうすればいいですか？",
      answer: "カップル設定ページからパートナーのメールアドレスを入力して招待を送信できます。",
    },
    {
      question: "ありがとうポイントはどのように獲得できますか？",
      answer: "タスクの完了、記念日の祝い、日記の投稿などでポイントを獲得できます。",
    },
    {
      question: "データを削除したい場合はどうすればいいですか？",
      answer: "プライバシー設定からデータの削除を行うことができます。削除は取り消せませんのでご注意ください。",
    },
    {
      question: "通知が来ない場合の対処法は？",
      answer: "通知設定を確認し、デバイスの設定でアプリの通知が許可されているかご確認ください。",
    },
    {
      question: "アカウントを削除したい場合は？",
      answer: "アカウント削除をご希望の場合は、サポートまでお問い合わせください。",
    },
  ]

  const handleSubmit = () => {
    console.log("お問い合わせ送信:", contactForm)
    alert("お問い合わせを送信しました。2-3営業日以内にご返信いたします。")
    setContactForm({ category: "", subject: "", message: "", email: contactForm.email })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-red-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <BackButton />
            <h1 className="font-bold text-lg text-gray-800">ヘルプ・サポート</h1>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* よくある質問 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-purple-600" />
              よくある質問
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="border rounded-lg">
                <button
                  className="w-full p-3 text-left flex items-center justify-between hover:bg-gray-50"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <span className="font-medium text-sm">{faq.question}</span>
                  {expandedFaq === index ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
                {expandedFaq === index && <div className="p-3 pt-0 text-sm text-gray-600 border-t">{faq.answer}</div>}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* お問い合わせフォーム */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-purple-600" />
              お問い合わせ
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="category">カテゴリ</Label>
              <Select
                value={contactForm.category}
                onValueChange={(value) => setContactForm({ ...contactForm, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="お問い合わせの種類を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bug">バグ報告</SelectItem>
                  <SelectItem value="feature">機能要望</SelectItem>
                  <SelectItem value="account">アカウント関連</SelectItem>
                  <SelectItem value="payment">支払い関連</SelectItem>
                  <SelectItem value="other">その他</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="subject">件名</Label>
              <Input
                id="subject"
                value={contactForm.subject}
                onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                placeholder="お問い合わせの件名を入力"
              />
            </div>
            <div>
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                type="email"
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="message">お問い合わせ内容</Label>
              <Textarea
                id="message"
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                rows={5}
                placeholder="詳細な内容をご記入ください"
              />
            </div>
            <Button onClick={handleSubmit} className="w-full">
              <Send className="w-4 h-4 mr-2" />
              送信
            </Button>
          </CardContent>
        </Card>

        {/* 連絡先情報 */}
        <Card>
          <CardHeader>
            <CardTitle>その他の連絡方法</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Mail className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium">メール</p>
                <p className="text-sm text-gray-600">support@couple-app.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Phone className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium">電話サポート</p>
                <p className="text-sm text-gray-600">平日 10:00-18:00</p>
                <p className="text-sm text-gray-600">03-1234-5678</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* アプリ情報 */}
        <Card>
          <CardHeader>
            <CardTitle>アプリ情報</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">バージョン</span>
              <span className="text-sm font-medium">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">最終更新</span>
              <span className="text-sm font-medium">2024年1月15日</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">利用規約</span>
              <Button variant="link" size="sm" className="p-0 h-auto">
                確認する
              </Button>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">プライバシーポリシー</span>
              <Button variant="link" size="sm" className="p-0 h-auto">
                確認する
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
