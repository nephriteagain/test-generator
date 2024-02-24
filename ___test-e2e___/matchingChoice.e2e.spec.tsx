import RootLayout from "@/app/layout";
import Home from "@/app/page";
import { unitType } from "@/types/types";
import { screen, render, waitFor, fireEvent } from "@testing-library/react";


describe('matchingChoice', () => {
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
        const addMatchingC = screen.getAllByTestId('new-matching-choice')
        fireEvent.click(addMatchingC[0])

        await waitFor(() => {
            const matchingCs = screen.getAllByTestId('matching-choice-textarea')
            expect(matchingCs).toHaveLength(4)
        })
               
    });

    it('should remove a matching choice', async () => {
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
        const addMatchingC = screen.getAllByTestId('delete-matching-choice')
        fireEvent.click(addMatchingC[0])

        await waitFor(() => {
            const matchingCs = screen.getAllByTestId('matching-choice-textarea')
            expect(matchingCs).toHaveLength(2)
        })               
    });

    it('should edit a matching choice', async () => {
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
        const addMatchingC = screen.getAllByTestId('matching-choice-textarea')
        fireEvent.change(addMatchingC[0], {target: {value: 'new'}})

        await waitFor(() => {
            const matchingCs = screen.getAllByTestId('matching-choice-textarea') as HTMLTextAreaElement[];
            expect(matchingCs[0].value).toBe('new')
        })               
    });

});