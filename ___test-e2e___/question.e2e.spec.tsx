import RootLayout from "@/app/layout";
import Home from "@/app/page";
import { screen, render, waitFor, fireEvent } from "@testing-library/react";



describe('question', () => {
    it('should add a new question', async () => {
        render(
            <RootLayout>
                <Home />
            </RootLayout>
        )
        // creates the unit first
        const addUnit = screen.getByTestId('add-unit')
        fireEvent.click(addUnit)
        
        const newQuestion = screen.getByTestId('new-question')
        fireEvent.click(newQuestion)

        await waitFor(() => {{
            const questions = screen.queryAllByTestId('question')
            expect(questions).toHaveLength(3)
        }})

    });

    it('should remove a question', async () => {
        render(
            <RootLayout>
                <Home />
            </RootLayout>
        )
        // creates the unit first
        const addUnit = screen.getByTestId('add-unit')
        fireEvent.click(addUnit)
        
        const deleteQuestionBtns = screen.getAllByTestId('delete-question')
        fireEvent.click(deleteQuestionBtns[0])

        await waitFor(() => {{
            const questions = screen.queryAllByTestId('question')
            expect(questions).toHaveLength(1)
        }})

    });

    it('should edit a question', async () => {
        render(
            <RootLayout>
                <Home />
            </RootLayout>,
        )
        // creates the unit first
        const addUnit = screen.getByTestId('add-unit')
        fireEvent.click(addUnit)
        
        const qTextareas = screen.getAllByPlaceholderText('question')
        const first = qTextareas[0] as HTMLTextAreaElement
        fireEvent.change(first, {target: {
            value: 'new'
        }})

        await waitFor(() => {{
            expect(first.value).toBe('new')
        }})

    });
});