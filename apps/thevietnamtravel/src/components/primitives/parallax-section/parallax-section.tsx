import { Box, Container, Overlay } from '@mantine/core';
import { ReactNode } from 'react';
import classes from './parallax-section.module.scss';

interface ParallaxSectionProps {
    backgroundImage: string;
    children: ReactNode;
    overlayOpacity?: number;
    overlayColor?: string;
    minHeight?: string | number;
    py?: string | number;
    mt?: string | number;
    mb?: string | number;
}

export default function ParallaxSection({
    backgroundImage,
    children,
    overlayOpacity = 0.5,
    overlayColor = '#000',
    minHeight = '50vh',
    py = '3rem',
    mt = '0',
    mb = '0'
}: ParallaxSectionProps) {
    return (
        <Box
            className={classes.parallaxWrapper}
            style={{
                '--bg-image': `url(${backgroundImage})`,
                minHeight: minHeight,
                marginTop: mt,
                marginBottom: mb
            } as React.CSSProperties}
        >
            {/* Lớp phủ để làm nổi bật nội dung */}
            <Overlay
                color={overlayColor}
                opacity={overlayOpacity}
                zIndex={1}
            />

            {/* Nội dung bên trong */}
            <Container size="xl" className={classes.content} py={py}>
                {children}
            </Container>
        </Box>
    );
}