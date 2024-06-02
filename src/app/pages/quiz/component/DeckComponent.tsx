import React from 'react'
import DeckCard from './DeckCard';
import Header from './Header';

import { Grid, Box } from '@mui/material';
import { useRouter } from "next/navigation";

const DeckComponent = () => {
    const router = useRouter();
    const Decks = [
        {
            questions: [
                {
                    name: "Math",
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
                    name: "Geographic",
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
        },
        {
            questions: [
                {
                    name: "History",
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
        },
        {
            questions: [
                {
                    name: "English",
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
        },
        {
            questions: [
                {
                    name: "Physic",
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
        },

    ];


    return (
        <>
            <Box mt={4} mx={2}>
                <Header />

                <Grid container
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    mb={9}
                    p={2}
                >

                    {Decks.map((flashcard, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                            <DeckCard flashcard={flashcard} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    );
}

export default DeckComponent