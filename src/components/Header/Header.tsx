import Image from "next/image";

export function Header() {

    return (
        <div className='flex gap-10 items-center py-6'>
            <div className="bg-white p-1 rounded-full shadow-md shrink-0">
                <Image src="/images/logo.png" alt="Logo" width={30} height={30} />
            </div>
          <h1 className="text-lg sm:text-2xl md:text-3xl font-bold">Vote for Your Favorite Contestant</h1>
        </div>
    );
}
