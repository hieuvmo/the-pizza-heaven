import { ArrowBack } from '@mui/icons-material';
import { Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

interface GoBackProps {
  pageLink: string;
}

export const GoBack: React.FC<GoBackProps> = ({ pageLink }) => {
  return (
    <Container maxWidth="lg">
      <Link to={pageLink}>
        <Button
          sx={{
            marginTop: '2rem',
          }}
          color="secondary"
          variant="contained"
          startIcon={<ArrowBack />}
        >
          Back
        </Button>
      </Link>
    </Container>
  );
};
