import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';
import { QuizInterface } from "@/app/interface/Quizz";


interface Props {
    flashcard: QuizInterface; // Specify the type of the flashcard prop
}

const DeckCard: React.FC<Props> = ({ flashcard }) => { // Use React.FC and Props interface
    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                    {flashcard.questions[0].name} {/* Display the question */}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default DeckCard;
