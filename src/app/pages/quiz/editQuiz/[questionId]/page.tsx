"use client"
import EditQuizComponent from "../../component/EditQuizComponent";

import { useParams } from "next/navigation";

const Page = () => {
    const { questionId } = useParams();
    console.log("QuestionID", questionId);
    return (
        <>
            <EditQuizComponent questionId={questionId} />
        </>
    )
}
export default Page;

