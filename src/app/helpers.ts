import { ChangeEvent, DragEvent } from "react";

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

function isHTMLElement(node: any): node is HTMLElement {
    return (node as HTMLElement).style !== undefined;
}

export function resetOpacityElement(e: DragEvent, element:HTMLDivElement) {
    const parent = element.parentElement as HTMLTableSectionElement;
    // typescript wtf?? .... i am forced to write this?
    parent.childNodes.forEach((child) => {
        if (isHTMLElement(child)) {
            child.style.opacity = '1'
        }
    })
}