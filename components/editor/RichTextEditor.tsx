"use client";

import { useEffect, useState } from 'react';
import { RoomProvider, useMyPresence, useOthers } from '@/lib/liveblocks/client';
import { 
  Editor, 
  EditorContent, 
  useEditor 
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Placeholder from '@tiptap/extension-placeholder';
import { common, createLowlight } from 'lowlight';
import { useLiveblocksExtension, FloatingToolbar } from '@liveblocks/react-tiptap';
import html from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import 'highlight.js/styles/atom-one-dark.css';
import styles from './RichTextEditor.module.css';
import CollaborationCursors from './CollaborationCursors';
import {Toolbar} from './Toolbar';
import { User } from '@supabase/supabase-js';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';

// Lowlight yaratish va tillarni qo'shish
const lowlight = createLowlight(common);
lowlight.register('html', html);
lowlight.register('css', css);
lowlight.register('js', js);
lowlight.register('javascript', js);
lowlight.register('typescript', ts);
lowlight.register('ts', ts);

interface RichTextEditorProps {
  roomId: string;
  initialContent?: string;
  currentUser?: User | null;
  onSave?: (content: string) => void;
  readOnly?: boolean;
}

export function RichTextEditor({ 
  roomId, 
  initialContent = '', 
  currentUser,
  onSave,
  readOnly = false
}: RichTextEditorProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);

  // Auto-save funksiyasi
  const handleSave = async (editor: Editor | null) => {
    if (!editor || !onSave) return;
    
    try {
      setIsSaving(true);
      const content = editor.getHTML();
      await onSave(content);
      setLastSavedAt(new Date());
    } catch (error) {
      console.error('Kontentni saqlashda xatolik:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <RoomProvider 
      id={`editor-${roomId}`} 
      initialPresence={{ 
        cursor: null, 
        userName: currentUser?.email?.split('@')[0] || 'Mehmon',
        color: getRandomColor(),
      }}
    >
      <div className={styles.editorWrapper}>
        <EditorWithRoom 
          initialContent={initialContent}
          onSave={handleSave}
          readOnly={readOnly}
        />
        
        {lastSavedAt && (
          <div className={styles.saveStatus}>
            {isSaving ? 'Saqlanmoqda...' : `So'nggi saqlangan: ${formatDate(lastSavedAt)}`}
          </div>
        )}
      </div>
    </RoomProvider>
  );
}

function EditorWithRoom({ 
  initialContent, 
  onSave,
  readOnly
}: { 
  initialContent: string;
  onSave?: (editor: Editor | null) => void;
  readOnly?: boolean;
}) {
  const others = useOthers();
  const [currentPresence, updateMyPresence] = useMyPresence();
  
  // Liveblocks extension
  const liveblocks = useLiveblocksExtension({
    offlineSupport_experimental: true,
  });

  // Tiptap editor yaratish
  const editor = useEditor({
    extensions: [
      liveblocks,
      StarterKit.configure({
        // Liveblocks o'z history boshqaruviga ega
        history: false,
      }),
      CodeBlockLowlight.configure({
        lowlight,
        languageClassPrefix: 'language-',
      }),
      Placeholder.configure({
        placeholder: 'Tahrirlashni boshlash uchun yozing...',
      }),
      Link.configure({
        openOnClick: false,
      }),
      Underline,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
    ],
    content: initialContent || '<p>Kontentni shu yerga kiriting...</p>',
    editable: !readOnly,
  });

  // Avto-saqlash
  useEffect(() => {
    if (!editor || !onSave) return;
    
    const intervalId = setInterval(() => {
      onSave(editor);
    }, 30000); // Har 30 sekundda saqlash
    
    return () => clearInterval(intervalId);
  }, [editor, onSave]);

  // Kursorni kuzatish va kursor ma'lumotlarini boshqa foydalanuvchilarga uzatish
  useEffect(() => {
    if (!editor || !updateMyPresence) return;
    
    const handleSelectionUpdate = () => {
      const selection = editor.view.state.selection;
      
      if (selection.empty) {
        // Kursor yo'q - agar seleksiya bo'lmasa
        updateMyPresence({ selection: null });
      } else {
        // Seleksiya mavjud - pozitsiyasini uzatish
        updateMyPresence({
          selection: {
            from: selection.from,
            to: selection.to
          }
        });
      }
    };
    
    // Editor seleksiyasi o'zgarganini kuzatish
    editor.on('selectionUpdate', handleSelectionUpdate);
    
    return () => {
      editor.off('selectionUpdate', handleSelectionUpdate);
    };
  }, [editor, updateMyPresence]);

  // Foydalanuvchilarni ro'yxati
  const usersList = others.map(user => ({
    name: typeof user.presence?.userName === 'string' ? user.presence.userName : 'Anonim',
    color: typeof user.presence?.color === 'string' ? user.presence.color : '#000000',
  }));

  if (!editor) {
    return <div className={styles.loading}>Editor yuklanmoqda...</div>;
  }

  return (
    <div className={styles.editorContainer}>
      {!readOnly && (
        <Toolbar editor={editor} />
      )}
      
      <div className={styles.activeUsers}>
        {usersList.length > 0 && (
          <div className={styles.collaborators}>
            <span className={styles.collaboratorsLabel}>
              {usersList.length} ta faol foydalanuvchi
            </span>
            <div className={styles.userAvatars}>
              {usersList.map((user, index) => (
                <div 
                  key={index} 
                  className={styles.userAvatar}
                  style={{ backgroundColor: user.color }}
                  title={user.name}
                >
                  {typeof user.name === 'string' && user.name.length > 0 ? user.name[0].toUpperCase() : '?'}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <EditorContent editor={editor} className={styles.editor} />
      
      <CollaborationCursors editor={editor} updateMyPresence={updateMyPresence} />
      
      {!readOnly && (
        <FloatingToolbar editor={editor} className={styles.floatingToolbar} />
      )}
    </div>
  );
}

// Yordam beruvchi funksiyalar
function getRandomColor() {
  const colors = [
    '#4285F4', // Google Blue
    '#EA4335', // Google Red
    '#FBBC05', // Google Yellow
    '#34A853', // Google Green
    '#8E24AA', // Purple
    '#0097A7', // Teal
    '#F57C00', // Orange
    '#757575'  // Grey
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('uz-UZ', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
} 