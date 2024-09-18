import { render, screen } from '@testing-library/react';
import PostsExcerpt from '../components/PostsExcerpt';

const mockPost = {
    title: 'Test Post Title',
    body: 'This is the body of the test post which will be truncated after 100 characters.',
    date: '2023-09-18T14:00:00Z',
    reactions: { thumbsUp: 1, wow: 1, heart: 1 },
    userId: 'user1'
};

test('renders post title and body', () => {
    render(<PostsExcerpt post={mockPost} />);
    
    // Test if the title is rendered
    const titleElement = screen.getByText(/Test Post Title/i);
    expect(titleElement).toBeInTheDocument();

    // Test if the truncated body is rendered
    const bodyElement = screen.getByText(/This is the body of the test post which will be truncated after 100 char/i);
    expect(bodyElement).toBeInTheDocument();
});