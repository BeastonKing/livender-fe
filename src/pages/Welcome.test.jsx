import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import Welcome from './Welcome';

describe('Welcome Component', () => {
    test('renders the welcome message', () => {
        render(
            <MemoryRouter>
                <Welcome />
            </MemoryRouter>
        );

        const welcomeText = screen.getByText(/Welcome to/i);
        expect(welcomeText).toBeInTheDocument();

        const exploreLink = screen.getByRole('link', { name: /Start Exploring/i });
        expect(exploreLink).toHaveAttribute('href', '/books');
    });
});
