import '@testing-library/jest-dom'
import { fireEvent, getByTestId, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import React from 'react'
import MatchingQuestions from './MatchingQuestions'
import { unitType } from '@/types/types';


describe('MatchingQuestions', () => {
    const fakeContext = {
        dispatch: jest.fn(),
        History: {
            add: jest.fn(),
        },
        test: {} as any,
        setFocus: jest.fn()
    } as any

    beforeEach(() => {
        jest.spyOn(React, 'useContext').mockReturnValueOnce(fakeContext)
    })

    it('should render the component', async () => {
        
        const Props = {
            unitId: 'id',
            instructions: 'some instructions',
            matchingUnit: {
                id: 'string',
                questions: [],
                choices: []
            },
            type: unitType.matching,
        }
        render(<MatchingQuestions {...Props} />)

        const matching = screen.getByTestId('matching-questions')
        await waitFor(() => {
            expect(matching).toBeInTheDocument()
        })

    });


    it('should NOT render the component', async () => {
        
        const Props = {
            unitId: 'id',
            instructions: 'some instructions',
            matchingUnit: undefined,
            type: unitType.matching,
        }
        render(<MatchingQuestions {...Props} />)

        const matching = screen.queryByTestId('matching-questions')
        await waitFor(() => {
            expect(matching).not.toBeInTheDocument()
        })

    });

    

});