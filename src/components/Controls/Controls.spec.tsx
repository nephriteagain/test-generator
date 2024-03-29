import '@testing-library/jest-dom'
import { fireEvent, getByTestId, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import React from 'react'
import Controls from '../Controls'
import { test } from '@/types';

describe('Controls', () => {
   

    it('should render the component', async () => {
        const fakeData = {
            downloadTextAsDocX: jest.fn(),
            test: {} as test,
            disabledBtn: false,
            showModal: false,
            setShowModal: jest.fn()

        }
        render(<Controls {...fakeData} />)

        await waitFor(() => {
            const controls = screen.getByTestId('controls')
            const hotkeyBtn = screen.getByTestId('hotkeys-btn')
            const download = screen.getByTestId('download')

            expect(controls).toBeInTheDocument()
            expect(hotkeyBtn).toBeInTheDocument()
            expect(download).toBeInTheDocument()
            
        })
    });

    it('should invoked downloadTextAsDocX when clicked', async () => {
        const fakeData = {
            downloadTextAsDocX: jest.fn(),
            test: {} as test,
            disabledBtn: false,
            showModal: false,
            setShowModal: jest.fn()

        }
        render(<Controls {...fakeData} />)

        const btn = screen.getByText('Download as Word File')
        fireEvent.click(btn)
        await waitFor(() => {
            expect(fakeData.downloadTextAsDocX).toHaveBeenCalled()
            
        })
    });

    it('should invoked setShowModal when clicked', async () => {
        const fakeData = {
            downloadTextAsDocX: jest.fn(),
            test: {} as test,
            disabledBtn: false,
            showModal: false,
            setShowModal: jest.fn()

        }
        render(<Controls {...fakeData} />)

        const btn = screen.getByText('Hotkeys')
        fireEvent.click(btn)
        await waitFor(() => {
            expect(fakeData.setShowModal).toHaveBeenCalled()
            
        })
    });

});