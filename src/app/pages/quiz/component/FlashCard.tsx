import React, { useState } from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';
import { QuizInterface } from "@/app/interface/Quizz";

interface Props {
    flashcard: QuizInterface; // Specify the type of the flashcard prop
    showAnswer: boolean; // State to manage the visibility of the answer
    setShowAnswer: React.Dispatch<React.SetStateAction<boolean>>; // Function to set the visibility of the answer
}

const FlashCard: React.FC<Props> = ({ flashcard, showAnswer, setShowAnswer }) => {

    const handleToggle = () => {
        setShowAnswer(!showAnswer);
    };

    const correctAnswer = flashcard.questions[0].answers.find(answer => answer.isAnswer);

    return (
        <Card
            variant="outlined"
            onClick={handleToggle}
            style={{ cursor: 'pointer', width: '100%', maxWidth: '1000px', margin: '0 auto' }}
        >
            <CardContent style={{ height: '300px', width: '700px' }}>
                {showAnswer ? (
                    <Typography
                        variant="h5"
                        component="h3"
                        gutterBottom
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {correctAnswer ? correctAnswer.answerName : 'No correct answer provided'}
                    </Typography>
                ) : (
                    <>
                        <Typography variant="h5" component="h3" gutterBottom>
                            {flashcard.questions[0].name}
                        </Typography>
                        <List>
                            {flashcard.questions[0].answers.map((answer, index) => (
                                <ListItem key={index}>
                                    <ListItemText
                                        primary={answer.answerName}
                                        primaryTypographyProps={{ variant: 'h6' }}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </>
                )}
            </CardContent>

        </Card>
    );
};

export default FlashCard;
