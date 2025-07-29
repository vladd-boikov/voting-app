import { useCallback, useEffect, useState } from 'react';
import { useLocalStorage } from '@/src/hooks/useLocalStorage';
import { VoteData } from '@/src/types/voteData';
import { toast } from 'sonner';

export function useVote(contestantId: string) {
    const [votes, setVotes] = useLocalStorage<Record<string, VoteData>>('votes', {});
    const existingVote = votes[contestantId];
    const submitted = existingVote?.submitted ?? false;
    const totalSubmittedVotes = existingVote?.count ?? 0;

    const [voteCount, setVoteCount] = useState(1);

    const safeUpdateVotes = useCallback(
        (updater: (prev: Record<string, VoteData>) => Record<string, VoteData>) => {
            setVotes((prevFromState) => {
                try {
                    const localVotes = JSON.parse(localStorage.getItem('votes') || '{}');
                    const merged = { ...localVotes, ...prevFromState };
                    const updated = updater(merged);
                    localStorage.setItem('votes', JSON.stringify(updated));
                    return updated;
                } catch {
                    return updater(prevFromState);
                }
            });
        },
        [setVotes]
    );

    const handleVote = useCallback(() => {
        safeUpdateVotes((prev) => {
            const prevVote = prev[contestantId] ?? { count: 0, submitted: false };

            return {
                ...prev,
                [contestantId]: {
                    count: prevVote.count + voteCount,
                    submitted: true,
                },
            };
        });

        toast.success('Vote submitted!');
        setVoteCount(0);
    }, [voteCount, contestantId, safeUpdateVotes]);

    // Emulate users voting
    useEffect(() => {
        const delay = (parseInt(contestantId) % 5 + 1) * 2000;

        const interval = setInterval(() => {
            const randomIncrement = Math.floor(Math.random() * 10) + 1;

            safeUpdateVotes((prev) => {
                const current = prev?.[contestantId] ?? { count: 0, submitted: false };

                return {
                    ...prev,
                    [contestantId]: {
                        count: current.count + randomIncrement,
                        submitted: current.submitted,
                    },
                };
            });
        }, delay);

        return () => clearInterval(interval);
    }, [contestantId, safeUpdateVotes]);

    return {
        voteCount,
        setVoteCount,
        submitted,
        handleVote,
        totalSubmittedVotes,
    };
}
