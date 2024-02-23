import '@testing-library/jest-dom'
import { fireEvent, getByTestId, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import React from 'react'
import Question from './Question'
import { unitType } from '@/types/types';


describe('Question', () => {
    const fakeData = {
        History: {
            add: jest.fn(),
            dispatch: jest.fn(),
            test: {} as any,
            focus: {} as any,
            setFocus: jest.fn()
        } as any
    }
    beforeEach(() => {
        jest.spyOn(React, 'useContext').mockReturnValueOnce(fakeData)
    })
    
    it('should render the component', async () => {
        const Props = {
            question: 'who are you',
            choices: [],
            index: 0,
            id: 'id',
            unitId: 'unit_id',
            questionObj: {
                id: 'q_id',
                question: 'who are you',
                choices: [],
                type: unitType.multipleChoice
            },
            type: unitType.multipleChoice
        }
        render(<Question {...Props} />)

        await waitFor(() => {
            const q = screen.getByTestId('question')
            expect(q).toBeInTheDocument()
        })
    });


});