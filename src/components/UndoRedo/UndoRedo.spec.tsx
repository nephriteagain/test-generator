
import '@testing-library/jest-dom'
import { fireEvent, getByTestId, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import React from 'react'
import UndoRedo from './UndoRedo';
import { fakeContext } from '@/utils/fakeData';
import { actions } from '@/types/types';



describe('UndoRedo', () => {

    beforeEach(() => {
        jest.spyOn(React, 'useContext').mockReturnValueOnce(fakeContext)
    })

    it('should render the component', async () => {
        render(<UndoRedo />)

        await waitFor(() => {
            const undoRedo = screen.getByTestId('undo-redo')
            const btn = screen.getByText('undo')
            expect(undoRedo).toBeInTheDocument()
            expect(btn).toBeInTheDocument()
        })
    });



});