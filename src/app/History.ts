import { test } from "./types";

export class TestHistory {
    private current: test;
    public undoStack: test[] = []; // Maintain an undo stack
    private redoStack: test[] = []; // Maintain a redo stack
    private hardLimit : number;

    constructor(test: test, limit: number = 100) {
        this.current = test;
        this.hardLimit = limit
    }

    add(test: test) {
        if (this.undoStack.length === this.hardLimit) {
            this.undoStack.shift()
        }
        this.undoStack.push(this.current); // Push current state onto the undo stack
        this.redoStack = []; // Clear the redo stack
        this.current = test;
    }

    undo(): test | undefined {
        if (this.undoStack.length === 0) {
            return undefined;
        }

        this.redoStack.push(this.current); // Push current state onto the redo stack
        this.current = this.undoStack.pop()!; // Pop from undo stack and use as current

        return this.current;
    }

    redo(): test | undefined {
        if (this.redoStack.length === 0) {
            return undefined;
        }

        this.undoStack.push(this.current); // Push current state onto the undo stack
        this.current = this.redoStack.pop()!; // Pop from redo stack and use as current

        return this.current;
    }

    hasUndo(): boolean {
        return this.undoStack.length > 0
    }

    hasRedo() : boolean {
        return this.redoStack.length > 0
    }

    // Rest of your methods...

    // (Note: you might want to add methods to clear the undo and redo stacks if needed)
}
