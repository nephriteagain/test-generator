import RootLayout from "@/app/layout";
import Home from "@/app/page";
import { unitType } from "@/types";
import { screen, render, waitFor, fireEvent } from "@testing-library/react";



describe('choice', () => {
    it('should add a new choice', async () => {
        render(
            <RootLayout>
                <Home />
            </RootLayout>
        )
        // creates the unit first
        const addUnit = screen.getByTestId('add-unit')
        fireEvent.click(addUnit)
        
        const addChoice = screen.getAllByTestId('btn-add-choice')
        fireEvent.click(addChoice[0])

        await waitFor(() => {{
            const choices = screen.queryAllByTestId('choice')
            expect(choices).toHaveLength(7)
        }})

    });

    it('should remove a choice', async () => {
        render(
            <RootLayout>
                <Home />
            </RootLayout>
        )
        // creates the unit first
        const addUnit = screen.getByTestId('add-unit')
        fireEvent.click(addUnit)
        
        const deleteChoiceBtns = screen.getAllByTestId('delete-choice')
        fireEvent.click(deleteChoiceBtns[0])

        await waitFor(() => {{
            const choices = screen.queryAllByTestId('choice')
            expect(choices).toHaveLength(5)
        }})

    });

    it('should edit a choice', async () => {
        render(
            <RootLayout>
                <Home />
            </RootLayout>,
        )
        // creates the unit first
        const addUnit = screen.getByTestId('add-unit')
        fireEvent.click(addUnit)
        
        const cTextareas = screen.getAllByTestId('choice-textarea')
        const first = cTextareas[0] as HTMLTextAreaElement
        fireEvent.change(first, {target: {
            value: 'new'
        }})

        await waitFor(() => {{
            expect(first.value).toBe('new')
        }})

    });
});