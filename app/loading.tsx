export default function Loading() {
    return (
        <div className="flex h-screen items-center justify-center bg-black text-white">
            <div className="flex items-center space-x-2">
                <span className="block h-3 w-3 animate-pulse rounded-full bg-white" />
                <span className="block h-3 w-3 animate-pulse rounded-full bg-white delay-150" />
                <span className="block h-3 w-3 animate-pulse rounded-full bg-white delay-300" />
                <span className="ml-4 text-sm tracking-wide uppercase">Loading...</span>
            </div>
        </div>
    );
}
