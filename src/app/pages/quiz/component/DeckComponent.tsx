import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDecks, deleteDeck } from "@/app/store/action/quiz"; // Import your actions
import { RootState } from "@/app/store";
import DeckCard from './DeckCard';
import Header from './Header';
import Link from "next/link";
import { Grid, Button, Box, IconButton, Card } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; // Import the delete icon

const DeckComponent = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth);
    const { listDeck, isLoading, isError } = useSelector((state: RootState) => state.quiz);
    const [regionType, setRegionType] = useState('public');
    const userEmailId = user?.userEmailId ?? "";

    useEffect(() => {
        const params: { regionType: string; deckOwner?: string } = { regionType };
        if (regionType === 'private') {
            params.deckOwner = userEmailId;
        }    // @ts-ignore
        dispatch(getDecks(params));
    }, [regionType, userEmailId, dispatch]);

    const handleRegionChange = (type: string) => {
        setRegionType(type);
    };

    const handleDelete = (deckId: string | undefined) => {
        if (deckId) {
            // @ts-ignore
            dispatch(deleteDeck(deckId));
        }
    };
    return (
        <>
            <Box mt={4} mx={2}>
                <Box sx={{ display: 'flex' }}>
                    <Button
                        onClick={() => handleRegionChange('public')}
                        size="small"
                        color="inherit"
                        variant="outlined"
                        sx={{
                            marginRight: '10px',
                            backgroundColor: regionType === 'public' ? '#d3d3d3' : 'transparent',
                            color: regionType === 'public' ? 'black' : 'inherit',
                        }}
                    >
                        Public
                    </Button>
                    <Button
                        onClick={() => handleRegionChange('private')}
                        size="small"
                        color="inherit"
                        variant="outlined"
                        sx={{
                            marginRight: '10px',
                            backgroundColor: regionType === 'private' ? '#d3d3d3' : 'transparent',
                            color: regionType === 'private' ? 'black' : 'inherit',
                        }}
                    >
                        Private
                    </Button>
                </Box>
                <Header deckId={{ deckId: "" }} questionsCount={0} />
                <Grid container
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    mb={9}
                    p={2}
                >
                    {listDeck.map((deck) => (
                        <Grid item key={deck._id} xs={12} sm={6} md={4} lg={3}>
                            <Box>
                                <Card variant="outlined">
                                    <IconButton onClick={() => handleDelete(deck._id)} color="error" size="small">
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                    <Link href={`/pages/quiz/flashCardList/${deck._id}`}>
                                        <DeckCard deck={deck} />
                                    </Link>
                                </Card>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    );
}

export default DeckComponent;
