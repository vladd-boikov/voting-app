'use client';

import { ButtonHTMLAttributes } from 'react';
import {cn} from "@/src/utils/helpers";
import {Button} from "@/components/ui/button";

type VoteButtonProps = {
    submitted?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function VoteButton({ submitted = false, className = '', ...rest }: VoteButtonProps) {
    return (
        <Button
            variant="default"
            className={cn(
                'font-semibold',
                submitted
                    ? 'bg-green-600 hover:bg-green-600'
                    : 'bg-blue-600 hover:bg-blue-700',
                className
            )}
            {...rest}
        >
            {submitted ? 'Voted' : 'Vote'}
        </Button>
    );
}
