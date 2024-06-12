import React, { useState, useEffect } from 'react';
import {
    Container,
    Card,
    CardContent,
    Typography,
    Radio,
    RadioGroup,
    FormControlLabel,
    Button,
    Grid,
    TextField,
    Switch,
    FormControl,
    FormLabel,
    FormGroup,
} from '@mui/material';

interface Question {
    _id: string;
    text: string;
    options: string[];
    correctAnswer: string;
}

interface Settings {
    answerType: 'radio' | 'multiple';
    numberOfQuestions: number;
    randomizeQuestions: boolean;
}

const SettingsComponent: React.FC<{ onStart: (settings: Settings) => void }> = ({ onStart }) => {
    const [answerType, setAnswerType] = useState<'radio' | 'multiple'>('radio');
    const [numberOfQuestions, setNumberOfQuestions] = useState(3);
    const [randomizeQuestions, setRandomizeQuestions] = useState(false);

    const handleStart = () => {
        onStart({ answerType, numberOfQuestions, randomizeQuestions });
    };

    return (
        <Container >
            <Typography variant="h4" gutterBottom sx={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                Test exam setting
            </Typography>
            <Card>
                <CardContent>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Choose Answer Type</FormLabel>
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
                        label="Number of Questions"
                        type="number"
                        value={numberOfQuestions}
                        onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
                        fullWidth
                        margin="normal"
                    />
                    <FormGroup>
                        <FormControlLabel
                            control={<Switch checked={randomizeQuestions} onChange={(e) => setRandomizeQuestions(e.target.checked)} />}
                            label="Randomize Questions"
                        />
                    </FormGroup>
                    <Button variant="contained" color="primary"
                        sx={{ marginBottom: '20px' }}

                        onClick={handleStart} >
                        Start Test
                    </Button>
                </CardContent>
            </Card>
        </Container>
    );
};

const TestExam: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const [submitted, setSubmitted] = useState(false);
    const [settings, setSettings] = useState<Settings | null>(null);

    useEffect(() => {
        // Mock data
        const mockQuestions: Question[] = [
            {
                _id: '1',
                text: 'What is the capital of France?',
                options: ['Paris', 'London', 'Berlin', 'Madrid'],
                correctAnswer: 'Paris',
            },
            {
                _id: '2',
                text: 'Which planet is known as the Red Planet?',
                options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
                correctAnswer: 'Mars',
            },
            {
                _id: '3',
                text: 'What is the largest ocean on Earth?',
                options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
                correctAnswer: 'Pacific Ocean',
            },
        ];

        if (settings) {
            let selectedQuestions = mockQuestions.slice(0, settings.numberOfQuestions);
            if (settings.randomizeQuestions) {
                selectedQuestions = selectedQuestions.sort(() => Math.random() - 0.5);
            }
            setQuestions(selectedQuestions);
        }
    }, [settings]);

    const handleAnswerChange = (questionId: string, answer: string) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: answer,
        }));
    };

    const handleSubmit = () => {
        setSubmitted(true);
    };

    const renderAnswerCard = (question: Question, selectedAnswer: string) => {
        const isCorrect = question.correctAnswer === selectedAnswer;
        return (
            <Card
                variant="outlined"
                style={{
                    border: isCorrect ? '2px solid green' : '2px solid red',
                    marginBottom: '8px',
                }}
            >
                <CardContent>
                    <Typography variant="h6">Selected Answer: {selectedAnswer}</Typography>
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
                {questions.map((question, index) => (
                    <Card key={question._id} style={{ marginBottom: '16px' }}>
                        <CardContent>
                            <Typography variant="h6">{`Q${index + 1}: ${question.text}`}</Typography>
                            <RadioGroup
                                name={`question-${question._id}`}
                                value={answers[question._id] || ''}
                                onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                            >
                                <Grid container spacing={2}>
                                    {question.options.map((option, i) => (
                                        <Grid item xs={12} sm={6} key={i}>
                                            <Card
                                                variant="outlined"
                                                style={{
                                                    backgroundColor: answers[question._id] === option ? '#e0f7fa' : 'white',
                                                    border: answers[question._id] === option ? (option === question.correctAnswer ? '2px solid green' : '2px solid red') : '',
                                                }}
                                                onClick={() => handleAnswerChange(question._id, option)}
                                            >
                                                <CardContent>
                                                    <FormControlLabel
                                                        value={option}
                                                        control={<Radio style={{ display: 'none' }} />}
                                                        label={option}
                                                        style={{ width: '100%' }}
                                                    />
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            </RadioGroup>
                            {renderAnswerCard(question, answers[question._id] || '')}
                        </CardContent>
                    </Card>
                ))}
            </Container>
        );
    }

    return (
        <Container sx={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Test Exam
            </Typography>
            {questions.map((question, index) => (
                <Card key={question._id} style={{ marginBottom: '16px' }}>
                    <CardContent>
                        <Typography variant="h6">{`Q${index + 1}: ${question.text}`}</Typography>
                        <RadioGroup
                            name={`question-${question._id}`}
                            value={answers[question._id] || ''}
                            onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                        >
                            <Grid container spacing={2}>
                                {question.options.map((option, i) => (
                                    <Grid item xs={12} sm={6} key={i}>
                                        <Card
                                            variant="outlined"
                                            style={{
                                                backgroundColor: answers[question._id] === option ? '#e0f7fa' : 'white',
                                            }}
                                            onClick={() => handleAnswerChange(question._id, option)}
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
                                                    value={option}
                                                    control={<Radio style={{ display: 'none' }} />}
                                                    label={option}
                                                    style={{ width: '100%' }}
                                                />
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </RadioGroup>
                    </CardContent>
                </Card>
            ))}
            <Button
                variant="contained"
                color="primary"

                onClick={handleSubmit}
                disabled={Object.keys(answers).length !== questions.length}
            >
                Submit Test
            </Button>
        </Container>
    );
};

export default TestExam;
