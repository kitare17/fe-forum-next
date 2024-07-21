import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Button, TextField, Typography, Grid, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio } from '@mui/material';
import { createDeck } from "@/app/store/action/quiz";
import { DeckInterface } from "@/app/interface/Quizz";
import { AppDispatch, RootState } from '@/app/store';

const CreateDeckPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { user } = useSelector((state: RootState) => state.auth);

    const userEmailId = user?.userEmailId ?? "";
    const [formData, setFormData] = useState<DeckInterface>({
        name: '',
        regionType: '',
        deckOwner: userEmailId,
    });
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await dispatch(createDeck(formData)).unwrap();
            router.replace('/pages/quiz');
        } catch (error) {
            console.error('Error creating deck:', error);
        }
    };

    return (
        <div>
            <Grid container justifyContent="center" direction="column" alignItems="center" spacing={2} mt={4} mb={9}>
                <Typography variant="h4" gutterBottom>
                    Tạo chủ đề
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        name="name"
                        label="tên chủ đề"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <FormControl component="fieldset" fullWidth margin="normal" required>
                        <FormLabel component="legend">Riêng tư hoặc công khai</FormLabel>
                        <RadioGroup
                            name="regionType"
                            value={formData.regionType}
                            onChange={handleChange}
                        >
                            <FormControlLabel
                                value='private'
                                control={<Radio />}
                                label="Riêng tư"
                            />
                            <FormControlLabel
                                value='public'
                                control={<Radio />}
                                label="công khai"
                            />
                        </RadioGroup>
                    </FormControl>
                    <Button type="submit" variant="contained" color="primary">
                        Tạo chủ đề
                    </Button>
                </form>
            </Grid>
        </div>
    );
};

export default CreateDeckPage;
