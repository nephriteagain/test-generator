import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Button from './Button'
 
describe('Button', () => {
  it('renders a textarea', () => {
    render(<Button />)
 
    const textarea = screen.getByTestId('button')
 
    expect(textarea).toBeInTheDocument()
  })
})