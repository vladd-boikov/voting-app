import {useCallback, useEffect} from 'react';
import { useLocalStorage } from '@/src/hooks/useLocalStorage';
import {DEFAULT_VOTES} from "@/src/utils/constants";
import {UseVotesResult} from "@/src/types/useVotesResult";
import {LocalStorageEnum} from "@/src/enums/localStorageEnum";

export function useVotes(): UseVotesResult {
    const [votesRemaining, setVotesRemaining] = useLocalStorage<number>(LocalStorageEnum.VOTES_REMAINING, DEFAULT_VOTES);

    const decreaseVotes = useCallback((count: number = 1) => {
        setVotesRemaining((prev) => Math.max(prev - count, 0));
    }, [setVotesRemaining]);

    const resetVotes = useCallback(() => {
        setVotesRemaining(DEFAULT_VOTES);
    }, [setVotesRemaining]);

    useEffect(() => {
        if (!window.localStorage.getItem(LocalStorageEnum.VOTES_REMAINING)) {
            setVotesRemaining(DEFAULT_VOTES)
        }
    }, []);

    console.log(votesRemaining, "votesRemaining")

    return {
        votesRemaining,
        decreaseVotes,
        resetVotes,
    };
}
