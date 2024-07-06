import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Answer, QuestionResponse } from "@/app/interface/Quizz";

interface Props {
    question: QuestionResponse;
    onEdit: (questionId: string) => void;
    onDelete: (questionId: string) => void;
}

const ListCard: React.FC<Props> = ({ question, onEdit, onDelete }) => {
    const correctAnswers: any = question?.answers.filter(answer => answer.isAnswer);

    return (
        <Card variant="outlined" sx={{ position: 'relative', width: '1000px', height: '350px' }}>
            <IconButton
                onClick={() => onEdit(question._id)}
                sx={{
                    position: 'absolute',
                    right: 48,
                }}
                size="small"
                color="primary"
            >
                <EditIcon />
            </IconButton>
            <IconButton
                onClick={() => onDelete(question._id)}
                sx={{
                    position: 'absolute',
                    right: 8,
                }}
                size="small"
                color="secondary"
            >
                <DeleteIcon />
            </IconButton>
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: '100%',
                }}
            >
                <Box sx={{ width: '50%' }}>
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
                </Box>
                <Box
                    sx={{
                        backgroundColor: '#e6e6e6',
                        borderRadius: '4px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '90%',
                        width: '50%',
                    }}
                >
                    {correctAnswers && correctAnswers.length > 0 ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            {correctAnswers.map((answer: any, index: any) => (
                                <Typography key={index}>
                                    {answer.answerName}
                                </Typography>
                            ))}
                        </Box>
                    ) : (
                        <Typography variant="body1">No correct answers provided</Typography>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default ListCard;
