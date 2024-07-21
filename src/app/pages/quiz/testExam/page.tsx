"use client"

import TestExam from "../component/TestExam";


import { useParams, useRouter } from "next/navigation";

const Page = () => {
    const { deck } = useParams();

    return (
        <>
            <TestExam deckId={deck} />
        </>
    )
}
export default Page;

