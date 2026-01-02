import { useMemo, useState } from "react";

type Todo = {
  id: string;
  text: string;
  done: boolean;
};

export default function App() {
  // 상태(state)
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([
    { id: crypto.randomUUID(), text: "Docker에서 React 실행 성공", done: true },
    { id: crypto.randomUUID(), text: "Todo 추가/삭제 구현", done: false }
  ]);

  // 파생값(계산): done 개수
  const doneCount = useMemo(() => todos.filter((t) => t.done).length, [todos]);

  // 이벤트 핸들러
  const addTodo = () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setTodos((prev) => [
      { id: crypto.randomUUID(), text: trimmed, done: false },
      ...prev
    ]);
    setText("");
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const removeTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div style={{ maxWidth: 720, margin: "40px auto", padding: 16 }}>
      <h1>React + Vite + TS (in Docker)</h1>

      {/* Counter */}
      <section style={{ marginTop: 20, padding: 12, border: "1px solid #ddd" }}>
        <h2>Counter</h2>
        <p>count: <b>{count}</b></p>
        <button onClick={() => setCount((c) => c + 1)}>+1</button>{" "}
        <button onClick={() => setCount((c) => c - 1)}>-1</button>{" "}
        <button onClick={() => setCount(0)}>reset</button>
      </section>

      {/* Todo */}
      <section style={{ marginTop: 20, padding: 12, border: "1px solid #ddd" }}>
        <h2>Todo</h2>

        <div style={{ display: "flex", gap: 8 }}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="할 일 입력"
            style={{ flex: 1, padding: 8 }}
            onKeyDown={(e) => {
              if (e.key === "Enter") addTodo();
            }}
          />
          <button onClick={addTodo}>추가</button>
        </div>

        <p style={{ marginTop: 10 }}>
          완료: {doneCount} / 전체: {todos.length}
        </p>

        <ul style={{ marginTop: 10, paddingLeft: 18 }}>
          {todos.map((t) => (
            <li key={t.id} style={{ marginBottom: 8 }}>
              <label style={{ cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() => toggleTodo(t.id)}
                />{" "}
                <span style={{ textDecoration: t.done ? "line-through" : "none" }}>
                  {t.text}
                </span>
              </label>{" "}
              <button onClick={() => removeTodo(t.id)}>삭제</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
