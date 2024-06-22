import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { showAllQuizzes } from "@/app/store/action/quiz";
import { submitTest } from "@/app/store/action/test";


import { FlashCardInterface, TestInterfaceRequest } from '@/app/interface/Quizz';

import {
    Container,
    Card,
    CardContent,
    Typography,
    Radio,
    RadioGroup,
    FormControlLabel,
    Checkbox,
    Button,
    Grid,
    TextField,
    Switch,
    FormControl,
    FormLabel,
    FormGroup,
    styled
} from '@mui/material';


interface Settings {
    answerType: 'radio' | 'multiple';
    numberOfQuestions: number;
    randomizeQuestions: boolean;
}

const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
    display: 'none',
}));

const SettingsComponent: React.FC<{ onStart: (settings: Settings) => void }> = ({ onStart }) => {
    const [answerType, setAnswerType] = useState<'radio' | 'multiple'>('radio');
    const [numberOfQuestions, setNumberOfQuestions] = useState(3);
    const [randomizeQuestions, setRandomizeQuestions] = useState(false);

    const handleStart = () => {
        onStart({ answerType, numberOfQuestions, randomizeQuestions });
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom sx={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                Test exam setting
            </Typography>
            <Card>
                <CardContent>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Chọn thể loại câu trả lời</FormLabel>
                        <RadioGroup
                            name="answerType"
                            value={answerType}
                            onChange={(e) => setAnswerType(e.target.value as 'radio' | 'multiple')}
                        >
                            <FormControlLabel value="radio" control={<Radio />} label="Radio" />
                            <FormControlLabel value="multiple" control={<Radio />} label="Multiple Choice" />
                        </RadioGroup>
                    </FormControl>
                    <TextField
                        label="Số lượng câu hỏi"
                        type="number"
                        value={numberOfQuestions}
                        onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
                        fullWidth
                        margin="normal"
                    />
                    <FormGroup>
                        <FormControlLabel
                            control={<Switch checked={randomizeQuestions} onChange={(e) => setRandomizeQuestions(e.target.checked)} />}
                            label="Ngẫu nhiên hoặc không"
                        />
                    </FormGroup>
                    <Button variant="contained" color="primary"
                        sx={{ marginBottom: '20px' }}
                        onClick={handleStart}>
                        Bắt đầu bài kiểm tra
                    </Button>
                </CardContent>
            </Card>
        </Container>
    );
};

const TestExam = (deckId: any) => {
    const dispatch = useDispatch();
    const [questions, setQuestions] = useState<FlashCardInterface[]>([]);
    const [answers, setAnswers] = useState<{ [key: string]: string[] }>({});
    const [submitted, setSubmitted] = useState(false);
    const [settings, setSettings] = useState<Settings | null>(null);
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [duration, setDuration] = useState<number>(0);

    const { listFlashCard, isLoading, isError } = useSelector((state: RootState) => state.quiz);

    const getListFlashCardByDeckId = (listFlashCard: FlashCardInterface[], deckId: string): FlashCardInterface[] => {
        return listFlashCard.filter((flashCard) => flashCard.deck._id === deckId);
    };

    const filteredList = getListFlashCardByDeckId(listFlashCard, deckId.deckId);

    useEffect(() => {
        dispatch(showAllQuizzes());
        if (settings) {
            let selectedQuestions = filteredList.slice(0, settings.numberOfQuestions);
            if (settings.randomizeQuestions) {
                selectedQuestions = selectedQuestions.sort(() => Math.random() - 0.5);
            }
            setQuestions(selectedQuestions);
            setStartTime(new Date());
        }
    }, [settings]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (startTime && !submitted) {
            timer = setInterval(() => {
                const now = new Date();
                const diff = now.getTime() - startTime.getTime();
                setDuration(Math.floor(diff / 1000)); // duration in seconds
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [startTime, submitted]);

    const handleAnswerChange = (questionId: string, answer: string) => {
        setAnswers(prevAnswers => {
            const currentAnswers = prevAnswers[questionId] || [];
            if (settings?.answerType === 'multiple') {
                if (currentAnswers.includes(answer)) {
                    return {
                        ...prevAnswers,
                        [questionId]: currentAnswers.filter(ans => ans !== answer),
                    };
                } else {
                    return {
                        ...prevAnswers,
                        [questionId]: [...currentAnswers, answer],
                    };
                }
            } else {
                return {
                    ...prevAnswers,
                    [questionId]: [answer],
                };
            }
        });
    };


    const handleSubmit = async () => {
        console.log("question", questions);
        console.log('answers', answers);

        const numberCorrectAnswer = questions.reduce((count, question) => {
            const selectedAnswers = answers[question._id] || [];
            const correctAnswers = question.answers
                .filter(answer => answer.isAnswer)
                .map(answer => answer.answerName);

            const isCorrect = settings?.answerType === 'multiple'
                ? selectedAnswers.length === correctAnswers.length && selectedAnswers.every(answer => correctAnswers.includes(answer))
                : selectedAnswers.length === 1 && correctAnswers.includes(selectedAnswers[0]);

            return isCorrect ? count + 1 : count;
        }, 0);

        const totalQuestionTest = questions.length;
        const score = (numberCorrectAnswer / totalQuestionTest) * 100;
        const durationInMinutes = Math.floor(duration / 60);

        const testResult: TestInterfaceRequest = {
            testOwner: '60b725f10c9b1b3c4d6c7f9e', // replace with actual user ID
            deckId: deckId.deckId,
            score,
            numberCorrectAnswer,
            totalQuestionTest,
            durationInMinutes,
        };

        console.log("score", score);
        console.log("numberCorrectAnswer", numberCorrectAnswer);
        console.log("totalQuestionTest", totalQuestionTest);

        try {
            await dispatch(submitTest(testResult));
            setSubmitted(true);
        } catch (error) {
            console.error('Error saving test result:', error);
        }

    };


    const renderAnswerCard = (question: FlashCardInterface, selectedAnswers: string[]) => {
        const isCorrect = selectedAnswers.length === 1 && question.correctAnswer === selectedAnswers[0];
        return (
            <Card
                variant="outlined"
                style={{
                    border: isCorrect ? '2px solid green' : '2px solid red',
                    marginBottom: '8px',
                }}
            >
                <CardContent>
                    <Typography variant="h6">Selected Answer(s): {selectedAnswers.join(', ')}</Typography>
                    <Typography variant="body1">Correct Answer: {question.correctAnswer}</Typography>
                </CardContent>
            </Card>
        );
    };

    if (!settings) {
        return <SettingsComponent onStart={setSettings} />;
    }

    if (submitted) {
        return (
            <Container>
                <Typography variant="h4" gutterBottom>
                    Test Submitted
                </Typography>
                <Typography variant="body1">
                    Thank you for completing the test.
                </Typography>
                <Typography variant="h6">
                    Total Duration: {Math.floor(duration / 60)} minutes and {duration % 60} seconds
                </Typography>
                {/* <Typography variant="h6">
                    Score: {score}%
                </Typography>
                <Typography variant="h6">
                    Correct Answers: {numberCorrectAnswer}/{totalQuestionTest}
                </Typography> */}
            </Container>
        );
    }

    return (
        <Container sx={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Kiểm tra
            </Typography>
            <Typography variant="h6">
                Duration: {Math.floor(duration / 60)} minutes and {duration % 60} seconds
            </Typography>
            {questions.map((question, index) => (
                <Card key={question._id} style={{ marginBottom: '16px' }}>
                    <CardContent>
                        <Typography variant="h6">{`Q${index + 1}: ${question.name}`}</Typography>
                        <Grid container spacing={2}>
                            {question.answers.map((answer, i) => (
                                <Grid item xs={12} sm={6} key={i}>
                                    <Card
                                        variant="outlined"
                                        style={{
                                            backgroundColor: settings.answerType === 'multiple' && (answers[question._id] || []).includes(answer.answerName)
                                                ? '#e0f7fa'
                                                : answers[question._id]?.[0] === answer.answerName
                                                    ? '#e0f7fa'
                                                    : 'white',
                                        }}
                                        onClick={() => handleAnswerChange(question._id, answer.answerName)}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginBottom: '17px',
                                            padding: '20px'
                                        }}
                                    >
                                        <CardContent>
                                            <FormControlLabel
                                                control={settings.answerType === 'multiple'
                                                    ? <CustomCheckbox checked={(answers[question._id] || []).includes(answer.answerName)} onChange={() => handleAnswerChange(question._id, answer.answerName)} />
                                                    : <Radio style={{ display: 'none' }} />}
                                                label={answer.answerName}
                                                value={answer.answerName}
                                                style={{ width: '100%' }}
                                            />
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                </Card>
            ))}
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={Object.keys(answers).length !== questions.length}
            >
                Nộp bài kiểm tra
            </Button>
        </Container>
    );
};

export default TestExam;
