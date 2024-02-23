import '@testing-library/jest-dom'
import { fireEvent, getByTestId, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import Headers from './Headers'
import React from 'react'

describe('Headers', () => {
    const fakeData = {
        test: {
            author: 'jade',
            subject: 'MATH'
        },
        dispatch: jest.fn()
    } as any
    
    beforeEach(() => {
        jest.spyOn(React, 'useContext').mockReturnValueOnce(fakeData) 

    })

    
    it('should render the component', async () => {
        
        render(<Headers />)

        await waitFor(() => {
            const headers = screen.getByTestId('headers')
            const subject = screen.getByTestId('input-subject')
            const author = screen.getByTestId('input-author')
            expect(headers).toBeInTheDocument()
            expect(subject).toBeInTheDocument()      
            expect(author).toBeInTheDocument()            
        })
    });

    it('should call dispatch when input change', async () => {
        
        render(<Headers />)

        const subject = screen.getByTestId('input-subject')
        const author = screen.getByTestId('input-author')                

        fireEvent.change(subject, {target: {
            value: 'new subject'
        }})
        fireEvent.change(author, {target: {
            value: 'new author'
        }})

        await waitFor(() => {
            expect(fakeData.dispatch).toHaveBeenCalled()
            expect(fakeData.dispatch).toHaveBeenCalledTimes(2)
        })

    });


});


