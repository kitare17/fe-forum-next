import React from "react";
import { Button, Box } from "@mui/material";
import { useRouter } from "next/navigation";

const Header = () => {
    const router = useRouter();

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginBottom: '17px',
                padding: '20px'
            }}
        >
            <Button
                onClick={() => router.push(`/page/quiz/createDeck`)}
                size="small"
                color="inherit"
                variant="outlined"
                sx={{ marginRight: '10px' }}
            >
                Tạo chủ đề
            </Button>
            <Button
                onClick={() => router.push(`/page/quiz/createQuiz`)}
                size="small"
                color="inherit"
                variant="outlined"
            >
                Tạo bộ quiz
            </Button>
        </Box>
    );
}

export default Header;
