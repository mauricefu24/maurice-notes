"use client";

import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import {
  Undo2, Redo2, Bold, Italic, Underline as UnderlineIcon,
  Strikethrough, Code,
  List, ListOrdered, Quote, Link2, ImageIcon, Code2,
  Minus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const extensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3],
    },
  }),
  Link.configure({
    openOnClick: false,
  }),
  Image,
  Underline,
];

type RichTextEditorProps = {
  defaultValue?: string;
  name: string;
};

export function RichTextEditor({ defaultValue = "", name }: RichTextEditorProps) {
  const [content, setContent] = useState(defaultValue);
  const [linkUrl, setLinkUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const editor = useEditor({
    extensions,
    content: defaultValue,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setContent(html);
    },
    editorProps: {
      attributes: {
        class: "prose prose-slate max-w-none focus:outline-none min-h-[300px] p-1",
      },
    },
  });

  // 同步外部defaultValue变化
  useEffect(() => {
    if (editor && defaultValue !== editor.getHTML()) {
      editor.commands.setContent(defaultValue);
    }
  }, [editor, defaultValue]);

  if (!editor) {
    return null;
  }

  // 格式化功能
  const toggleBold = () => editor.chain().focus().toggleBold().run();
  const toggleItalic = () => editor.chain().focus().toggleItalic().run();
  const toggleUnderline = () => editor.chain().focus().toggleUnderline().run();
  const toggleStrike = () => editor.chain().focus().toggleStrike().run();
  const toggleCode = () => editor.chain().focus().toggleCode().run();
  const toggleCodeBlock = () => editor.chain().focus().toggleCodeBlock().run();
  const toggleHeading1 = () => editor.chain().focus().toggleHeading({ level: 1 }).run();
  const toggleHeading2 = () => editor.chain().focus().toggleHeading({ level: 2 }).run();
  const toggleHeading3 = () => editor.chain().focus().toggleHeading({ level: 3 }).run();
  const toggleBulletList = () => editor.chain().focus().toggleBulletList().run();
  const toggleOrderedList = () => editor.chain().focus().toggleOrderedList().run();
  const toggleBlockquote = () => editor.chain().focus().toggleBlockquote().run();
  const insertHorizontalRule = () => editor.chain().focus().setHorizontalRule().run();

  const insertLink = () => {
    if (linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl }).run();
      setLinkUrl("");
    }
  };

  const insertImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl("");
    }
  };

  const undo = () => editor.chain().focus().undo().run();
  const redo = () => editor.chain().focus().redo().run();

  return (
    <div className="w-full">
      {/* 隐藏的textarea，用于表单提交 */}
      <textarea name={name} value={content} onChange={(e) => setContent(e.target.value)} className="hidden" />

      {/* 工具栏 */}
      <div className="flex flex-wrap items-center gap-1 border-b bg-slate-50 px-3 py-2 text-sm text-slate-600">
        <Button type="button" variant="ghost" size="icon" aria-label="撤销" onClick={undo} className="h-8 w-8">
          <Undo2 className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" aria-label="重做" onClick={redo} className="h-8 w-8">
          <Redo2 className="h-4 w-4" />
        </Button>
        <div className="mx-1 h-5 w-px bg-slate-200" />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="粗体"
          onClick={toggleBold}
          className={`h-8 w-8 ${editor.isActive('bold') ? 'bg-slate-200' : ''}`}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="斜体"
          onClick={toggleItalic}
          className={`h-8 w-8 ${editor.isActive('italic') ? 'bg-slate-200' : ''}`}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="下划线"
          onClick={toggleUnderline}
          className={`h-8 w-8 ${editor.isActive('underline') ? 'bg-slate-200' : ''}`}
        >
          <UnderlineIcon className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="删除线"
          onClick={toggleStrike}
          className={`h-8 w-8 ${editor.isActive('strike') ? 'bg-slate-200' : ''}`}
        >
          <Strikethrough className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="行内代码"
          onClick={toggleCode}
          className={`h-8 w-8 ${editor.isActive('code') ? 'bg-slate-200' : ''}`}
        >
          <Code className="h-4 w-4" />
        </Button>
        <div className="mx-1 h-5 w-px bg-slate-200" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={toggleHeading1}
          className={`h-8 px-2 ${editor.isActive('heading', { level: 1 }) ? 'bg-slate-200' : ''}`}
        >
          H1
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={toggleHeading2}
          className={`h-8 px-2 ${editor.isActive('heading', { level: 2 }) ? 'bg-slate-200' : ''}`}
        >
          H2
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={toggleHeading3}
          className={`h-8 px-2 ${editor.isActive('heading', { level: 3 }) ? 'bg-slate-200' : ''}`}
        >
          H3
        </Button>
        <div className="mx-1 h-5 w-px bg-slate-200" />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="无序列表"
          onClick={toggleBulletList}
          className={`h-8 w-8 ${editor.isActive('bulletList') ? 'bg-slate-200' : ''}`}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="有序列表"
          onClick={toggleOrderedList}
          className={`h-8 w-8 ${editor.isActive('orderedList') ? 'bg-slate-200' : ''}`}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="引用"
          onClick={toggleBlockquote}
          className={`h-8 w-8 ${editor.isActive('blockquote') ? 'bg-slate-200' : ''}`}
        >
          <Quote className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="代码块"
          onClick={toggleCodeBlock}
          className={`h-8 w-8 ${editor.isActive('codeBlock') ? 'bg-slate-200' : ''}`}
        >
          <Code2 className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="分割线"
          onClick={insertHorizontalRule}
          className="h-8 w-8"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <div className="mx-1 h-5 w-px bg-slate-200" />
        <Popover>
          <PopoverTrigger asChild>
            <Button type="button" variant="ghost" size="icon" aria-label="插入链接" className="h-8 w-8">
              <Link2 className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-3">
            <div className="flex gap-2">
              <Input
                placeholder="输入链接地址"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && insertLink()}
              />
              <Button type="button" onClick={insertLink}>插入</Button>
            </div>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button type="button" variant="ghost" size="icon" aria-label="插入图片" className="h-8 w-8">
              <ImageIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-3">
            <div className="flex gap-2">
              <Input
                placeholder="输入图片URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && insertImage()}
              />
              <Button type="button" onClick={insertImage}>插入</Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* 编辑器主体 */}
      <div className="p-6">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
