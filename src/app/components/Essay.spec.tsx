import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Essay from './Essay'
 
describe('Essay', () => {
  it('renders a textarea', () => {
    render(<Essay />)
 
    const textarea = screen.getByTestId('essay-textarea')
 
    expect(textarea).toBeInTheDocument()
  })
})