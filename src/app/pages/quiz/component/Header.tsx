import React from "react";
import { Button, Box } from "@mui/material";
import { useRouter } from "next/navigation";

interface HeaderProps {
    deckId: {
        deckId: string;
    };
    questionsCount: number;
}

const Header: React.FC<HeaderProps> = ({ deckId, questionsCount }) => {
    const router = useRouter();

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-end',
            }}
        >
            {!deckId.deckId ? (
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
                    onClick={() => router.push(`/pages/quiz/createQuiz/${deckId.deckId}`)} // Use deckId directly as it's a string
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
