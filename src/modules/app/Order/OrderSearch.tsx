import { SearchOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Container } from '@mui/system';
import { CustomTextField } from 'components/MuiStyling/CustomTextField.style';
import React, { useEffect, useState } from 'react';
import appService from 'services/appService';
import { CheckoutInfo } from '../Checkout/CheckoutInfo/CheckoutInfo';
import './OrderSearch.style.scss';

export const OrderSearch = () => {
  const [orderSearchValue, setOrderSearchValue] = useState('');
  const [orderSearchRes, setOrderSearchRes] = useState('');
  const [existedOrderNo, setExistedOrderNo] = useState(false);

  useEffect(() => {
    const fetchOrderByIdAPI = async () => {
      if (orderSearchRes !== '') {
        try {
          await appService.getOrderById(parseInt(orderSearchRes));
          setExistedOrderNo(true);
        } catch (error) {
          console.log('Error when getOrderById', error);
          setExistedOrderNo(false);
        }
      }
    };
    fetchOrderByIdAPI();
  }, [orderSearchRes]);

  const handleChangeOrderSearchInput = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setOrderSearchValue(e.target.value);
  };

  const handleSubmitOrderSearchBtn = () => {
    if (orderSearchValue !== '') setOrderSearchRes(orderSearchValue);
    setOrderSearchValue('');
  };

  const renderOrderSearchRes = () => {
    if (existedOrderNo) {
      return <CheckoutInfo orderId={orderSearchRes} />;
    } else {
      if (orderSearchRes === '') {
        return <h1>Empty</h1>;
      }
      return (
        <div className="order_search-empty">
          <img
            src="https://res.cloudinary.com/duitozhul/image/upload/v1657008383/the-pizza-heaven/other/no-data.svg"
            alt=""
          />
          <p className="cart-empty_text">This order does not exist</p>
        </div>
      );
    }
  };

  return (
    <Container maxWidth="lg" className="order_search-container">
      <div className="order_search-search_bar">
        <div className="order_search-title">Checking you order</div>
        <div className="order_search-input">
          <CustomTextField
            fullWidth
            id="standard-bare"
            variant="outlined"
            value={orderSearchValue}
            onChange={handleChangeOrderSearchInput}
            placeholder="Enter you order information no"
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleSubmitOrderSearchBtn}>
                  <SearchOutlined />
                </IconButton>
              ),
            }}
          />
        </div>
      </div>
      {/* {existedOrderNo ? (
        <CheckoutInfo orderId={orderSearchRes} />
      ) : (
        <h1>abc</h1>
      )} */}
      {renderOrderSearchRes()}
    </Container>
  );
};
