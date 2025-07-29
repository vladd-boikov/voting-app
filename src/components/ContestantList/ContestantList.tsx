'use client';

import { useVotes } from '@/src/hooks/useVotes';
import { Contestant } from '@/src/types/contestant';
import { ContestantCard } from '../ContestantCard/ContestantCard';
import {useEffect, useState} from "react";

type ContestantListProps = {
    contestants: Contestant[];
};

export function ContestantList({ contestants }: ContestantListProps) {
    const [isClient, setIsClient] = useState(false)


    const votes = useVotes();

    useEffect(() => {
        setIsClient(true)
    }, [])

    return (
        <div className='flex flex-col gap-6 items-center'>
            <p>Votes Remaining: {isClient ? votes.votesRemaining : 0}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contestants.map((contestant) => (
                    <ContestantCard
                        key={contestant.id}
                        contestant={contestant}
                        userVotes={votes}
                    />
                ))}
            </div>
        </div>
    );
}
