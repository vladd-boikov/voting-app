import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex items-center justify-center h-screen bg-black text-white text-center px-4">
            <div>
                <h2 className="text-3xl font-semibold mb-4">Page not found 🕳️</h2>
                <p className="mb-4 text-lg">Sorry, we couldn’t find what you were looking for.</p>
                <Link
                    href="/"
                    className="inline-block px-4 py-2 border border-white rounded hover:bg-white hover:text-black transition"
                >
                    Go back home
                </Link>
            </div>
        </div>
    );
}
