"use client"

import FlashCardList from "../component/FlashCardList";
import { useParams, useRouter } from "next/navigation";

const Page = () => {
    const { deck } = useParams();

    return (
        <>
            <FlashCardList deckId={deck} />
        </>
    )
}
export default Page;

