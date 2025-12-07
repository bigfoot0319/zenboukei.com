# 全防啓（zenboukei.com）

一般社団法人 全国防犯啓蒙推進機構の公式Webサイトです。

## サイト概要

犯罪者の視点で考え、命を守る。元大阪府警の防犯専門家・折元洋巳が率いる全国防犯啓蒙推進機構のコーポレートサイト。

### 主なコンテンツ

- **折元洋巳について** - 代表理事のプロフィール、実績
- **全防啓とは** - 団体概要、ハイブリッド型防犯の説明
- **できること** - 講演依頼、製品・サービス、防犯相談、防犯知識、コラム
- **メディア出演実績** - テレビ出演、取材・執筆、著書紹介
- **お問い合わせ** - Netlify Forms によるコンタクトフォーム

## 技術スタック

- **HTML5** - セマンティックなマークアップ
- **Tailwind CSS v4** - CDN版を使用
- **Animate.css v4.1.1** - アニメーション効果
- **Lucide Icons v0.536.0** - アイコン
- **Noto Sans JP** - 日本語フォント（Google Fonts）

## ファイル構成

```
zenboukei.com/
├── public/                 # 公開ディレクトリ
│   ├── index.html         # メインページ
│   ├── thanks.html        # フォーム送信後ページ
│   ├── privacy.html       # プライバシーポリシー
│   ├── legal.html         # 特定商取引法に基づく表記
│   └── assets/
│       └── images/        # 画像ファイル
├── project-docs/          # プロジェクト関連ドキュメント
├── dev-tools/             # 開発ツール（Unsplash画像検索など）
├── CLAUDE.md              # Claude Code用の指示書
└── README.md              # このファイル
```

## 公開方法

### Netlify（推奨）

1. Netlifyにログイン
2. 「Add new site」→「Import an existing project」
3. GitHubリポジトリを選択
4. 公開ディレクトリに `public` を設定
5. Deploy

※ お問い合わせフォームはNetlify Formsを使用しています。

### Cloudflare Pages

1. Cloudflareにログイン
2. Workers & Pages → アプリケーションを作成 → Pagesタブ
3. GitHubリポジトリをインポート
4. 公開フォルダに `public` を設定
5. Deploy

## 関連サイト

- **講演依頼**: https://lecture.zenboukei.com
- **製品・サービス**: https://products.zenboukei.com
- **防犯相談**: https://consultation.zenboukei.com
- **防犯知識**: https://knowledge.zenboukei.com
- **コラム（Substack）**: https://zenboukei.substack.com

## SNS

- **X (Twitter)**: https://x.com/hiromi_orimoto
- **Threads**: https://www.threads.com/@bouhan_ha_orimoto

## お問い合わせ

一般社団法人 全国防犯啓蒙推進機構
〒569-0086 大阪府高槻市松原町2番6号 高槻英和ビル2階
TEL: 072-673-1192 / FAX: 072-673-3955

---

&copy; 2012-2025 一般社団法人 全国防犯啓蒙推進機構
