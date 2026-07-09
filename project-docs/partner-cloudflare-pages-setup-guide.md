# partner.zenboukei.com セットアップ手順書（Cloudflare Pages）

パートナー向けページ `partner.zenboukei.com` を **Cloudflare Pages** で公開し、
Basic認証（ID / パスワード）で保護するための手順書です。

- 本体サイト **zenboukei.com（Netlify）には一切触りません**。まったく別のプロジェクトとして作ります。
- すでにリポジトリに用意済みの `public/partner/` フォルダをそのまま公開します。
- スクリーンショットなしでも迷わないよう、画面に表示される項目名を「」で示しています。
- 所要時間の目安：15〜20分。

---

## 事前に用意するもの

- [ ] **Cloudflareアカウント**（無料プランでOK）。まだ無ければ https://dash.cloudflare.com/sign-up で作成。
- [ ] **GitHubアカウント**（`github.com/bigfoot0319/zenboukei.com` にアクセスできること）。
- [ ] Basic認証の情報（このプロジェクトの設定）
  - **ユーザー名（ID）：`partner`**
  - **パスワード：`zenboukei2025`**

> メモ：認証情報はリポジトリ内の
> `public/partner/functions/_middleware.js` に設定されています。
> 変更したくなった場合は、このファイルを書き換えて再pushすれば反映されます。

---

## ステップ1. Cloudflare Pagesで新規プロジェクトを作成し、GitHubを接続する

1. ブラウザで **https://dash.cloudflare.com/** を開き、ログインします。
2. 画面左のメニューから **「Compute (Workers)」**（または「Workers & Pages」）をクリックします。
   - ※Cloudflareの画面は時期によって名称が変わります。「Pages」や「Workers & Pages」と書かれた項目を探してください。
3. **「Create application（アプリケーションを作成）」** ボタンを押します。
4. 上部のタブで **「Pages」** を選びます。
5. **「Connect to Git（Gitに接続）」** を選びます。
6. **「GitHub」** を選び、画面の指示に従ってGitHubへのログイン・認可（Authorize）を行います。
   - 初回は「Cloudflare PagesにGitHubへのアクセスを許可しますか？」と聞かれます。**「Authorize」** を押します。
   - リポジトリの選択画面が出たら、**「Only select repositories（選択したリポジトリのみ）」** を選び、
     **`bigfoot0319/zenboukei.com`** にチェックを入れて **「Install & Authorize」** を押します。
7. Cloudflareの画面に戻り、リポジトリ一覧から **`zenboukei.com`** を選んで **「Begin setup（セットアップを開始）」** を押します。

---

## ステップ2. ビルド設定とルートディレクトリを設定する

「Set up builds and deployments（ビルドとデプロイの設定）」という画面になります。
次のとおり入力してください。**空欄の項目はそのまま空欄にします。**

| 項目 | 入力する値 |
|---|---|
| **Project name（プロジェクト名）** | `partner-zenboukei`（英数字とハイフンで自由に。これが仮URLの一部になります） |
| **Production branch（本番ブランチ）** | `main` |
| **Framework preset（フレームワークのプリセット）** | `None`（なし） |
| **Build command（ビルドコマンド）** | **空欄のまま**（何も入力しない） |
| **Build output directory（ビルド出力ディレクトリ）** | `/` （半角スラッシュ1文字） |

### ★重要：ルートディレクトリの設定

同じ画面内の **「Root directory (advanced)」** または **「詳細設定 / Advanced」** という項目を開きます
（「Root directory」の欄が最初から見えている場合もあります）。

- **Root directory（ルートディレクトリ）** に **`public/partner`** と入力します。
  - 先頭にスラッシュは付けません。`public/partner` とそのまま入力してください。

> なぜこの設定が必要か：
> `public/partner` をプロジェクトの起点にすることで、
> 認証を行うファイル `public/partner/functions/_middleware.js` が正しく読み込まれ、
> `partner.zenboukei.com` 全体（トップも `/app/` も）にBasic認証がかかります。

入力できたら **「Save and Deploy（保存してデプロイ）」** を押します。

1〜2分ほどで初回デプロイが完了し、**`https://partner-zenboukei.pages.dev`** のような
**仮URL（.pages.dev）** が発行されます。まずはこの仮URLで動作確認します（ステップ4）。

---

## ステップ3. カスタムドメイン partner.zenboukei.com を割り当てる

1. 作成したプロジェクト（`partner-zenboukei`）の画面を開きます。
2. 上部タブの **「Custom domains（カスタムドメイン）」** をクリックします。
3. **「Set up a custom domain（カスタムドメインを設定）」** を押します。
4. 入力欄に **`partner.zenboukei.com`** と入力し、**「Continue（続行）」** を押します。

ここから先は、**zenboukei.com のDNSをどこで管理しているか**で分岐します。

### パターンA：DNSをCloudflareで管理している場合（多くはこちら）

- Cloudflareに `zenboukei.com` のゾーン（ドメイン）が登録されていると、
  Cloudflareが必要なDNSレコード（CNAME）を**自動で作成**します。
- 画面に「このドメインのDNSはCloudflareが管理しています。レコードを追加しますか？」といった
  確認が出るので、**「Activate domain（ドメインを有効化）」** を押すだけで完了です。
- 数分で `partner.zenboukei.com` にSSL証明書が発行され、アクセスできるようになります。

> Cloudflareで管理しているか確認する方法：
> Cloudflareダッシュボードのトップ（Websites一覧）に **`zenboukei.com`** が表示されていればパターンAです。

### パターンB：DNSがCloudflare以外（お名前.com、Netlify DNS、ムームードメイン等）の場合

