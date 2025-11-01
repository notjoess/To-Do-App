import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3001/tasks";

export default function App(){
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(()=> {
    fetchTasks();
  }, []);

  function fetchTasks(){
    axios.get(API_URL).then(r => setTasks(r.data)).catch(err => console.error(err));
  }

  function addTask(){
    if(!title.trim()) return;
    axios.post(API_URL, { title }).then(r => { setTasks(prev=>[...prev, r.data]); setTitle(""); }).catch(console.error);
  }

  function toggleTask(t){
    axios.put(`${API_URL}/${t.id}`, { completed: !t.completed }).then(r => {
      setTasks(prev => prev.map(x => x.id === t.id ? r.data : x));
    }).catch(console.error);
  }

  function deleteTask(id){
    axios.delete(`${API_URL}/${id}`).then(()=> setTasks(prev => prev.filter(x => x.id !== id))).catch(console.error);
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📝 To‑Do List</h1>
      <div style={styles.inputContainer}>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Add a new task..." style={styles.input}/>
        <button onClick={addTask} style={styles.addBtn}>Add</button>
      </div>
      <ul style={styles.list}>
        {tasks.map(t=>(
          <li key={t.id} style={styles.item}>
            <span onClick={()=>toggleTask(t)} style={{...styles.text, textDecoration: t.completed ? "line-through" : "none", color: t.completed ? "#999" : "#111"}}>{t.title}</span>
            <button onClick={()=>deleteTask(t.id)} style={styles.delBtn}>✕</button>
          </li>
        ))}
      </ul>
      <p style={{color:"#666", fontSize:13}}>Backend: http://localhost:3001 — Swagger: /api</p>
    </div>
  );
}

const styles = {
  container: { fontFamily: "Inter, Arial, sans-serif", maxWidth: 480, margin: "60px auto", padding: 20, textAlign: "center" },
  title: { fontSize: 28, marginBottom: 18 },
  inputContainer: { display: "flex", gap: 8, justifyContent: "center", marginBottom: 12 },
  input: { flex: 1, padding: 10, borderRadius: 10, border: "1px solid #e0e0e0", minWidth: 220 },
  addBtn: { padding: "10px 16px", borderRadius: 10, background: "#1f8a4c", color: "white", border: "none", cursor: "pointer" },
  list: { listStyle: "none", padding: 0, marginTop: 10 },
  item: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", borderRadius: 10, background: "#fafafa", marginBottom: 8, border: "1px solid #f0f0f0" },
  text: { cursor: "pointer", textAlign: "left", flex: 1, marginRight: 12 },
  delBtn: { border: "none", background: "transparent", cursor: "pointer", color: "#e53935", fontSize: 18 }
};
