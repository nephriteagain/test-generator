import { test } from "@/types";
import { TestHistory } from "./History";

describe('TestHistory', () => {
    let  history = undefined as any as TestHistory<test>;
    beforeEach(() => {
        history = new TestHistory()
    })

    it('should add a history to the stack', () => {
        history.add({}as any)
        expect(history.stack).toHaveLength(1)
    });

    it('should delete the first item in the stack when the hardLimit is reached', () => {
        const firstItem = Math.random() as any;
        history.add(firstItem)
        let i = 0;
        while (i < 100) {
            history.add(Math.random() as any)
            i++
        }
        expect(history.stack[0]).not.toBe(firstItem)
    });

    it('should return a test when using undo when there is a content in the stack', () => {
        const testCase = {} as any
        history.add(testCase)
        const test = history.undo()
        expect(test).toBe(testCase)
    });

    it('should empty the content of the stack', () => {
        const testCase = {} as any
        history.add(testCase)
        history.undo()
        expect(history.stack).toHaveLength(0)
    });

    it('should return undefined when trying to undo while stack is empty', () => {
        const undo = history.undo()
        expect(undo).toBeUndefined()
    });

    it('should return false when stack is empty', () => {
        expect(history.hasUndo()).toBe(false)
    });
    it('should return true when stack has content', () => {
        const testCase = {} as any
        history.add(testCase)
        history.add(testCase)
        history.add(testCase)
        expect(history.hasUndo()).toBe(true)
    });
});
