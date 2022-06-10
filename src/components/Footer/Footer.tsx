import { Container, Grid } from '@mui/material';
import React from 'react';
import { PizzaLogo } from '../Logo/PizzaLogo';
import Iframe from 'react-iframe';
import { Box } from '@mui/system';

export const Footer = () => {
  return (
    <div className="bg-[#2b2f31] px-4 py-12">
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: 'flex', justifyContent: 'center', paddingBlock: '1.5rem' }}>
              <PizzaLogo customDisplay={{ xs: 'flex' }} />
            </Box>
            <ul className="text-white text-center">
              <li>Địa chỉ: Số 69 Phú Diễn, Bắc Từ Liêm, Hà Nội</li>
              <li>Hotline: 0964 819 769</li>
              <li>Fanpage: The pizza heaven</li>
              <li>Email: thepizzaheaven@gmail.com</li>
            </ul>
          </Grid>

          <Grid item xs={12} sm={6} md={4} sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Iframe
              url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.70011733077!2d105.75992191465741!3d21.044681785989773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454c17d1a64d5%3A0x8069b74dcdc8e817!2zNjkgxJAuIFBow7ogRGnhu4VuLCBD4bqndSBEaeG7hW4sIELhuq9jIFThu6sgTGnDqm0sIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1639146504808!5m2!1svi!2s"
              width="100%"
              height="300"
              styles={{ border: '0' }}
              allowFullScreen
              loading="lazy"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Iframe
              url="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FThe-Pizza-Heaven-101913285893356&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=7095768120493981"
              width="100%"
              height="300"
              styles={{ border: '0', overflow: 'hidden' }}
              scrolling="no"
              frameBorder={0}
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
