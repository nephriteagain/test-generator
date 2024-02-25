import '@testing-library/jest-dom'
import { fireEvent, getByTestId, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import React from 'react'
import Template from './Template';
import { fakeContext } from '@/utils/fakeData';
import { actions } from '@/types/types';


describe('Template', () => {

    beforeEach(() => {
        jest.spyOn(React, 'useContext').mockReturnValueOnce(fakeContext)
    })
    
    it('should render the component', async () => {
        const Props = {
            id: 0,
            setSelected: jest.fn(),
            selected: 0,
            unitType: 'multiple choice'
        }

        render(<Template {...Props} />)

        await waitFor(() => {
            const template = screen.getByText('multiple choice')
            expect(template).toBeInTheDocument()
        })

    });

    it('should invoke setSelected and dispatch when btn is clicked', async () => {
        const Props = {
            id: 0,
            setSelected: jest.fn(),
            selected: 0,
            unitType: 'multiple choice'
        }

        render(<Template {...Props} />)
        const template = screen.getByText('multiple choice')
        fireEvent.click(template)
        await waitFor(() => {
            expect(Props.setSelected).toHaveBeenCalledWith(Props.id)
            expect(fakeContext.dispatch).toHaveBeenCalled()
        })

    });

    it('should invoke History.add and dispatch when btn is double clicked', async () => {
        const Props = {
            id: 0,
            setSelected: jest.fn(),
            selected: 0,
            unitType: 'multiple choice'
        }

        render(<Template {...Props} />)
        const template = screen.getByText('multiple choice')
        fireEvent.doubleClick(template)
        await waitFor(() => {
            expect(fakeContext.History.add).toHaveBeenCalledWith(fakeContext.test)
            expect(fakeContext.dispatch).toHaveBeenCalledWith({type: actions.addUnit})
        })

    });

});
