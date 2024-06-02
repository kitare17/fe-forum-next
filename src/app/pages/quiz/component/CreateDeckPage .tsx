import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { Button, TextField, Typography } from '@mui/material';

const CreateDeckPage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        regionType: '',
        deckOwner: '60b725f10c9b1b3c4d6c7f9e', // Assuming this is a default deck owner ID
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        router.push('/');
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Create a New Deck
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    name="name"
                    label="Deck Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <TextField
                    name="regionType"
                    label="Region Type"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.regionType}
                    onChange={handleChange}
                    required
                />
                <Button type="submit" variant="contained" color="primary">
                    Create Deck
                </Button>
            </form>
        </div>
    );
};

export default CreateDeckPage;
