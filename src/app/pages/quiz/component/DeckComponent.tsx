
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDecks } from "@/app/store/action/quiz";
import { RootState } from "@/app/store";

import DeckCard from './DeckCard';
import Header from './Header';
import Link from "next/link";

import { Grid, Box } from '@mui/material';
import { useRouter } from "next/navigation";

const DeckComponent = () => {
    const router = useRouter();
    const dipatch = useDispatch();

    const { listDeck, isLoading, isError } = useSelector((state: RootState) => state.quiz);

    console.log(listDeck)
    useEffect(() => {
        // @ts-ignore
        dipatch(getDecks());
    }, [])

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

                    {listDeck.map((deck, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                            <Link href={`/pages/quiz/flashCardList/${deck._id}`}><DeckCard deck={deck} /></Link>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    );
}

export default DeckComponent