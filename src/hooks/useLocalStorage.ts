import { useState, useCallback, useRef } from 'react';
import { toast } from 'sonner';

export function useLocalStorage<T>(
    key: string,
    initialValue: T
): [T, (val: T | ((prev: T) => T)) => void, () => void] {
    const isBrowser = typeof window !== 'undefined';
    const initialRef = useRef(initialValue);

    const [storedValue, setStoredValue] = useState<T>(() => {
        if (!isBrowser) return initialRef.current;
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialRef.current;
        } catch {
            return initialRef.current;
        }
    });

    const setValue = useCallback(
        (value: T | ((prev: T) => T)) => {
            if (!isBrowser) return;
            try {
                const newValue = value instanceof Function ? value(JSON.parse(window.localStorage.getItem(key) ?? '{}')) : value;
                window.localStorage.setItem(key, JSON.stringify(newValue));
                setStoredValue(newValue);
            } catch (error) {
                console.warn(`Error setting localStorage key "${key}":`, error);
                toast.error('Failed to submit your vote');
            }
        },
        [key, storedValue]
    );

    const clear = useCallback(() => {
        if (!isBrowser) return;
        try {
            window.localStorage.removeItem(key);
            setStoredValue(initialRef.current);
        } catch (error) {
            console.warn(`Error removing localStorage key "${key}":`, error);
            toast.error('Failed to clear the votes');
        }
    }, [key]);

    return [storedValue, setValue, clear];
}
