
export class TestHistory<T> {    
    hardLimit: number;
    stack: T[];

    constructor(limit: number = 100) {
        this.hardLimit = Math.max(100, limit)
        this.stack = []
    }

    add(test: T) {
        if (this.hardLimit === this.stack.length) {
            this.stack.shift()
        }
        this.stack.push(test)

        
    }

    undo() : undefined|T {
        if (this.stack.length === 0) {
            return undefined;
        }
        return this.stack.pop()
    }

    hasUndo() : boolean {
        return this.stack.length > 0
    }
}
