import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Box, TextField, Button, Grid, Typography, Checkbox, FormControlLabel, FormControl, RadioGroup, Radio, FormLabel } from "@mui/material";
import { useRouter } from "next/navigation";
import { QuizInterface } from "@/app/interface/Quizz";
import { createQuiz } from "@/app/store/action/quiz";

const QuizComponent = () => {
    const router = useRouter();
    const dispatch = useDispatch();
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
            deckName: "fdg",
            regionType: "",
            deckOwner: "60d0fe4f5311236168a109ca",
            deckId: ""
        },
    });

    const { fields: questionFields, append: appendQuestion } = useFieldArray({
        control,
        name: "questions",
    });

    const handleCreateQuiz = (data: QuizInterface) => {
        dispatch(createQuiz(data));
    };

    return (
        <div>
            <Grid container justifyContent="center" alignItems="center" spacing={2} mt={4} mb={9}>
                <Grid item xs={10}>
                    <Box onSubmit={handleSubmit(handleCreateQuiz)} component="form" noValidate autoComplete="off">
                        <Typography variant="h4" sx={{ textAlign: "center" }}>Tạo Flashcard mới</Typography>
                        <h4>Chủ đề</h4>

                        <TextField
                            id="deckName"
                            fullWidth
                            margin="normal"
                            label="Deck Name"
                            variant="outlined"
                            {...register("deckName")}
                        />
                        <FormControl component="fieldset" fullWidth margin="normal" required>
                            <FormLabel component="legend">Riêng tư hoặc công khai</FormLabel>
                            <RadioGroup
                                {...register("regionType", { required: "Phải chọn loại vùng" })}
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
                        </FormControl>
                        <h4>Tạo Câu Hỏi</h4>

                        {questionFields.map((question, questionIndex) => (
                            <Box key={question.id} mb={2}>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label={`Câu hỏi ${questionIndex + 1}`}
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
                                                        label={`trả lời ${answerIndex + 1}`}
                                                        variant="outlined"
                                                        {...register(`questions.${questionIndex}.answers.${answerIndex}.answerName`, { required: "Phải nhập câu trả lời" })}
                                                        error={!!errors.questions?.[questionIndex]?.answers?.[answerIndex]?.answerName}
                                                        helperText={errors.questions?.[questionIndex]?.answers?.[answerIndex]?.answerName?.message}
                                                    />
                                                    <FormControlLabel
                                                        control={<Checkbox {...register(`questions.${questionIndex}.answers.${answerIndex}.isAnswer`)} />}
                                                        label="Đáp án đúng"
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
