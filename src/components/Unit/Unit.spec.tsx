import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import Unit from './Unit'
import React from 'react'
import { unitType } from '@/types';


describe('Unit', () => {
    
    it('should render the component', async () => {
        const fakeData = {
            History: jest.fn(),
            dispatch: jest.fn(),
            setFocus: jest.fn(),
            test: {}
        } as any
        jest.spyOn(React, 'useContext').mockReturnValueOnce(fakeData)
        const fakeUnitProps = {
            id: 'someid',
            questions: [],
            instructions: 'some random string',
            index: 0,
            type: unitType.multipleChoice,
            matchingUnit: undefined
        }
        render(<Unit {...fakeUnitProps} />)
    });
    waitFor(() => {
        const unit = screen.getByTestId('unit')
        expect(unit).toBeInTheDocument()

    })

});