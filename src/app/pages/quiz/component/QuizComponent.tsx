import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, TextField, Button, Grid, Typography, Checkbox, FormControlLabel, FormControl, RadioGroup, Radio, FormLabel, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { QuizInterface } from "@/app/interface/Quizz";
import { createQuiz } from "@/app/store/action/quiz";
import { AppDispatch } from "@/app/store";

const QuizComponent = (deckId: any) => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const initialQuestion = { name: "", answers: [{ answerName: "", isAnswer: false }, { answerName: "", isAnswer: false }, { answerName: "", isAnswer: false }, { answerName: "", isAnswer: false }] };
    const [formData, setFormData] = useState<QuizInterface>({
        questions: [initialQuestion],
        deckName: "",
        regionType: "",
        deckOwner: "60d0fe4f5311236168a109ca",
        deckId: deckId.deckId || ""
    });
    const [errors, setErrors] = useState<any>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleQuestionChange = (questionIndex: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement; // Type assertion
        const updatedQuestions = [...formData.questions];
        updatedQuestions[questionIndex] = { ...updatedQuestions[questionIndex], [name]: value };
        setFormData({ ...formData, questions: updatedQuestions });
    };


    const handleAnswerChange = (questionIndex: number, answerIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked, type } = e.target;
        const updatedQuestions = [...formData.questions];
        updatedQuestions[questionIndex].answers[answerIndex] = {
            ...updatedQuestions[questionIndex].answers[answerIndex],
            [name]: type === "checkbox" ? checked : value
        };
        setFormData({ ...formData, questions: updatedQuestions });
    };

    const handleAddQuestion = () => {
        setFormData({
            ...formData,
            questions: [...formData.questions, initialQuestion]
        });
    };

    const validate = () => {
        const newErrors: any = {};
        formData.questions.forEach((question, qIndex) => {
            if (!question.name) {
                newErrors[`questions.${qIndex}.name`] = "Phải nhập câu hỏi";
            }
            question.answers.forEach((answer, aIndex) => {
                if (!answer.answerName) {
                    newErrors[`questions.${qIndex}.answers.${aIndex}.answerName`] = "Phải nhập câu trả lời";
                }
            });
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            try {
                await dispatch(createQuiz(formData));
                router.replace('/pages/quiz');
            } catch (error) {
                console.error('Error creating quiz:', error);
            }
        }
    };

    return (
        <div>
            <Container>
                <Grid container justifyContent="center" direction="column" alignItems="center" spacing={2} mt={4} mb={9}>
                    <Typography variant="h4" gutterBottom>
                        Tạo Flashcard mới
                    </Typography>
                    <Box onSubmit={handleSubmit} component="form" noValidate autoComplete="off">
                        {!deckId.deckId &&
                            <>
                                <TextField
                                    id="deckName"
                                    fullWidth
                                    margin="normal"
                                    label="Deck Name"
                                    variant="outlined"
                                    name="deckName"
                                    value={formData.deckName}
                                    onChange={handleChange}
                                    error={!!errors.deckName}
                                    helperText={errors.deckName}
                                />
                                <FormControl component="fieldset" fullWidth margin="normal" required>
                                    <FormLabel component="legend">Riêng tư hoặc công khai</FormLabel>
                                    <RadioGroup
                                        name="regionType"
                                        value={formData.regionType}
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel
                                            value="private"
                                            control={<Radio />}
                                            label="Riêng tư"
                                        />
                                        <FormControlLabel
                                            value="public"
                                            control={<Radio />}
                                            label="Công khai"
                                        />
                                    </RadioGroup>
                                    {errors.regionType && <Typography color="error">{errors.regionType}</Typography>}
                                </FormControl>
                            </>
                        }

                        <Typography variant="h6" mt={2}>Tạo Câu Hỏi</Typography>
                        {formData.questions.map((question, questionIndex) => (
                            <Box key={questionIndex} mb={2}>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label={`Câu hỏi ${questionIndex + 1}`}
                                    variant="outlined"
                                    name="name"
                                    value={question.name}
                                    onChange={(e) => handleQuestionChange(questionIndex, e)}
                                    error={!!errors[`questions.${questionIndex}.name`]}
                                    helperText={errors[`questions.${questionIndex}.name`]}
                                />

                                <Grid container spacing={2}>
                                    {question.answers.map((answer, answerIndex) => (
                                        <Grid item xs={6} key={answerIndex}>
                                            <TextField
                                                fullWidth
                                                margin="normal"
                                                label={`Trả lời ${answerIndex + 1}`}
                                                variant="outlined"
                                                name="answerName"
                                                value={answer.answerName}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAnswerChange(questionIndex, answerIndex, e)}

                                                error={!!errors[`questions.${questionIndex}.answers.${answerIndex}.answerName`]}
                                                helperText={errors[`questions.${questionIndex}.answers.${answerIndex}.answerName`]}
                                            />
                                            <FormControlLabel
                                                control={<Checkbox name="isAnswer" checked={answer.isAnswer} onChange={(e) => handleAnswerChange(questionIndex, answerIndex, e)} />}
                                                label="Đáp án đúng"
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        ))}

                        <Button onClick={handleAddQuestion} variant="contained">
                            Thêm câu hỏi
                        </Button>
                        <Button type="submit" variant="contained" sx={{ marginLeft: '10px' }}>
                            Tạo
                        </Button>
                    </Box>
                </Grid>
            </Container>
        </div>
    );
};

export default QuizComponent;
