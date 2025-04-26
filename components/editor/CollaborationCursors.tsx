"use client";

import { useOthers, useMyPresence } from "@/lib/liveblocks/client";
import { Editor } from "@tiptap/react";
import { useEffect, useRef } from "react";

interface CollaborationCursorsProps {
  editor: Editor;
  updateMyPresence?: (presence: any) => void;
}

export default function CollaborationCursors({ editor, updateMyPresence }: CollaborationCursorsProps) {
  const others = useOthers();
  const [myPresence, updateLocalPresence] = useMyPresence();
  const cursorsRef = useRef<Map<string, HTMLDivElement>>(new Map());
  
  // Joriy foydalanuvchining kursorini yangilash funksiyasi
  const updateCursorPresence = (x: number, y: number | null) => {
    // updateMyPresence berilgan bo'lsa, uni ishlatamiz, aks holda lokal qiymatni
    if (updateMyPresence) {
      updateMyPresence({
        cursor: y === null ? null : { x, y },
      });
    } else {
      updateLocalPresence({
        cursor: y === null ? null : { x, y },
      });
    }
  };
  
  useEffect(() => {
    // Kursorlarni tozalash funksiyasi
    const cleanupCursors = () => {
      cursorsRef.current.forEach((cursorEl) => {
        if (cursorEl.parentNode) {
          cursorEl.parentNode.removeChild(cursorEl);
        }
      });
      cursorsRef.current.clear();
    };

    // Kursor pozitsiyasini yangilash funksiyasi
    const updateCursorPosition = (userId: string, cursor: { x: number; y: number }) => {
      if (!cursor) return;
      
      let cursorEl = cursorsRef.current.get(userId);
      
      // Agar kursor mavjud bo'lmasa, yangi yaratish
      if (!cursorEl) {
        const user = others.find((other) => other.connectionId.toString() === userId);
        if (!user || !user.presence) return;
        
        cursorEl = document.createElement("div");
        cursorEl.className = "collaboration-cursor";
        cursorEl.style.position = "absolute";
        cursorEl.style.pointerEvents = "none";
        cursorEl.style.zIndex = "1000";
        
        // Kursor ko'rsatkichi
        const pointer = document.createElement("div");
        pointer.className = "cursor-pointer";
        pointer.style.width = "0";
        pointer.style.height = "0";
        pointer.style.borderStyle = "solid";
        pointer.style.borderWidth = "8px 5px 0 5px";
        pointer.style.borderColor = `${user.presence.color} transparent transparent transparent`;
        pointer.style.transform = "translateX(-50%)";
        
        // Foydalanuvchi nomi
        const label = document.createElement("div");
        label.className = "cursor-label";
        label.innerText = typeof user.presence.userName === 'string' ? user.presence.userName : String(user.presence.userName || "Mehmon");
        label.style.backgroundColor = typeof user.presence.color === 'string' ? user.presence.color : String(user.presence.color || "#000");
        label.style.color = "#fff";
        label.style.padding = "2px 8px";
        label.style.borderRadius = "3px";
        label.style.fontSize = "12px";
        label.style.transform = "translateY(-100%) translateX(-50%)";
        label.style.whiteSpace = "nowrap";
        
        cursorEl.appendChild(pointer);
        cursorEl.appendChild(label);
        document.body.appendChild(cursorEl);
        
        cursorsRef.current.set(userId, cursorEl);
      }
      
      // Kursor pozitsiyasini yangilash
      cursorEl.style.left = `${cursor.x}px`;
      cursorEl.style.top = `${cursor.y}px`;
    };
    
    // Boshqa foydalanuvchilar kursorini kuzatish
    // Har bir foydalanuvchi kursori uchun
    others.forEach((user) => {
      if (user.presence?.cursor && 
          typeof user.presence.cursor === 'object' && 
          'x' in user.presence.cursor && 
          'y' in user.presence.cursor) {
        updateCursorPosition(user.connectionId.toString(), user.presence.cursor as { x: number; y: number });
      }
    });
    
    // O'chib ketgan foydalanuvchilar kursorlarini tozalash
    const activeUserIds = new Set(others.map((user) => user.connectionId.toString()));
    cursorsRef.current.forEach((_, userId) => {
      if (!activeUserIds.has(userId)) {
        const cursorEl = cursorsRef.current.get(userId);
        if (cursorEl && cursorEl.parentNode) {
          cursorEl.parentNode.removeChild(cursorEl);
        }
        cursorsRef.current.delete(userId);
      }
    });
    
    // Editor mousedown hodisasi
    const handleEditorMouseDown = (event: MouseEvent) => {
      updateCursorPresence(event.clientX, event.clientY);
    };
    
    // Editor mousemove hodisasi
    const handleEditorMouseMove = (event: MouseEvent) => {
      updateCursorPresence(event.clientX, event.clientY);
    };
    
    // Editor mouseleave hodisasi
    const handleEditorMouseLeave = () => {
      updateCursorPresence(0, null);
    };
    
    // Hodisalarni qo'shish
    const editorElement = editor.view.dom;
    editorElement.addEventListener("mousedown", handleEditorMouseDown);
    editorElement.addEventListener("mousemove", handleEditorMouseMove);
    editorElement.addEventListener("mouseleave", handleEditorMouseLeave);
    
    return () => {
      // Tozalash
      cleanupCursors();
      
      // Hodisalarni o'chirish
      editorElement.removeEventListener("mousedown", handleEditorMouseDown);
      editorElement.removeEventListener("mousemove", handleEditorMouseMove);
      editorElement.removeEventListener("mouseleave", handleEditorMouseLeave);
    };
  }, [editor, others, updateLocalPresence, updateMyPresence]);
  
  return null; // Bu komponent hech narsa render qilmaydi
} 