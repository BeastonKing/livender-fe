import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // To handle routes in the test
import Welcome from './pages/Welcome';

describe('Welcome Component', () => {
    test('renders the welcome message', () => {
        render(
            <MemoryRouter>
                <Welcome />
            </MemoryRouter>
        );

        // Test for the presence of welcome text
        const welcomeText = screen.getByText(/Welcome to/i);
        expect(welcomeText).toBeInTheDocument();

        // Test for the presence of a link to books
        const exploreLink = screen.getByRole('link', { name: /Start Exploring/i });
        expect(exploreLink).toHaveAttribute('href', '/books');
    });
});
