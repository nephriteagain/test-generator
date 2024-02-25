import { unitType } from "@/types";

export const fakeContext = {
    History: {
        add: jest.fn(),  
        undo: jest.fn(),
        hasUndo: () => true,
    } as any,
    dispatch: jest.fn(),
    test: {
        currentUnit: unitType.multipleChoice,
        subjest: 'Math',
        author: 'kidneygod',
        units: []
    } as any,
    focus: {} as any,
    setFocus: jest.fn(),
    showNote: true,
    setShowNote: jest.fn()
} as any