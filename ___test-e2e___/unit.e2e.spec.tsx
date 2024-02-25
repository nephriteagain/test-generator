import RootLayout from "@/app/layout";
import Home from "@/app/page";
import { unitType } from "@/types";
import { screen, render, waitFor, fireEvent } from "@testing-library/react";


describe('unit', () => {


    it('should have no current unit active', async () => {
        render(
            <RootLayout>
                <Home />
            </RootLayout>
        )
        
        await waitFor(() => {
            const units = screen.queryAllByTestId('unit')
            expect(units).toHaveLength(0)
        })
    });

    it('should have one new unit when add unit button is clicked', async () => {
        render(
            <RootLayout>
                <Home />
            </RootLayout>
        )
        const btn = screen.getByTestId('add-unit')
        fireEvent.click(btn)
        
        await waitFor(() => {
            const units = screen.queryAllByTestId('unit')
            expect(units).toHaveLength(1)            
            
        })
    });

    it('should remove one  unit when delete unit button is clicked', async () => {
        render(
            <RootLayout>
                <Home />
            </RootLayout>
        )

        // add a unit first
        const add = screen.getByTestId('add-unit')
        fireEvent.click(add)
        
        await waitFor(() => {
            const units = screen.queryAllByTestId('unit')
            expect(units).toHaveLength(1)
        })

        // then deletes it
        const del = screen.getByText('delete unit')        
        fireEvent.click(del)

        await waitFor(() => {
            const units = screen.queryAllByTestId('unit')
            expect(units).toHaveLength(0)

        })
    });

    it('should create a multiple choice unit when multiple choice btn is selected', async () => {
        render(
            <RootLayout>
                <Home />
            </RootLayout>
        )
        const btn = screen.getByTestId('template-Multiple Choice')
        fireEvent.click(btn)

        const addUnit = screen.getByText('add unit')
        fireEvent.click(addUnit, {
            bubbles: true
        })

        await waitFor(() => {
            const multipleChoiceUnits = screen.queryAllByTestId(unitType.multipleChoice)
            expect(multipleChoiceUnits).toHaveLength(1)
        })

    })

    it('should create a short answer unit when  short answer btn is selected', async () => {
        render(
            <RootLayout>
                <Home />
            </RootLayout>
        )
        const btn = screen.getByTestId('template-Short Answer')
        fireEvent.click(btn)

        const addUnit = screen.getByText('add unit')
        fireEvent.click(addUnit, {
            bubbles: true
        })

        await waitFor(() => {
            const shortAnsUnits = screen.queryAllByTestId(unitType.shortAnswer)
            expect(shortAnsUnits).toHaveLength(1)
        })

    })

    it('should create a essay unit when  essay btn is selected', async () => {
        render(
            <RootLayout>
                <Home />
            </RootLayout>
        )
        const btn = screen.getByTestId('template-Essay')
        fireEvent.click(btn)

        const addUnit = screen.getByText('add unit')
        fireEvent.click(addUnit, {
            bubbles: true
        })

        await waitFor(() => {
            const essayUnits = screen.queryAllByTestId(unitType.essay)
            expect(essayUnits).toHaveLength(1)
        })

    })

    it('should create a matching unit when  matching btn is selected', async () => {
        render(
            <RootLayout>
                <Home />
            </RootLayout>
        )
        const btn = screen.getByTestId('template-Matching')
        fireEvent.click(btn)

        const addUnit = screen.getByText('add unit')
        fireEvent.click(addUnit, {
            bubbles: true
        })

        await waitFor(() => {
            const matchingUnits = screen.queryAllByTestId(unitType.matching)
            expect(matchingUnits).toHaveLength(1)
        })

    })
    
});
