import { FC } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';

interface GoBackProps {
  pageLink: string;
}

export const GoBack: FC<GoBackProps> = ({ pageLink }) => {
  return (
    <Container maxWidth="lg">
      <Link to={pageLink}>
        <Button
          sx={{
            marginTop: '2rem',
          }}
          color="primary"
          variant="contained"
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
      </Link>
    </Container>
  );
};
