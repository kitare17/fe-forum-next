import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getResultTest } from '@/app/store/action/test';
import { RootState } from '@/app/store';

import { Grid, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, CircularProgress, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

const HistoryTest = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const { resultTest, isLoading, isError } = useSelector((state: RootState) => state.test);


    useEffect(() => {
        dispatch(getResultTest({ id: '60b725f10c9b1b3c4d6c7f9e' }));
    }, []);

    return (
        <>
            <Box mt={4} mx={2}>
                <Grid container direction="row" alignItems="center" spacing={2} mb={9} p={2}>

                    <Grid item xs={12}>
                        {isLoading && <CircularProgress />}
                        {isError && <p>Error: {isError}</p>}
                        {resultTest && resultTest.length > 0 && (
                            <>
                                <Typography variant="h5" gutterBottom>
                                    Lịch sử Kiểm tra
                                </Typography>
                                <TableContainer component={Paper}>
                                    <Table>

                                        <TableHead>
                                            <TableRow>
                                                <TableCell>ID</TableCell>
                                                <TableCell>Deck ID</TableCell>
                                                <TableCell>Score</TableCell>
                                                <TableCell>Number Correct Answers</TableCell>
                                                <TableCell>Total Questions</TableCell>
                                                <TableCell>Duration (Minutes)</TableCell>
                                                <TableCell>Created At</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {resultTest.map((test) => (
                                                <TableRow key={test._id}>
                                                    <TableCell>{test._id}</TableCell>
                                                    <TableCell>{test.deckId.name}</TableCell>
                                                    <TableCell>{test.score}</TableCell>
                                                    <TableCell>{test.numberCorrectAnswer}</TableCell>
                                                    <TableCell>{test.totalQuestionTest}</TableCell>
                                                    <TableCell>{test.durationInMinutes}</TableCell>
                                                    <TableCell>{new Date(test.createdAt).toLocaleString()}</TableCell>

                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </>

                        )}
                        {!isLoading && resultTest && resultTest.length === 0 && <p>No test results found.</p>}
                    </Grid>

                </Grid>
            </Box>
        </>
    );
};

export default HistoryTest;
