import { Box, Grid } from '@mui/material';
import { Container } from '@mui/system';
import { FOOTER_TOP_ARR } from 'common/constants';
import React from 'react';
import './FooterTop.style.scss';

export const FooterTop = () => {
  return (
    <Box className="footer_top-background">
      <Container maxWidth="lg">
        <Grid
          container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          spacing={2}
        >
          {FOOTER_TOP_ARR.map((item, index) => (
            <Grid
              key={index}
              item
              xs={12}
              sm={6}
              md={3}
              sx={{ paddingInline: '0.5rem', paddingBlock: '3rem' }}
            >
              <img className="m-auto mb-7" src={item.image} alt={item.title} />
              <h1 className="text-center mb-5 uppercase text-xl text-[#008c7a] font-bold">
                {item.title}
              </h1>
              <p className="text-center text-sm">{item.description}</p>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
