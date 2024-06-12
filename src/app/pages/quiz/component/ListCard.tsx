import React, { useState } from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import { FlashCardInterface, QuizInterface, Question } from "@/app/interface/Quizz";

interface Props {
    question: Question;
}

const ListCard: React.FC<Props> = ({ question }) => {


    const correctAnswer = question.answers.find(answer => answer.isAnswer);

    return (
        <Card
            variant="outlined"
        >
            <CardContent
                style={{ height: '300px', width: '1000px' }}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',  // Align items vertically in the center
                }}

            >
                <div style={{ width: '50%' }}>
                    <Typography variant="h5" component="h3" gutterBottom>
                        {question.name}
                    </Typography>
                    <List>
                        {question.answers.map((answer, index) => (
                            <ListItem key={index}>
                                <ListItemText
                                    primary={answer.answerName}
                                    primaryTypographyProps={{ variant: 'h6' }}
                                />
                            </ListItem>
                        ))}
                    </List>
                </div>
                <Typography

                    variant="h5"
                    component="h3"
                    gutterBottom
                    sx={{
                        backgroundColor: '#e6e6e6',  // Set background color (light blue with transparency)
                        padding: '8px',  // Add some padding for better appearance
                        borderRadius: '4px',  // Optional: add rounded corners
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',  // Ensure it takes the full height for alignment
                        width: '50%',
                    }}
                >
                    {correctAnswer ? correctAnswer.answerName : 'No correct answer provided'}
                </Typography>
            </CardContent>

        </Card>
    );
};

export default ListCard;
