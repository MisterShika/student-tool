"use client";

import Image from 'next/image';
export default function Header() {

    return(
        <header className="print:hidden flex flex-col items-center py-4 text-center w-full bg-yellow-400 mb-6 border-b border-yellow-500">
            <Image
                src="/images/logoMain.png"
                alt="Logo"
                width={150}
                height={100}
                className="mb-1 block mx-auto"
            />
            <h1 className="inline-block text-4xl font-bold -rotate-5">カムカム</h1>
        </header>
    )
}