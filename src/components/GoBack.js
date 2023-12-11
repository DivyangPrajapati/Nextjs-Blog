'use client'

import { useRouter } from 'next/navigation';

function GoBack() {
    const router = useRouter();
    return (
        <button className="px-4 py-1 text-sm text-cyan-400 font-bold border border-cyan-400 hover:text-white hover:bg-cyan-400 inline-block rounded mb-3" type="button" onClick={() => router.back()}>Go Back</button>
    )
}

export default GoBack;
