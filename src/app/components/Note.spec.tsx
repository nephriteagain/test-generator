import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import Note from './Note'
import React from 'react'
 
describe('Note', () => {
    
    it('renders the component', () => {        
        const fakeData = {showNote: true, setShowNote: jest.fn()} as any
        jest.spyOn(React, 'useContext').mockReturnValueOnce(fakeData)
        render(<Note />)
    
        const note = screen.getByTestId('note')
    
        expect(note).toBeInTheDocument()
    })

    it('does not render the component, showNote is false', () => {        
        const fakeData = {showNote: false, setShowNote: jest.fn()} as any
        jest.spyOn(React, 'useContext').mockReturnValueOnce(fakeData)
        render(<Note />)
    
        const note = screen.queryByTestId('note')
        expect(note).toBeFalsy()
    
    })

    it('does not render the component, localstorage never-show-note === never', () => {        
        const fakeData = {showNote: true, setShowNote: jest.fn()} as any
        jest.spyOn(React, 'useContext').mockReturnValueOnce(fakeData)
        jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem').mockReturnValueOnce('never')
        render(<Note />)
    
        const note = screen.queryByTestId('note')
        expect(note).toBeFalsy()    
    })

    it('hide the note element when the button is clicked', async () => {
        const fakeData = {showNote: true, setShowNote: jest.fn()} as any
        jest.spyOn(React, 'useContext').mockReturnValueOnce(fakeData)

        render(<Note />)
        
        const btn = screen.getByTestId('button')
        fireEvent(
            btn,
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true
            }) 
        )

        expect(fakeData.setShowNote).toHaveBeenCalledWith(false)
        setTimeout(() => {
            const note = screen.queryByTestId('note')            
            expect(note).toBeNull()
        },500)

    })
})