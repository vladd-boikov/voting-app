'use client';

import Image from 'next/image';
import { Contestant } from '@/src/types/contestant';
import { VoteButton } from '@/src/components/VoteButton/VoteButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/src/utils/helpers';
import { useVote } from '@/src/hooks/useVote';
import { UseVotesResult } from '@/src/types/useVotesResult';
import {useEffect, useState} from "react";

type ContestantCardProps = {
    contestant: Contestant;
    userVotes: UseVotesResult;
};

export function ContestantCard({ contestant, userVotes }: ContestantCardProps) {
    const [isClient, setIsClient] = useState(false)

    const {
        voteCount,
        submitted,
        setVoteCount,
        handleVote,
        totalSubmittedVotes
    } = useVote(contestant.id);

    const isVoteDisabled =
        submitted || voteCount <= 0 || voteCount > userVotes.votesRemaining;

    const handleClick = () => {
        handleVote();
        userVotes.decreaseVotes(voteCount);
        setVoteCount(0)
    };


    useEffect(() => {
        setIsClient(true)
    }, [])

    return (
        <Card className="transition hover:shadow-md">
            <CardHeader>
                <Image
                    src={contestant.image}
                    alt={contestant.name}
                    width={100}
                    height={100}
                    className="rounded-md object-cover"
                />
                <CardTitle className="text-xl mt-2">{contestant.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                <p className="text-sm text-muted-foreground">{contestant.bio}</p>

                <p className="text-sm text-white">
                    Total points: <span className="font-semibold">{isClient ? totalSubmittedVotes : 0}</span>
                </p>

                <div className='flex gap-2 items-center'>
                    <Input
                        type="number"
                        min={1}
                        value={voteCount}
                        onChange={(e) => setVoteCount(Number(e.target.value))}
                        disabled={submitted}
                        className={cn(
                            'w-full',
                            'bg-black text-white',
                            'border border-gray-700',
                            'focus-visible:ring-0 focus-visible:ring-offset-0',
                            submitted && 'opacity-50 cursor-not-allowed'
                        )}
                    />

                    <VoteButton
                        onClick={handleClick}
                        disabled={isVoteDisabled}
                        submitted={submitted}
                        className="w-17"
                    />
                </div>
            </CardContent>
        </Card>
    );
}
