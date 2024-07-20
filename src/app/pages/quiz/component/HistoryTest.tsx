import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getResultTest } from '@/app/store/action/test';
import { AppDispatch, RootState } from '@/app/store';
import { ArrowBack } from '@mui/icons-material';
import {
    Grid, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper,
    CircularProgress, Typography, Button, TablePagination
} from '@mui/material';
import { useRouter } from 'next/navigation';

const HistoryTest = (deckId: any) => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { resultTest, isLoading, isError } = useSelector((state: RootState) => state.test);
    const { user } = useSelector((state: RootState) => state.auth);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const userEmailId = user?.userEmailId ?? "";
    useEffect(() => {
        dispatch(getResultTest({ id: userEmailId, deckId: deckId.deckId }));
    }, [dispatch]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    console.log("test", resultTest)

    return (
        <>

            <Box mt={4} mx={2}>
                <Grid container direction="row" alignItems="center" spacing={2} mb={9} p={2}>
                    <Button
                        onClick={() => router.push(`/pages/quiz`)}
                        size="small"
                        color="inherit"
                        variant="outlined"
                        sx={{ marginRight: '200px' }}
                    >
                        <ArrowBack />
                    </Button>
                    <Grid item xs={12}>
                        {isLoading && <CircularProgress />}
                        {resultTest && resultTest.length > 0 && (
                            <>
                                <Typography variant="h5" gutterBottom>
                                    Lịch sử Kiểm tra
                                </Typography>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Deck Name</TableCell>
                                                <TableCell>Score</TableCell>
                                                <TableCell>Number Correct Answers</TableCell>
                                                <TableCell>Total Questions</TableCell>
                                                <TableCell>Duration (Minutes)</TableCell>
                                                <TableCell>Created At</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {resultTest.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((test: any) => (
                                                <TableRow key={test._id}>
                                                    <TableCell>{test.deckId?.name || 'Unknown'}</TableCell>
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
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    component="div"
                                    count={resultTest.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
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
