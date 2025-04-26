"use client";

import React, { useState } from 'react';
import { Editor } from '@tiptap/react';
import styles from './RichTextEditor.module.css';
import { 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough, 
  Heading1, 
  Heading2, 
  Heading3, 
  List, 
  ListOrdered, 
  Code, 
  CodeSquare, 
  Quote, 
  Link as LinkIcon, 
  Undo, 
  Redo, 
  CheckSquare,
  X,
  Check
} from 'lucide-react';
import Link from '@tiptap/extension-link';

interface ToolbarProps {
  editor: Editor | null;
}

export const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
  const [isAddingLink, setIsAddingLink] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');

  if (!editor) {
    return null;
  }

  const addLink = () => {
    if (linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl }).run();
      setIsAddingLink(false);
      setLinkUrl('');
    }
  };

  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbarGroup}>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`${styles.toolbarButton} ${editor.isActive('bold') ? styles.active : ''}`}
          title="Bold"
        >
          <Bold size={18} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`${styles.toolbarButton} ${editor.isActive('italic') ? styles.active : ''}`}
          title="Italic"
        >
          <Italic size={18} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`${styles.toolbarButton} ${editor.isActive('underline') ? styles.active : ''}`}
          title="Underline"
        >
          <Underline size={18} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={`${styles.toolbarButton} ${editor.isActive('strike') ? styles.active : ''}`}
          title="Strikethrough"
        >
          <Strikethrough size={18} />
        </button>
      </div>

      <div className={styles.toolbarGroup}>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`${styles.toolbarButton} ${editor.isActive('heading', { level: 1 }) ? styles.active : ''}`}
          title="Heading 1"
        >
          <Heading1 size={18} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`${styles.toolbarButton} ${editor.isActive('heading', { level: 2 }) ? styles.active : ''}`}
          title="Heading 2"
        >
          <Heading2 size={18} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`${styles.toolbarButton} ${editor.isActive('heading', { level: 3 }) ? styles.active : ''}`}
          title="Heading 3"
        >
          <Heading3 size={18} />
        </button>
      </div>

      <div className={styles.toolbarGroup}>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${styles.toolbarButton} ${editor.isActive('bulletList') ? styles.active : ''}`}
          title="Bullet List"
        >
          <List size={18} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${styles.toolbarButton} ${editor.isActive('orderedList') ? styles.active : ''}`}
          title="Ordered List"
        >
          <ListOrdered size={18} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          className={`${styles.toolbarButton} ${editor.isActive('taskList') ? styles.active : ''}`}
          title="Task List"
        >
          <CheckSquare size={18} />
        </button>
      </div>

      <div className={styles.toolbarGroup}>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`${styles.toolbarButton} ${editor.isActive('blockquote') ? styles.active : ''}`}
          title="Blockquote"
        >
          <Quote size={18} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`${styles.toolbarButton} ${editor.isActive('codeBlock') ? styles.active : ''}`}
          title="Code Block"
        >
          <CodeSquare size={18} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`${styles.toolbarButton} ${editor.isActive('code') ? styles.active : ''}`}
          title="Inline Code"
        >
          <Code size={18} />
        </button>
      </div>

      <div className={styles.toolbarGroup}>
        {isAddingLink ? (
          <div className={styles.linkInput}>
            <input
              type="text"
              placeholder="https://example.com"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addLink()}
            />
            <button 
              className={styles.toolbarButton} 
              onClick={addLink}
              title="Confirm"
            >
              <Check size={18} />
            </button>
            <button 
              className={styles.toolbarButton} 
              onClick={() => setIsAddingLink(false)}
              title="Cancel"
            >
              <X size={18} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => {
              const url = editor.getAttributes('link').href;
              setLinkUrl(url || '');
              setIsAddingLink(true);
            }}
            className={`${styles.toolbarButton} ${editor.isActive('link') ? styles.active : ''}`}
            title="Link"
          >
            <LinkIcon size={18} />
          </button>
        )}
      </div>

      <div className={styles.toolbarGroup}>
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className={styles.toolbarButton}
          title="Undo"
        >
          <Undo size={18} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className={styles.toolbarButton}
          title="Redo"
        >
          <Redo size={18} />
        </button>
      </div>
    </div>
  );
}; 