import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Button, TextField, Typography, Grid, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio } from '@mui/material';
import { createDeck } from "@/app/store/action/quiz";
import { DeckInterface } from "@/app/interface/Quizz";

const CreateDeckPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [formData, setFormData] = useState<DeckInterface>({
        name: '',
        regionType: '',
        deckOwner: '60b725f10c9b1b3c4d6c7f9e',
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            dispatch(createDeck(formData));
            router.replace('/');
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
