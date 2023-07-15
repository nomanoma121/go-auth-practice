import { useState, useEffect } from "react";
import "./App.css";

import { BACKEND_ENDPOINT } from "./constants";
import { PostForm } from "./components/PostForm";

function App() {
  const [posts, setPosts] = useState([]);

  // APIから投稿データを取得する関数
  const getPosts = async () => {
    // APIからデータを取得
    const res = await fetch(`${BACKEND_ENDPOINT}/api/posts`);
    // レスポンスをJSONとして解釈
    const data = await res.json();
    // postsステートを更新
    setPosts(data);
  };

  // useEffectを使って、このコンポーネントが描画された時に実行される処理を書く
  useEffect(() => {
    // APIから投稿データを取得
    getPosts();
  }, []);

  return (
    <main className="app-container">
      <h1>匿名掲示板（仮アプリ）</h1>
      <PostForm addPost={(post) => setPosts([post, ...posts])} />
      <h2>投稿一覧</h2>
      <div className="post-list">
        {posts.map((post) => (
          <div key={post.id} className="post-list__item">
            <span className="post-list__item__content">{post.content}</span>
            <span className="post-list__item__date">
              {new Date(post.created_at).toLocaleString("ja-JP")}
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
