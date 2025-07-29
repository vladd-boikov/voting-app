'use client';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html>
            <body className="min-h-screen flex items-center justify-center bg-black text-white">
                <div className="flex flex-col items-center text-center space-y-4 px-4">
                    <h1 className="text-2xl font-semibold tracking-wide">
                        Oops! Something went wrong.
                    </h1>
                    <p className="text-sm text-gray-400 max-w-sm">
                        {error.message || 'An unexpected error occurred. Please try again.'}
                    </p>
                    <button
                        onClick={reset}
                        className="mt-2 px-4 py-2 text-sm font-medium bg-white text-black rounded hover:bg-gray-200 transition"
                    >
                        Try again
                    </button>
                </div>
            </body>
        </html>
    );
}
