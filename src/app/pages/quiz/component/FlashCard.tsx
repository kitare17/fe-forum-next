import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';
import { Question, Answer } from "@/app/interface/Quizz"; // Adjust as per your interface definitions

interface Props {
    question?: Question; // Specify the type of the flashcard prop as optional
    showAnswer: boolean; // State to manage the visibility of the answer
    setShowAnswer: React.Dispatch<React.SetStateAction<boolean>>; // Function to set the visibility of the answer
}

const FlashCard: React.FC<Props> = ({ question, showAnswer, setShowAnswer }) => {
    const handleToggle = () => {
        setShowAnswer(!showAnswer);
    };

    // Use optional chaining and nullish coalescing operator to handle optional properties safely
    const correctAnswers: Answer[] | undefined = question?.answers.filter(answer => answer.isAnswer);

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
                                            {correctAnswers.map((answer, index) => (
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
