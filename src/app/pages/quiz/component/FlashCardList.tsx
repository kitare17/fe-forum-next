import React, { useState, useEffect } from 'react';
import FlashCard from './FlashCard';
import ListCard from './ListCard';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { showAllQuizzes } from "@/app/store/action/quiz";

import { Grid, Button, Box, IconButton } from '@mui/material';
import { useRouter } from "next/navigation";
import { ArrowForward, ArrowBack } from '@mui/icons-material';
import { FlashCardInterface } from '@/app/interface/Quizz';

const FlashCardList = (deckId: any) => {
    const router = useRouter();
    const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    const dipatch = useDispatch();
    const { listFlashCard, isLoading, isError } = useSelector((state: RootState) => state.quiz);

    useEffect(() => {
        // @ts-ignore
        dipatch(showAllQuizzes());

    }, [])

    const flashCardDetail: FlashCardInterface | undefined = listFlashCard.find(card => card.deckId._id == deckId.deckId);

    const handleNext = () => {
        setCurrentFlashcardIndex((prevIndex) => (prevIndex + 1) % listFlashCard[0].questions.length);
        setShowAnswer(false); // Reset showAnswer state to false
    };

    const handleBack = () => {
        setCurrentFlashcardIndex((prevIndex) => (prevIndex - 1 + listFlashCard[0].questions.length) % listFlashCard[0].questions.length);
        setShowAnswer(false); // Reset showAnswer state to false
    };


    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '17px',
                    padding: '20px',
                    gap: '10px'
                }}
            >

                <Button
                    onClick={() => router.push(`/pages/quiz/testExam`)}
                    size="small"
                    color="inherit"
                    variant="outlined"
                >
                    Kiểm tra
                </Button>
                <Button
                    onClick={() => router.push(`/page/test`)}
                    size="small"
                    color="inherit"
                    variant="outlined"
                >
                    Lịch sử kiểm tra
                </Button>
            </Box>

            <Box>

                <Grid container justifyContent="center">
                    <Grid sx={{ padding: '20px' }} item xs={12} sm={6} md={4} lg={6}>
                        {flashCardDetail &&
                            <FlashCard question={flashCardDetail.questions[currentFlashcardIndex]} showAnswer={showAnswer} setShowAnswer={setShowAnswer} />
                        }
                    </Grid>
                </Grid>

                <Box display="flex" justifyContent="center" mb={6}>
                    <IconButton
                        onClick={handleBack}
                        sx={{
                            padding: '10px',
                            borderRadius: '50%',
                            backgroundColor: 'lightgray',
                            '&:hover': {
                                backgroundColor: 'gray',
                            },
                            mr: 2
                        }}
                    >
                        <ArrowBack />
                    </IconButton>
                    <IconButton
                        onClick={handleNext}
                        sx={{
                            padding: '10px',
                            borderRadius: '50%',
                            backgroundColor: 'lightgray',
                            '&:hover': {
                                backgroundColor: 'gray',
                            },
                        }}
                    >
                        <ArrowForward />
                    </IconButton>
                </Box>



                <Grid container
                    direction="row"
                    alignItems="center"
                    justifyContent='center'
                    spacing={2}
                    mb={9}
                    p={2}
                >

                    {flashCardDetail?.questions.map((question, index) => (
                        <Grid item key={index} >
                            <ListCard question={question} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>

    );
}

export default FlashCardList;
