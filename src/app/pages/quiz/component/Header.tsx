import React from "react";
import { Button, Box } from "@mui/material";
import { useRouter } from "next/navigation";

interface HeaderProps {
    deckId: string; // Assuming deckId is a string based on previous context
    questionsCount: number; // Number of questions in the filtered list
}

const Header: React.FC<HeaderProps> = ({ deckId, questionsCount }) => {
    const router = useRouter();

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                padding: '20px'
            }}
        >
            {!deckId ? (
                <>
                    <Button
                        onClick={() => router.push(`/pages/quiz/createDeck`)}
                        size="small"
                        color="inherit"
                        variant="outlined"
                        sx={{ marginRight: '10px' }}
                    >
                        Tạo chủ đề
                    </Button>
                    <Button
                        onClick={() => router.push(`/pages/quiz/createQuiz`)}
                        size="small"
                        color="inherit"
                        variant="outlined"
                        sx={{ marginRight: '10px' }}
                    >
                        Tạo Quiz
                    </Button>
                </>
            ) : (

                <Button
                    onClick={() => router.push(`/pages/quiz/createQuiz/${deckId.deckId}`)} // Adjust the route as per your requirement
                    size="small"
                    color="inherit"
                    variant="outlined"
                    sx={{ marginRight: '10px' }}
                >
                    Tạo Quiz
                </Button>

            )}

        </Box>
    );
};

export default Header;
