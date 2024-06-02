import React, { useState } from 'react';
import FlashCard from './FlashCard';
import { Grid, Button, Box } from '@mui/material';

const FlashCardList = () => {
    const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const flashcards = [
        {
            questions: [
                {
                    name: "What is the capital of France?",
                    answers: [
                        { answerName: "Paris", isAnswer: true },
                        { answerName: "London", isAnswer: false },
                        { answerName: "Mascova", isAnswer: false },
                        { answerName: "Berlin", isAnswer: false }
                    ]
                }
            ],
            deckId: "665217cb50eea828b6113562",
            deckName: "Europe Capitals",
            regionType: "Geography",
            deckOwner: "John Doe"
        },
        {
            questions: [
                {
                    name: "What is the capital of Japan?",
                    answers: [
                        { answerName: "Tokyo", isAnswer: true },
                        { answerName: "Beijing", isAnswer: false },
                        { answerName: "Seoul", isAnswer: false },
                        { answerName: "Bangkok", isAnswer: false }
                    ]
                }
            ],
            deckId: "665217cb50eea828b6113563",
            deckName: "Asia Capitals",
            regionType: "Geography",
            deckOwner: "Jane Doe"
        }
    ];

    const handleNext = () => {
        setCurrentFlashcardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
        setShowAnswer(false); // Reset showAnswer state to false
    };

    const handleBack = () => {
        setCurrentFlashcardIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
        setShowAnswer(false); // Reset showAnswer state to false
    };

    return (
        <Box>
            <Grid container justifyContent="center">
                <Grid sx={{ padding: '20px' }} item xs={12} sm={6} md={4} lg={6}>
                    <FlashCard flashcard={flashcards[currentFlashcardIndex]} showAnswer={showAnswer} setShowAnswer={setShowAnswer} />
                </Grid>
            </Grid>
            <Box display="flex" justifyContent="center" mt={2}>
                <Button variant="contained" onClick={handleBack} sx={{ mr: 2 }}>Back</Button>
                <Button variant="contained" onClick={handleNext}>Next</Button>
            </Box>
        </Box>
    ); 
}

export default FlashCardList;
