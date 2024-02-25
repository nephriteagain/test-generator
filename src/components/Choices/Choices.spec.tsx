import '@testing-library/jest-dom'
import { fireEvent, getByTestId, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import React from 'react'
import Choices from './Choices'
import { unitType } from '@/types';

describe('Choices', () => {
    const fakeData = {
        History: {
            add: jest.fn()
        },
        dispatch: jest.fn(),
        test: {}
    } as any
    beforeEach(() => {
        jest.spyOn(React, 'useContext').mockReturnValueOnce(fakeData)    
    })

    it('should render the component, as Essay', async () => {
        const Props = {
            choices: [],
            unitId: 'abc',
            questionId: 'cde',
            type: unitType.essay
        }
        render(<Choices  {...Props} />)

        await waitFor(() => {
            const choices = screen.getByTestId('essay-textarea')
            expect(choices).toBeInTheDocument()
        })

    });

    it('should render the component, as Multiple Choice', async () => {
        const Props = {
            choices: [
                {id: 'a', choice: 'a'},
                {id: 'b', choice: 'b'}
            ],
            unitId: 'abc',
            questionId: 'cde',
            type: unitType.multipleChoice
        }
        render(<Choices  {...Props} />)

        await waitFor(() => {
            const choices = screen.getByTestId('choices')
            expect(choices).toBeInTheDocument()
            const choiceItems = screen.getAllByTestId('choice')
            expect(choiceItems).toHaveLength(2)
        })

    });

    it('should call the dispatch function when button is clicked', async () => {
        const Props = {
            choices: [
                {id: 'a', choice: 'a'},
                {id: 'b', choice: 'b'}
            ],
            unitId: 'abc',
            questionId: 'cde',
            type: unitType.multipleChoice
        }
        render(<Choices  {...Props} />)

        const btn = screen.getByTestId('btn-add-choice')
        fireEvent.click(btn)

        await waitFor(() => {
            expect(fakeData.dispatch).toHaveBeenCalled()
            expect(fakeData.History.add).toHaveBeenCalled()
        })

    });

});