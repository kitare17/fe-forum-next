import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';
import { DeckInterface } from "@/app/interface/Quizz";


interface Props {
    deck: DeckInterface; // Specify the type of the flashcard prop
}

const DeckCard: React.FC<Props> = ({ deck }) => { // Use React.FC and Props interface
    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                    {deck.name}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default DeckCard;
