import RootLayout from "@/app/layout";
import Home from "@/app/page";
import { screen, render, waitFor, fireEvent } from "@testing-library/react";


describe('HotkeyModal', () => {
    
    it('should not render hotkey modal', () => {
        render(
            <RootLayout>
                <Home />
            </RootLayout>
        )

        waitFor(() => {
            const modal = screen.queryByTestId('hotkey-modal')
            expect(modal).toBeNull()
        })
    });

    it('should render hotkey modal when the hotkeys button is clicked', () => {
        render(
            <RootLayout>
                <Home />
            </RootLayout>
        )

        const btn = screen.getByTestId('hotkeys-btn')        
        fireEvent.click(btn)

        waitFor(() => {
            const modal = screen.queryByTestId('hotkey-modal')
            expect(modal).toBeInTheDocument()
        })
    });

    it('should hide the hotkey modal when the close button is clicked', () => {
        render(
            <RootLayout>
                <Home />
            </RootLayout>
        )

        // open the modal first
        const btn = screen.getByTestId('hotkeys-btn')        
        fireEvent.click(btn)

        const close = screen.getByTestId('hotkey-modal-close')
        fireEvent.click(close)

        waitFor(() => {
            const modal = screen.queryByTestId('hotkey-modal')
            expect(modal).toBeNull()
        })
    });

    it('should hide the hotkey modal when the background is clicked', () => {
        render(
            <RootLayout>
                <Home />
            </RootLayout>
        )

        // open the modal first
        const btn = screen.getByTestId('hotkeys-btn')        
        fireEvent.click(btn)

        const bg = screen.getByTestId('hotkey-modal-background')
        fireEvent.click(bg)

        waitFor(() => {
            const modal = screen.queryByTestId('hotkey-modal')
            expect(modal).toBeNull()
        })
    });

});