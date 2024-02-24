import RootLayout from "@/app/layout";
import Home from "@/app/page";
import { screen, render, waitFor, fireEvent } from "@testing-library/react";


describe('unit', () => {

    it('should have no current unit active', async () => {
        
        
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
    
});
