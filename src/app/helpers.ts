import { ChangeEvent } from "react";

export function generateId() {
    return Math.random().toString(36).slice(2)
}

export function checkScrollHeight(e: ChangeEvent) {
    const el = e.currentTarget as HTMLTextAreaElement;
    const hasScrollbar = el.scrollHeight > el.clientHeight;
    const row = el.rows;
    if (hasScrollbar) {
        el.rows = row+1
    }
}