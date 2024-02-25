import '@testing-library/jest-dom'
import { fireEvent, getByTestId, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import React from 'react'
import Questions from './Questions';
import { fakeContext } from '@/utils/fakeData';
import { unitType } from '@/types';

describe('Questions', () => {    
    beforeEach(() => {
        jest.spyOn(React, 'useContext').mockReturnValueOnce(fakeContext)
    })

    it('should render a component', async () => {
        const Props = {
            questions: [],
            index: 0,
            id: 'some_id',
            type: unitType.multipleChoice
        }
        render(<Questions {...Props} />)


        await waitFor(() => {
            const questions = screen.getByTestId('questions')
            expect(questions).toBeInTheDocument()
        })
    });

    it('should add another question when the button is clicked', async () => {
        const Props = {
            questions: [],
            index: 0,
            id: 'some_id',
            type: unitType.multipleChoice
        }
        render(<Questions {...Props} />)

        const btn = screen.getByText('new question')
        fireEvent.click(btn)

        await waitFor(() => {
            expect(fakeContext.dispatch).toHaveBeenCalled(),
            expect(fakeContext.History.add).toHaveBeenCalledWith(fakeContext.test)
            
        })
    });

});