export const fakeContext = {
    History: {
        add: jest.fn(),  
        undo: jest.fn(),
        hasUndo: jest.fn()         
    } as any,
    dispatch: jest.fn(),
    test: {} as any,
    focus: {} as any,
    setFocus: jest.fn(),
    showNote: true,
    setShowNote: jest.fn()
} as any