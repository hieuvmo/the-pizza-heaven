import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { SearchOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Container } from '@mui/system';

import { ClipLoading } from 'components/Loading/ClipLoader';
import { CustomTextField } from 'components/MuiStyling/CustomTextField.style';
import appService from 'services/appService';
import { CheckoutInfo } from '../Checkout/CheckoutInfo/CheckoutInfo';
import './OrderSearch.style.scss';

export const OrderSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [orderSearchValue, setOrderSearchValue] = useState('');
  const [orderSearchRes, setOrderSearchRes] = useState('');
  const [existedOrderNo, setExistedOrderNo] = useState<boolean>();

  useEffect(() => {
    const fetchOrderByIdAPI = async () => {
      if (orderSearchRes !== '') {
        try {
          setIsLoading(true);
          await appService.getOrderById(parseInt(orderSearchRes));
          setExistedOrderNo(true);
        } catch (error) {
          setIsLoading(true);
          console.log('Error when getOrderById', error);
          setExistedOrderNo(false);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchOrderByIdAPI();
  }, [orderSearchRes]);

  const handleChangeOrderSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setOrderSearchValue(e.target.value);
  };

  const handleSubmitOrderSearchBtn = () => {
    if (orderSearchValue !== '') setOrderSearchRes(orderSearchValue);
    setOrderSearchValue('');
  };

  const handleKeyDownEnter = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && e.code === 'Enter') {
      handleSubmitOrderSearchBtn();
    }
  };

  const renderOrderSearchRes = () => {
    if (orderSearchRes === '') return;
    if (isLoading) {
      return (
        <div className="py-44">
          <ClipLoading loading={isLoading} />;
        </div>
      );
    }
    if (existedOrderNo && !isLoading) {
      return <CheckoutInfo orderId={orderSearchRes} />;
    }
    if (!existedOrderNo && !isLoading) {
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
            onKeyDown={handleKeyDownEnter}
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
      {renderOrderSearchRes()}
    </Container>
  );
};
