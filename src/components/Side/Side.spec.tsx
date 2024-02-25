import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import Side from '../Side'
import React from 'react';
import { unitType } from '@/types/types';

describe('Side', () => {
    jest.spyOn(React, 'useContext').mockReturnValueOnce({
        test:{currentUnit: unitType.multipleChoice}
    })
    it('should render the componenent', async () => {
        render(<Side />)
        await waitFor(() => {
            const side = screen.getByTestId('side')
            expect(side).toBeInTheDocument()
        })
    });

});