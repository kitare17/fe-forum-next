import React from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import { DeckInterface } from "@/app/interface/Quizz";
import { useDispatch } from 'react-redux';

import { AppDispatch } from '@/app/store'; // Import your AppDispatch type

interface Props {
    deck: DeckInterface; // Specify the type of the deck prop
}

const DeckCard: React.FC<Props> = ({ deck }) => {
    const dispatch: AppDispatch = useDispatch(); // Ensure dispatch is typed correctly



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
