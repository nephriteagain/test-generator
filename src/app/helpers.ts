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

export function convertToRoman(num:number) {
    var roman : Record<string,number> = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1
    };
    var str = '';
  
    for (var i of Object.keys(roman)) {
      var q = Math.floor(num / roman[i]);
      num -= q * roman[i];
      str += i.repeat(q);
    }
  
    return str;
  }
  
