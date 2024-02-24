import RootLayout from "@/app/layout";
import Home from "@/app/page";
import { screen, render, waitFor } from "@testing-library/react";

describe('page', () => {

    it('should render the page', async () => {
        render(
            <RootLayout>
                <Home />
            </RootLayout>
        )
        
        await waitFor(() => {
            const page = screen.getByTestId('root')
            expect(page).toBeInTheDocument()
        })
    });
    
});
