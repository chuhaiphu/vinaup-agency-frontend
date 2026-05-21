import { Container, Title, Box, Text } from '@mantine/core';

export default function TechNewsPage() {
    return (
        <Box style={{ minHeight: '60vh', backgroundColor: 'var(--vinaup-soft-gray)', paddingBottom: '3rem' }}>
            <Container size="xl" pt="2rem">
                <Title order={1} style={{ color: 'var(--vinaup-soft-crimson)', marginBottom: '1rem' }}>
                    Tin Công Nghệ
                </Title>
                <Text color="var(--vinaup-dark-gray)">
                    Nội dung trang tin công nghệ đang được cập nhật...
                </Text>
            </Container>
        </Box>
    );
}
