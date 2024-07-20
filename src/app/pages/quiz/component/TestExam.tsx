import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { showAllQuizzes } from "@/app/store/action/quiz";
import { submitTest } from "@/app/store/action/test";
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from "next/navigation";
import { FlashCardInterface, QuestionResponse, TestInterfaceRequest } from '@/app/interface/Quizz';

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
    const [numberOfQuestions, setNumberOfQuestions] = useState(1);
    const [randomizeQuestions, setRandomizeQuestions] = useState(false);
    const router = useRouter();
    const handleStart = () => {
        onStart({ answerType, numberOfQuestions, randomizeQuestions });
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom sx={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                Test exam setting
            </Typography>
            <Button
                onClick={() => router.push(`/pages/quiz`)}
                size="small"
                color="inherit"
                variant="outlined"
                sx={{ marginBottom: '40px' }}
            >
                <ArrowBack />
            </Button>
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
    const dispatch = useDispatch<AppDispatch>();
    const [questions, setQuestions] = useState<QuestionResponse[]>([]);
    const [answers, setAnswers] = useState<{ [key: string]: string[] }>({});
    const [submitted, setSubmitted] = useState(false);
    const [settings, setSettings] = useState<Settings | null>(null);
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [duration, setDuration] = useState<number>(0);

    const { listFlashCard, isLoading, isError } = useSelector((state: RootState) => state.quiz);
    const { user } = useSelector((state: RootState) => state.auth);
    const userEmailId = user?.userEmailId ?? "";
    const getListFlashCardByDeckId = (listFlashCard: QuestionResponse[], deckId: string): QuestionResponse[] => {
        return listFlashCard.filter((flashCard) => flashCard.deck === deckId);
    };

    useEffect(() => {
        dispatch(showAllQuizzes());
    }, [dispatch]);

    useEffect(() => {
        if (settings) {
            const filteredList = getListFlashCardByDeckId(listFlashCard, deckId.deckId);

            let selectedQuestions = filteredList;

            if (settings.answerType === 'radio') {
                selectedQuestions = selectedQuestions.filter((question) => {
                    const trueAnswersCount = question.answers.filter(answer => answer.isAnswer === true).length;
                    return trueAnswersCount === 1;
                });
            }

            if (settings.randomizeQuestions) {
                selectedQuestions = shuffleArray(selectedQuestions);
            }

            selectedQuestions = selectedQuestions.slice(0, settings.numberOfQuestions);

            console.log("Selected Questions after randomization and slicing:", selectedQuestions);

            setQuestions(selectedQuestions);
            setStartTime(new Date());
        }
    }, [settings, listFlashCard, deckId]);

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

    const shuffleArray = (array: any[]) => {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex !== 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    };

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
        console.log("Questions:", questions);
        console.log('Answers:', answers);

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
            testOwner: userEmailId,
            deckId: deckId.deckId,
            score,
            numberCorrectAnswer,
            totalQuestionTest,
            durationInMinutes,
        };

        console.log("Score:", score);
        console.log("Number of correct answers:", numberCorrectAnswer);
        console.log("Total number of questions:", totalQuestionTest);

        try {
            await dispatch(submitTest(testResult));
            setSubmitted(true);
        } catch (error) {
            console.error('Error saving test result:', error);
        }
    };

    const getAnswerStyle = (questionId: string, answer: string) => {
        if (!submitted) return {};
        const question = questions.find(q => q._id === questionId);
        const correctAnswers = question?.answers.filter(ans => ans.isAnswer).map(ans => ans.answerName) || [];
        const isSelected = (answers[questionId] || []).includes(answer);
        const isCorrect = correctAnswers.includes(answer);

        if (isSelected && isCorrect) {
            return { border: '2px solid green' };
        } else if (isSelected && !isCorrect) {
            return { border: '2px solid red' };
        } else if (!isSelected && isCorrect) {
            return { border: '2px solid green' };
        } else {
            return {};
        }
    };

    if (!settings) {
        return <SettingsComponent onStart={setSettings} />;
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
                        <Typography variant="h6">{`Question ${index + 1}: ${question.name}`}</Typography>
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
                                            ...getAnswerStyle(question._id, answer.answerName)
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
