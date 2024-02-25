import RootLayout from "@/app/layout";
import Home from "@/app/page";
import { unitType } from "@/types";
import { screen, render, waitFor, fireEvent } from "@testing-library/react";


describe('matchingQuestion', () => {
    it('should add a new matching question', async () => {
        render(
            <RootLayout>
                <Home />
            </RootLayout>
        )
        // change the unit creator to matching
        const btn = screen.getByTestId('template-Matching')
        fireEvent.click(btn)
        
        // creates the matching unit 
        const addUnit = screen.getByTestId('add-unit')
        fireEvent.click(addUnit)


        // add matching
        const addMatchingQ = screen.getAllByTestId('new-matching-question')
        fireEvent.click(addMatchingQ[0])

        await waitFor(() => {
            const matchingQs = screen.getAllByTestId('matching-question-textarea')
            expect(matchingQs).toHaveLength(4)
        })
               
    });

    it('should remove a matching question', async () => {
        render(
            <RootLayout>
                <Home />
            </RootLayout>
        )
        // change the unit creator to matching
        const btn = screen.getByTestId('template-Matching')
        fireEvent.click(btn)
        
        // creates the matching unit 
        const addUnit = screen.getByTestId('add-unit')
        fireEvent.click(addUnit)


        // delete matching
        const addMatchingQ = screen.getAllByTestId('delete-matching-question')
        fireEvent.click(addMatchingQ[0])

        await waitFor(() => {
            const matchingQs = screen.getAllByTestId('matching-question-textarea')
            expect(matchingQs).toHaveLength(2)
        })               
    });

    it('should edit a matching question', async () => {
        render(
            <RootLayout>
                <Home />
            </RootLayout>
        )
        // change the unit creator to matching
        const btn = screen.getByTestId('template-Matching')
        fireEvent.click(btn)
        
        // creates the matching unit 
        const addUnit = screen.getByTestId('add-unit')
        fireEvent.click(addUnit)


        // select matching
        const addMatchingQ = screen.getAllByTestId('matching-question-textarea')
        fireEvent.change(addMatchingQ[0], {target: {value: 'new'}})

        await waitFor(() => {
            const matchingQs = screen.getAllByTestId('matching-question-textarea') as HTMLTextAreaElement[];
            expect(matchingQs[0].value).toBe('new')
        })               
    });

});