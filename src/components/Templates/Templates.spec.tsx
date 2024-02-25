import '@testing-library/jest-dom'
import { fireEvent, getByTestId, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import React from 'react'
import Templates from './Templates';
import { fakeContext } from '@/utils/fakeData';
import { actions } from '@/types/types';


describe('Templates', () => {
    beforeEach(() => {
        jest.spyOn(React, 'useContext').mockReturnValueOnce(fakeContext)
    })

    it('should render the component', async () => {
        render(<Templates />)

        await waitFor(() => {
            const ts = screen.getByTestId('templates')
            expect(ts).toBeInTheDocument()
        })
    });

});