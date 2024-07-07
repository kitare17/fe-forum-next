"use client"

import HistoryTest from "../../component/HistoryTest";

import { useParams } from "next/navigation";

const Page = () => {
    const { deck } = useParams();
    return (
        <>
            <HistoryTest deckId={deck} />
        </>
    )
}
export default Page;

