import React, { useState, useEffect } from 'react';
import FlashCard from './FlashCard';
import ListCard from './ListCard';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { showAllQuizzes, deleteQuestion } from "@/app/store/action/quiz";

import { Grid, Button, Box, IconButton, Typography } from '@mui/material';
import { useRouter } from "next/navigation";
import { ArrowForward, ArrowBack } from '@mui/icons-material';
import { FlashCardInterface, QuestionResponse } from '@/app/interface/Quizz';
import Header from './Header';

const FlashCardList = (deckId: any) => {
    const router = useRouter();
    const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const { listFlashCard, isLoading, isError } = useSelector((state: RootState) => state.quiz);

    useEffect(() => {
        dispatch(showAllQuizzes());
    }, [dispatch]);

    const getListFlashCardByDeckId = (listFlashCard: QuestionResponse[], deckId: string): QuestionResponse[] => {
        return listFlashCard.filter((flashCard) => flashCard.deck === deckId);
    };

    const filteredList = getListFlashCardByDeckId(listFlashCard, deckId.deckId);

    const handleNext = () => {
        setCurrentFlashcardIndex((prevIndex) => (prevIndex + 1) % filteredList.length);
        setShowAnswer(false);
    };

    const handleBack = () => {
        setCurrentFlashcardIndex((prevIndex) => (prevIndex - 1 + filteredList.length) % filteredList.length);
        setShowAnswer(false);
    };

    const handleEdit = (questionId: string) => {
        router.push(`/pages/quiz/editQuiz/${questionId}`);
    };

    const handleDelete = async (questionId: string) => {
        try {
            dispatch(deleteQuestion(questionId));
            dispatch(showAllQuizzes());
        } catch (error) {
            console.error('Error deleting quiz:', error);
        }
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
                    onClick={() => router.push(`/pages/quiz`)}
                    size="small"
                    color="inherit"
                    variant="outlined"
                    sx={{ marginRight: '200px' }}
                >
                    <ArrowBack />
                </Button>
                <Button
                    onClick={() => router.push(`/pages/quiz/testExam/${deckId.deckId}`)}
                    size="small"
                    color="inherit"
                    variant="outlined"
                >
                    Kiểm tra
                </Button>
                <Button
                    onClick={() => router.push(`/pages/quiz/historyTest`)}
                    size="small"
                    color="inherit"
                    variant="outlined"
                >
                    Lịch sử kiểm tra
                </Button>
                <Header deckId={deckId} questionsCount={filteredList.length} />
            </Box>

            <Box>

                <Grid container justifyContent="center">
                    <Grid sx={{ padding: '20px' }} item xs={12} sm={6} md={4} lg={6}>
                        {filteredList &&
                            <FlashCard question={filteredList[currentFlashcardIndex]} showAnswer={showAnswer} setShowAnswer={setShowAnswer} />
                        }
                    </Grid>
                </Grid>
                <Box
                    sx={{
                        fontSize: '14px',
                        color: 'text.primary',
                        textAlign: 'center',
                        padding: '20px',
                    }}
                >
                    {currentFlashcardIndex + 1} / {filteredList.length}
                </Box>

                {filteredList.length > 0 && (
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
                )}

                <Grid container
                    direction="row"
                    alignItems="center"
                    justifyContent='center'
                    spacing={2}
                    mb={9}
                    p={2}
                >
                    {filteredList.map((question, index) => (
                        <Grid item key={index} >
                            <ListCard
                                question={question}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    );
};

export default FlashCardList;
