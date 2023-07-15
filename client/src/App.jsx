import { useState, useEffect } from "react";
import "./App.css";

import { BACKEND_ENDPOINT } from "./constants";
import { PostForm } from "./components/PostForm";
import { PostList } from "./components/PostList";

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
      <PostList posts={posts} />
    </main>
  );
}

export default App;
