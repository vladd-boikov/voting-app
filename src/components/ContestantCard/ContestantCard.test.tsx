import { render, screen, fireEvent } from '@testing-library/react';
import { Contestant } from '@/src/types/contestant';
import { UseVotesResult } from '@/src/types/useVotesResult';
import {ContestantCard} from "@/src/components/ContestantCard/ContestantCard";

beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
});

const mockContestant:Contestant  = {
    id: '1',
    name: 'Test Contestant',
    image: '/images/avatar1.png',
    bio: 'Testing contestant bio',
};

const mockUserVotes: UseVotesResult = {
    votesRemaining: 10,
    decreaseVotes: jest.fn(),
    resetVotes: jest.fn(),
};

test('Vote button disables after voting and stays disabled on reload', () => {
    const { rerender } = render(
        <ContestantCard contestant={mockContestant} userVotes={mockUserVotes} />
    );

    const voteInput = screen.getByRole('spinbutton') as HTMLInputElement;
    const voteButton = screen.getByRole('button', { name: /vote/i });

    expect(voteButton).toBeEnabled();

    fireEvent.change(voteInput, { target: { value: '3' } });
    fireEvent.click(voteButton);

    expect(voteButton).toBeDisabled();

    rerender(
        <ContestantCard contestant={mockContestant} userVotes={mockUserVotes} />
    );

    expect(screen.getByRole('button', { name: /vote/i })).toBeDisabled();
});
