import RootLayout from "@/app/layout";
import Home from "@/app/page";
import { screen, render, waitFor, fireEvent } from "@testing-library/react";

describe('Hotkeys', () => {
    it('should create a new unit when ctrl+shift+f is pressed', () => {
        render(
            <RootLayout>
                <Home />
            </RootLayout>
        )
        
        const root = screen.getByTestId('root')
        fireEvent.keyUp(root, {
            key: 'F',
            code: 'KeyF',
            ctrlKey: true,
            shiftKey: true,
        })

        waitFor(() => {
           const units = screen.queryAllByTestId('unit')
           expect(units).toHaveLength(1)
        })
    });    

    it('should create a new unit question ctrl+shift+l is pressed while a unit is focused', async () => {
        render(
            <RootLayout>
                <Home />
            </RootLayout>
        )
        // creates a unit first
        const root = screen.getByTestId('root')
        fireEvent.keyUp(root, {
            key: 'F',
            code: 'KeyF',
            ctrlKey: true,
            shiftKey: true,
        })

        // focus on the unit
        const instructions = screen.getByPlaceholderText('instructions')
        fireEvent.focus(instructions)

        // use hokey to add questions
        fireEvent.keyUp(root, {
            key: 'L',
            code: 'KeyF',
            ctrlKey: true,
            shiftKey: true,
        })
        

        waitFor(() => {
            const qs = screen.getAllByTestId('question')
            expect(qs).toHaveLength(3)
        })                
    });   
    
    
    it('should create a new choice when ctrl+shift+l is pressed while a question is focused', async () => {
        render(
            <RootLayout>
                <Home />
            </RootLayout>
        )
        // creates a unit first
        const root = screen.getByTestId('root')
        fireEvent.keyUp(root, {
            key: 'F',
            code: 'KeyF',
            ctrlKey: true,
            shiftKey: true,
        })

        // focus on the question
        const qs = screen.getAllByTestId('question')
        fireEvent.focus(qs[0])

        // use hokey to add questions
        fireEvent.keyUp(root, {
            key: 'S',
            code: 'KeyF',
            ctrlKey: true,
            shiftKey: true,
        })
        

        waitFor(() => {
            const choices = screen.getAllByTestId('choice')
            expect(choices).toHaveLength(7)
        })
        
        
    });


    it('should undo the newly created unit when ctrl+shift+u is pressed', () => {
        render(
            <RootLayout>
                <Home />
            </RootLayout>
        )
        
        // create a unit first
        const root = screen.getByTestId('root')
        fireEvent.keyUp(root, {
            key: 'F',
            code: 'KeyF',
            ctrlKey: true,
            shiftKey: true,
        })
        
        // then undo
        fireEvent.keyUp(root, {
            key: 'U',
            code: 'KeyF',
            ctrlKey: true,
            shiftKey: true,
        })

        waitFor(() => {
           const units = screen.queryAllByTestId('unit')
           expect(units).toHaveLength(0)
        })
    });    

});