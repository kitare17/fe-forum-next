import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';
import { Answer, QuestionResponse } from "@/app/interface/Quizz";

interface Props {
    question?: QuestionResponse
    showAnswer: boolean;
    setShowAnswer: React.Dispatch<React.SetStateAction<boolean>>;
}

const FlashCard: React.FC<Props> = ({ question, showAnswer, setShowAnswer }) => {
    const handleToggle = () => {
        setShowAnswer(!showAnswer);
    };

    //
    const correctAnswers: any = question?.answers.filter(answer => answer.isAnswer);

    return (
        <>
            {question ? (
                <>
                    <Card
                        variant="outlined"
                        onClick={handleToggle}
                        style={{ cursor: 'pointer', width: '100%', maxWidth: '1000px', margin: '0 auto' }}
                    >
                        <CardContent style={{ height: '300px', width: '700px' }}>
                            {showAnswer ? (
                                <Typography
                                    variant="h5"
                                    component="h3"
                                    gutterBottom
                                    sx={{
                                        display: 'flex',
                                        height: '100%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    {/* Display all correct answers inline */}
                                    {correctAnswers && correctAnswers.length > 0 ? (
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            {correctAnswers.map((answer: any, index: any) => (
                                                <p key={index}>
                                                    {answer.answerName}
                                                </p>
                                            ))}
                                        </div>
                                    ) : (
                                        <Typography variant="body1">No correct answers provided</Typography>
                                    )}
                                </Typography>
                            ) : (
                                <>
                                    <Typography variant="h5" gutterBottom component="h3">
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
                                </>
                            )}
                        </CardContent>
                    </Card>
                </>
            ) : (
                <Typography variant="body1">No question available</Typography>
            )}
        </>
    );
};

export default FlashCard;
