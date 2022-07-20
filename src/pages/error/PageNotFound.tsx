import { Container } from '@mui/material';

import './PageNotFound.style.scss';

export const PageNotFound = () => {
  return (
    <Container maxWidth="lg">
      <div className="page_not_found-container">
        <div className="empty_search">
          <img
            src="https://res.cloudinary.com/duitozhul/image/upload/v1656484524/the-pizza-heaven/other/page-not-found.svg"
            alt=""
          />
          <p className="empty_search-text">Page not found</p>
        </div>
      </div>
    </Container>
  );
};
