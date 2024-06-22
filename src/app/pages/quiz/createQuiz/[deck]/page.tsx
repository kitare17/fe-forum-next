"use client"

import CreateQuiz from "../../component/QuizComponent";
import { useParams } from "next/navigation";

const Page = () => {
    const { deck } = useParams();
    return (
        <>
            <CreateQuiz deckId={deck} />
        </>
    )
}
export default Page;

