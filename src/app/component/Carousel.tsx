// src/components/CarouselComponent.tsx
'use client';

import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import Image from 'next/image';

type Item = {
    image: string;
};

type CarouselComponentProps = {
    items: Item[];
};

const CarouselComponent: React.FC<CarouselComponentProps> = ({ items }) => {
    return (
        <Carousel>
            {items.map((item, i) => (
                <Item key={i} item={item} />
            ))}
        </Carousel>
    );
}

const Item: React.FC<{ item: Item }> = ({ item }) => {
    return (
        <Paper>
            <Image
                src={item.image}
                alt={`Slide ${item.image}`}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }}
            />
        </Paper>
    );
}

export default CarouselComponent;
