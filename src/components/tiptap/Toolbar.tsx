import React from "react";
import { type Editor } from "@tiptap/react";
import {
  TextB,
  TextStrikethrough,
  TextAUnderline,
  TextItalic,
  List,
  ListNumbers,
  TextHTwo,
  Quotes,
  ArrowCounterClockwise,
  ArrowClockwise,
  Code,
} from "@phosphor-icons/react";
import Underline from "@tiptap/extension-underline";

type Props = {
  editor: Editor | null;
  content: string;
};

const Toolbar = ({ editor, content }: Props) => {
  if (!editor) {
    return null;
  }
  return (
    <div
      className="px-4 py-3 rounded-tl-md rounded-tr-md flex justify-between items-start
    gap-5 w-full flex-wrap border border-input"
    >
      <div className="flex justify-start items-center gap-5 w-full lg:w-10/12 flex-wrap ">
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={
            editor.isActive("bold")
              ? "bg-primary text-white p-2 rounded-lg"
              : "text-primary"
          }
        >
          <TextB className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={
            editor.isActive("italic")
              ? "bg-primary text-white p-2 rounded-lg"
              : "text-primary"
          }
        >
          <TextItalic className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={
            editor.isActive("underline")
              ? "bg-primary text-white p-2 rounded-lg"
              : "text-primary"
          }
        >
          <TextAUnderline className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={
            editor.isActive("strike")
              ? "bg-primary text-white p-2 rounded-lg"
              : "text-primary"
          }
        >
          <TextStrikethrough className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={
            editor.isActive("heading", { level: 2 })
              ? "bg-primary text-white p-2 rounded-lg"
              : "text-primary"
          }
        >
          <TextHTwo className="w-5 h-5" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={
            editor.isActive("bulletList")
              ? "bg-primary text-white p-2 rounded-lg"
              : "text-primary"
          }
        >
          <List className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={
            editor.isActive("orderedList")
              ? "bg-primary text-white p-2 rounded-lg"
              : "text-primary"
          }
        >
          <ListNumbers className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={
            editor.isActive("blockquote")
              ? "bg-primary text-white p-2 rounded-lg"
              : "text-primary"
          }
        >
          <Quotes className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleCode().run();
          }}
          className={
            editor.isActive("code")
              ? "bg-primary text-white p-2 rounded-lg"
              : "text-primary"
          }
        >
          <Code className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          className={
            editor.isActive("undo")
              ? "bg-primary text-white p-2 rounded-lg"
              : "text-primary hover:bg-primary hover:text-white p-1 hover:rounded-lg"
          }
        >
          <ArrowCounterClockwise className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          className={
            editor.isActive("redo")
              ? "bg-primary text-white p-2 rounded-lg"
              : "text-primary hover:bg-primary hover:text-white p-1 hover:rounded-lg"
          }
        >
          <ArrowClockwise className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
