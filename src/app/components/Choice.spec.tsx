import '@testing-library/jest-dom'
import { fireEvent, getByTestId, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import Choice from './Choice'
import React from 'react'
 

describe('Choice', () => {
    it('should render the component', async () => {
        const fakeData = {
            id: 'random_id',
            choice: 'this is a choice',
            unitId: 'unit_id',
            questionId: 'q_id',
            index: 0
        }
        render(<Choice {...fakeData} />)

        await waitFor(() => {
            const choice =  screen.getByTestId('choice')
            expect(choice).toBeInTheDocument()
        })
    });

});