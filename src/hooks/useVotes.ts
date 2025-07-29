import { useCallback } from 'react';
import { useLocalStorage } from '@/src/hooks/useLocalStorage';
import {DEFAULT_VOTES, STORAGE_KEY} from "@/src/utils/constants";
import {UseVotesResult} from "@/src/types/useVotesResult";

export function useVotes(): UseVotesResult {
    const [votesRemaining, setVotesRemaining] = useLocalStorage<number>(STORAGE_KEY, DEFAULT_VOTES);

    const decreaseVotes = useCallback((count: number = 1) => {
        setVotesRemaining((prev) => Math.max(prev - count, 0));
    }, [setVotesRemaining]);

    const resetVotes = useCallback(() => {
        setVotesRemaining(DEFAULT_VOTES);
    }, [setVotesRemaining]);

    return {
        votesRemaining,
        decreaseVotes,
        resetVotes,
    };
}
