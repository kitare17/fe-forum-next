import React, { useState, useEffect, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { Box, TextField, Button, Grid, Typography, Checkbox, FormControlLabel, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { QuestionResponse } from "@/app/interface/Quizz";
import { editQuestion, getQuestion } from "@/app/store/action/quiz";
import { AppDispatch } from "@/app/store";

const initialAnswer = [
    { answerName: "", isAnswer: false },
    { answerName: "", isAnswer: false },
    { answerName: "", isAnswer: false },
    { answerName: "", isAnswer: false },
];

const initialFormData: QuestionResponse = {
    _id: "",
    name: "",
    answers: initialAnswer,
    deck: "",
    createdAt: "",
    updatedAt: "",
    __v: 0,
};

const EditQuizComponent = (questionId: any) => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const [formData, setFormData] = useState<QuestionResponse>(initialFormData);
    const [errors, setErrors] = useState<any>({});

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const resultAction = await dispatch(getQuestion(questionId.questionId));
                if (getQuestion.fulfilled.match(resultAction)) {
                    const question = resultAction.payload;
                    setFormData(question);
                } else {
                    console.error('Failed to fetch question:', resultAction.error);
                }
            } catch (error) {
                console.error('Error fetching question:', error);
            }
        };

        fetchQuestion();
    }, [questionId, dispatch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAnswerChange = (answerIndex: number, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        // Check if it's a checkbox input
        if (type === 'checkbox') {
            const isChecked = (e.target as HTMLInputElement).checked; // Type assertion here
            const updatedAnswers = [...formData.answers];
            updatedAnswers[answerIndex] = {
                ...updatedAnswers[answerIndex],
                [name]: isChecked,
            };
            setFormData({ ...formData, answers: updatedAnswers });
        } else {
            const updatedAnswers = [...formData.answers];
            updatedAnswers[answerIndex] = {
                ...updatedAnswers[answerIndex],
                [name]: value,
            };
            setFormData({ ...formData, answers: updatedAnswers });
        }
    };

    const validate = () => {
        const newErrors: any = {};
        if (!formData.name) {
            newErrors.name = "Phải nhập câu hỏi";
        }
        formData.answers.forEach((answer, aIndex) => {
            if (!answer.answerName) {
                newErrors[`answers.${aIndex}.answerName`] = "Phải nhập câu trả lời";
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            try {
                console.log("ID ne ", formData._id);

                console.log("Data ne ", formData);
                await dispatch(editQuestion({ id: formData._id, newQuestion: formData }));
                router.replace('/pages/quiz');
            } catch (error) {
                console.error('Error editing quiz:', error);
            }
        }
    };

    if (!formData._id) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Grid container justifyContent="center" direction="column" alignItems="center" spacing={2} mt={4} mb={9}>
                <Typography variant="h4" gutterBottom>
                    Sửa Flashcard
                </Typography>
                <Box onSubmit={handleSubmit} component="form" noValidate autoComplete="off">
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Câu hỏi"
                        variant="outlined"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                    />
                    <Grid container spacing={2}>
                        {formData.answers.map((answer, answerIndex) => (
                            <Grid item xs={6} key={answerIndex}>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label={`Trả lời ${answerIndex + 1}`}
                                    variant="outlined"
                                    name="answerName"
                                    value={answer.answerName}
                                    onChange={(e) => handleAnswerChange(answerIndex, e)}
                                    error={!!errors[`answers.${answerIndex}.answerName`]}
                                    helperText={errors[`answers.${answerIndex}.answerName`]}
                                />
                                <FormControlLabel
                                    control={<Checkbox name="isAnswer" checked={answer.isAnswer} onChange={(e) => handleAnswerChange(answerIndex, e)} />}
                                    label="Đáp án đúng"
                                />
                            </Grid>
                        ))}
                    </Grid>
                    <Button type="submit" variant="contained" sx={{ marginTop: '20px' }}>
                        Sửa
                    </Button>
                </Box>
            </Grid>
        </Container>
    );
};

export default EditQuizComponent;
