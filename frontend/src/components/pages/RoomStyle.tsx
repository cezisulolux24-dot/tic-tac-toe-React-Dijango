import type React from "react"

export const containerRoom: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  backgroundColor: "#f0f2f5",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  padding: '20px'
}
export const contentRoom: React.CSSProperties = {
  padding: "30px",
  backgroundColor: "#fff",
  borderRadius: "12px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  width: "360px"
}
export const titleRoom: React.CSSProperties = {
  margin: ' 0',
  color: "#333",
  textAlign: "center"
}

export const ulRoom: React.CSSProperties = {
  listStyle: "none",
  padding: '0',
  display: "flex",
  flexDirection: "column",
  gap: "10px"
}
export const liRoom: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "8px 12px",
  border: "1px solid #ccc",
  borderRadius: '8px'
}
export const joinBtn: React.CSSProperties = {
  padding: "6px 12px",
  borderRadius: '6px',
  border: "none",
  backgroundColor: "#4CAF50",
  color: "#fff",
  cursor: "pointer",
  transition: "background-color 0.3s",
}


export const createRoom: React.CSSProperties = {
  display: "flex",
  gap: '10px'
}

export const newRoomId: React.CSSProperties = {
  flex: '1px',
  padding: "10px",
  borderRadius: '8px',
  border: "1px solid #ccc",
  fontSize: '16px'
}

export const createBtn: React.CSSProperties = {
  padding: "10px 16px",
  borderRadius: '8px',
  border: "none",
  backgroundColor: "#2196F3",
  color: "#fff",
  cursor: "pointer",
  transition: "background-color 0.3s"
}
