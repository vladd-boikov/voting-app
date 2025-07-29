export type UseVotesResult = {
    votesRemaining: number;
    decreaseVotes: (count?: number) => void;
    resetVotes: () => void;
};
