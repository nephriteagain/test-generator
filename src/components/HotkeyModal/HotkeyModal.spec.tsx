import '@testing-library/jest-dom'
import { fireEvent, getByTestId, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import React from 'react'
import HotkeyModal from './HokeyModal'
import { test } from '@/types/types';


describe('HotkeyModal', () => {
    
    it('should render the component', async () => {
        const Props = {
            setShowModal: jest.fn(),
        }
        render(<HotkeyModal {...Props} />)

        await waitFor(() => {
            const modal = screen.getByTestId('hotkey-modal')
            expect(modal).toBeInTheDocument()
        })
    });


    it('should invoke setShowModal', async () => {
        const Props = {
            setShowModal: jest.fn(),
        }
        render(<HotkeyModal {...Props} />)

        const btn = screen.getByText('close')
        fireEvent.click(btn)

        await waitFor(() => {
            expect(Props.setShowModal).toHaveBeenCalled()
        })
    });
});