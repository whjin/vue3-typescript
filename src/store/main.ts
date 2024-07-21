import { customAlphabet } from "nanoid";
import { defineStore } from "pinia";
import { ToolbarStates } from "@/types/toolbar";
import type { CreatingElement, ShapeFormatPainter, TextFormatPainter } from '@/types/edit';
import type { DialogForExportTypes } from "@/types/export";
// import { type TextAttrs, defaultRichTextAttrs } from '@/utils/prosemirror/utils';