- Cloudflareが「次のCNAMEレコードを、あなたのDNS管理画面に追加してください」と表示します。
  表示される内容は次の形です（値はCloudflareの画面に出るものを使ってください）：

  ```
  種類（Type） : CNAME
  名前（Name） : partner        （または partner.zenboukei.com）
  値（Target）  : partner-zenboukei.pages.dev   ← Cloudflare画面に表示される値
  ```

- 現在DNSを管理しているサービス（レジストラやNetlify）の管理画面を開き、
  上記の **CNAMEレコードを1件追加** します。
- 追加後、Cloudflareの画面に戻ってしばらく待つと（数分〜最大で数十分）、
  `partner.zenboukei.com` が有効になります。

> どちらのパターンでも、**本体 zenboukei.com のレコードには触れないでください。**
> 追加するのは `partner`（サブドメイン）のレコードだけです。

---

## ステップ4. 動作確認（Basic認証で入れるか）

まず仮URL、次に本番ドメインで確認します。

1. ブラウザで **`https://partner-zenboukei.pages.dev`**（仮URL）を開きます。
2. **ユーザー名とパスワードを求めるダイアログ**が表示されればOKです。
   - ユーザー名：**`partner`**
   - パスワード：**`zenboukei2025`**
   - 正しく入力すると、パートナーポータル（新商品速報・実例紹介・診断アプリを開くボタン）が表示されます。
3. わざと**間違ったパスワードを入れると入れない（再度ダイアログが出る）**ことも確認してください。
4. ページ内の **「診断アプリを開く」** ボタンを押し、`/app/`（診断アプリのページ）へ移動できることを確認します。
   - このとき**再度パスワードは聞かれません**（同じサイト内なので、最初の認証が引き継がれます）。
5. ステップ3が完了していれば、**`https://partner.zenboukei.com`** でも同じように認証ダイアログが出ることを確認します。

### うまくいかないときのチェック

- **ダイアログが出ず、いきなりページが表示される** → 認証ファイルが読み込まれていません。
  ステップ2の **Root directory が `public/partner` になっているか**を再確認してください。
  修正は「プロジェクト → Settings（設定） → Builds & deployments → Root directory」から可能です。
  変更後、「Deployments」タブで **「Retry deployment（再デプロイ）」** を実行します。
- **「Nothing is here yet」やページが真っ白** → ページのファイルが見つかっていません。
  Root directory（`public/partner`）と Build output directory（`/`）の設定を見直してください。
- **`partner.zenboukei.com` だけ表示されない（仮URLは出る）** → DNSの反映待ち、または
  ステップ3のCNAMEレコードが未追加です。数分待つか、パターンBのレコード追加を再確認してください。

---

## ステップ5. 診断アプリ（本物のindex.html）を配置してpushする

現在 `public/partner/app/index.html` は「準備中」の仮ページです。
本物の診断アプリのHTMLを受け取ったら、次の手順で差し替えて公開します。

> ポイント：このCloudflare PagesプロジェクトはGitHubと連携しているので、
> **`main` ブランチに push すると自動で再デプロイ**されます。特別な公開操作は不要です。

### 方法A：普段お使いの手順（Claude Code / Git）で差し替える場合

1. 受け取った診断アプリのHTMLで **`public/partner/app/index.html` を丸ごと置き換え**ます。
   - ファイル名は `index.html` のまま、場所も `public/partner/app/` のままにしてください
     （「診断アプリを開く」ボタンのリンク先 `./app/` がこの場所を指しているためです）。
   - 画像やCSSなどの追加ファイルがある場合は、`public/partner/app/` の中に一緒に置きます。
2. 変更をコミットして `main` ブランチに push します。
   ```bash
   git add public/partner/app/
   git commit -m "診断アプリを配置"
   git push origin main
   ```
3. push後、Cloudflare Pagesの **「Deployments」** タブに新しいデプロイが自動で表示され、
   1〜2分で完了します。完了したら `https://partner.zenboukei.com/app/` を開いて確認します。

### 方法B：GitHubのウェブ画面だけで差し替える場合（コマンド不要）

1. ブラウザで **https://github.com/bigfoot0319/zenboukei.com** を開きます。
2. `public` → `partner` → `app` の順にフォルダを開き、**`index.html`** をクリックします。
3. 右上の **鉛筆アイコン（Edit this file）** を押し、中身を新しいHTMLに全て置き換えます。
4. ページ下部の **「Commit changes（変更をコミット）」** を押します
   （ブランチは `main` のまま）。
5. コミットすると自動で再デプロイが始まります。Cloudflare Pagesの「Deployments」で完了を確認し、
   `https://partner.zenboukei.com/app/` を開いて表示を確認します。

---

## 完了チェックリスト

- [ ] Cloudflare Pagesプロジェクト `partner-zenboukei` が作成できた
- [ ] Root directory = `public/partner` になっている
- [ ] 仮URL（.pages.dev）でBasic認証ダイアログが出て、`partner` / `zenboukei2025` で入れる
- [ ] `partner.zenboukei.com` でアクセスでき、認証がかかっている
- [ ] 「診断アプリを開く」ボタンで `/app/` に移動できる
- [ ] （後日）本物の診断アプリを `public/partner/app/index.html` に配置してpush・再デプロイ確認

---

## 参考：認証情報を変更したいとき

`public/partner/functions/_middleware.js` を開き、以下の2行を書き換えて push すれば変更できます。

```js
const USER = "partner";        // ← ユーザー名
const PASS = "zenboukei2025";  // ← パスワード
```

> より安全に運用したい場合は、Cloudflare Pagesの「Settings → Variables and Secrets（環境変数）」に
> ユーザー名・パスワードを登録し、ファイル側を `context.env.○○` で読み込む方式に変更できます。
> 必要になったらご相談ください。
