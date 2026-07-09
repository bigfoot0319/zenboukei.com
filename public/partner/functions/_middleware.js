// ============================================================
// partner.zenboukei.com 全体に Basic 認証をかける
// Cloudflare Pages Functions ミドルウェア
//
// このファイルを functions/ 直下に _middleware.js として置くと、
// Pages プロジェクトの「全ルート」に認証が適用されます。
// （＝ / も /app/ もすべて保護されます）
//
// デプロイ設定メモ:
//   - Cloudflare Pages プロジェクトのルートディレクトリ = public/partner
//   - ビルドコマンドなし（静的サイト）
//   - カスタムドメイン = partner.zenboukei.com
// ============================================================

export async function onRequest(context) {
  // 認証情報（ユーザー指定でファイルに直書き）
  // ※将来的にはより安全な方法として、Cloudflare Pages の環境変数
  //   （例: context.env.BASIC_USER / context.env.BASIC_PASS）に
  //   移すことを推奨します。
  const USER = "partner";
  const PASS = "zenboukei2025";

  const expected = "Basic " + btoa(`${USER}:${PASS}`);
  const provided = context.request.headers.get("Authorization");

  // 認証情報が一致しなければ 401 を返し、ブラウザに認証ダイアログを表示させる
  if (provided !== expected) {
    return new Response("認証が必要です / Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="partner.zenboukei.com", charset="UTF-8"',
        "Content-Type": "text/plain; charset=UTF-8",
      },
    });
  }

  // 認証OK → 通常どおり静的アセットを返す
  return context.next();
}
