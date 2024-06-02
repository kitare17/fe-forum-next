"use client";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Box, TextField, Button, Grid, Typography, Checkbox, FormControlLabel } from "@mui/material";
import { useRouter } from "next/navigation";
import { QuizInterface } from "@/app/interface/Quizz";

const QuizComponent = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        control,
        getValues,
        formState: { errors },
    } = useForm<QuizInterface>({
        defaultValues: {
            questions: [
                { name: "", answers: [{ answerName: "", isAnswer: false }, { answerName: "", isAnswer: false }, { answerName: "", isAnswer: false }, { answerName: "", isAnswer: false }] }
            ],
            deckId: "",
            deckName: "",
            regionType: "",
            deckOwner: "",
        },
    });

    const { fields: questionFields, append: appendQuestion } = useFieldArray({
        control,
        name: "questions",
    });

    const handleCreateQuiz = () => {
        const newQuiz = {
            questions: getValues("questions"),
            deckId: getValues("deckId"),
            deckName: getValues("deckName"),
            regionType: getValues("regionType"),
            deckOwner: getValues("deckOwner"),
        };
        console.log(newQuiz);
        // Dispatch createQuiz action or handle API call here
        router.replace("/");
    };

    return (
        <div>
            <Grid container justifyContent="center" alignItems="center" spacing={2} mt={4} mb={9}>
                <Grid item xs={10}>
                    <Box onSubmit={handleSubmit(handleCreateQuiz)} component="form" noValidate autoComplete="off">
                        <Typography variant="h4" sx={{ textAlign: "center" }}>Tạo Flashcard mới</Typography>
                        <h4>Chủ đề</h4>
                        <TextField
                            id="deckId"
                            fullWidth
                            margin="normal"
                            required
                            label="Deck ID"
                            variant="outlined"
                            {...register("deckId", { required: "Phải nhập Deck ID" })}
                            error={!!errors.deckId}
                            helperText={errors.deckId?.message}
                        />
                        <TextField
                            id="deckName"
                            fullWidth
                            margin="normal"
                            label="Deck Name"
                            variant="outlined"
                            {...register("deckName")}
                        />
                        <TextField
                            id="regionType"
                            fullWidth
                            margin="normal"
                            label="Region Type"
                            variant="outlined"
                            {...register("regionType")}
                        />
                        <h4>Tạo Câu Hỏi</h4>

                        {questionFields.map((question, questionIndex) => (
                            <Box key={question.id} mb={2}>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label={`Question ${questionIndex + 1}`}
                                    variant="outlined"
                                    {...register(`questions.${questionIndex}.name`, { required: "Phải nhập câu hỏi" })}
                                    error={!!errors.questions?.[questionIndex]?.name}
                                    helperText={errors.questions?.[questionIndex]?.name?.message}
                                />

                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Box display="flex" flexWrap="wrap" gap={2}>
                                            {question.answers.map((answer, answerIndex) => (
                                                <Box key={answerIndex} flex="1 1 calc(50% - 10px)">
                                                    <TextField
                                                        fullWidth
                                                        margin="normal"
                                                        label={`Answer ${answerIndex + 1}`}
                                                        variant="outlined"
                                                        {...register(`questions.${questionIndex}.answers.${answerIndex}.answerName`, { required: "Phải nhập câu trả lời" })}
                                                        error={!!errors.questions?.[questionIndex]?.answers?.[answerIndex]?.answerName}
                                                        helperText={errors.questions?.[questionIndex]?.answers?.[answerIndex]?.answerName?.message}
                                                    />
                                                    <FormControlLabel
                                                        control={<Checkbox {...register(`questions.${questionIndex}.answers.${answerIndex}.isAnswer`)} />}
                                                        label="Is Correct Answer"
                                                    />
                                                </Box>
                                            ))}
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        ))}

                        <Button
                            onClick={() => appendQuestion({
                                name: "",
                                answers: [
                                    { answerName: "", isAnswer: false },
                                    { answerName: "", isAnswer: false },
                                    { answerName: "", isAnswer: false },
                                    { answerName: "", isAnswer: false }
                                ]
                            })}
                            variant="contained"
                        >
                            Thêm câu hỏi
                        </Button>
                        <Button type="submit" variant="contained" sx={{ marginLeft: '10px' }}>
                            Tạo
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};

export default QuizComponent;
