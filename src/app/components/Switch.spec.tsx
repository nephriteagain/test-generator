import '@testing-library/jest-dom'
import { fireEvent, getByTestId, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import React from 'react'
import Questions from './Questions';
import { fakeContext } from '@/utils/testHelpers/fakeData';
import Switch from './Switch';


describe('Switch', () => {
    
    it('should render the component', async () => {
        render(<Switch />)

        await waitFor(() => {
            const s = screen.getByTestId('mode')
            const light = screen.getByTestId('light')
            expect(s).toBeInTheDocument()            
            expect(light).toBeInTheDocument()
        })

    });

    it('should render the dark icon when btn is clicked', async () => {
        render(<Switch />)
        const btn = screen.getByTestId('switch-btn')
        fireEvent.click(btn)


        await waitFor(() => {
            const s = screen.getByTestId('mode')
            const dark = screen.getByTestId('dark')
            expect(s).toBeInTheDocument()            
            expect(dark).toBeInTheDocument()
        })

    });

});