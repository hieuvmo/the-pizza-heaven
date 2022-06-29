import { Delete, Payment } from '@mui/icons-material';
import {
  AlertColor,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import { PRODUCT_IN_CART_TABLE_HEAD } from 'common/constants';
import { convertNumberToVND } from 'common/helper/convertToVND';
import { capitalizeFirstLetter } from 'common/helper/string';
import { useAppDispatch, useAppSelector } from 'common/hooks/ReduxHook';
import {
  IdProductInCartType,
  IProductInCartColumn,
  IProductInCartDataTable,
} from 'common/types/table.mui.model';
import { CustomTextField } from 'components/MuiStyling/CustomTextField.style';
import { CustomSnackbar } from 'components/Snackbar/CustomSnackbar';
import React, { useState } from 'react';
import {
  changeProductQuantityInCart,
  deleteProductInCart,
} from 'redux/features/cartSlice';
import { RootState } from 'redux/store';
import './Cart.style.scss';

export const Cart = () => {
  const { productsInCart, snackbarRes } = useAppSelector(
    (state: RootState) => state.cart,
  );
  const dispatch = useAppDispatch();

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarType, setSnackbarType] = useState<AlertColor>();

  const productInCartColumns = PRODUCT_IN_CART_TABLE_HEAD.map(
    (item): IProductInCartColumn => {
      const productInCartLabel = capitalizeFirstLetter(item);
      return { id: item as IdProductInCartType, label: productInCartLabel };
    },
  );

  function createProductInCartData(
    thumbnail: string,
    name: string,
    price: string,
    quantity: string,
    calculation: string,
  ): IProductInCartDataTable {
    return { thumbnail, name, price, quantity, calculation };
  }

  const productInCartRows = productsInCart.map((item) => {
    return createProductInCartData(
      item.thumbnail,
      item.name,
      convertNumberToVND(item.price),
      'input-quantity',
      convertNumberToVND(item.price * item.quantity),
    );
  });

  const totalPrice = productsInCart.reduce(
    (prevValue, currValue) => prevValue + currValue.price * currValue.quantity,
    0,
  );

  const handleChangeProductQuantity = (
    changeValue: string,
    productIndex: number,
  ) => {
    dispatch(
      changeProductQuantityInCart({
        changeValue,
        productIndex,
      }),
    );
  };

  const handleClickDeleteButton = (productIndex: number) => {
    dispatch(deleteProductInCart(productIndex));
    setSnackbarType('success');
    setShowSnackbar(true);
  };

  return (
    <Container maxWidth="lg">
      <div className="cart-container">
        <div className="cart-heading">
          <h3>Cart</h3>
        </div>
        {productsInCart.length === 0 ? (
          <div className="cart-empty">
            <img
              src="https://res.cloudinary.com/duitozhul/image/upload/v1656383537/the-pizza-heaven/other/empty-cart.svg"
              alt=""
            />
            <p className="cart-empty_text">You have no products</p>
          </div>
        ) : (
          <Paper
            sx={{
              paddingBlock: '2rem',
              paddingInline: '1rem',
              margin: 'auto',
            }}
          >
            <TableContainer sx={{ maxHeight: 390 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {productInCartColumns.map((column) => (
                      <TableCell key={column.id}>{column.label}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productInCartRows.map((row, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        {productInCartColumns.map((column) => {
                          const value = row[column.id];
                          if (value !== undefined) {
                            if (
                              typeof value === 'string' &&
                              value.includes('https')
                            ) {
                              return (
                                <TableCell
                                  key={column.id}
                                  sx={{ width: '7rem' }}
                                >
                                  <img src={`${value}`} alt="123" />
                                </TableCell>
                              );
                            }
                            if (value === 'input-quantity') {
                              return (
                                <TableCell key={column.id}>
                                  <CustomTextField
                                    sx={{ maxWidth: '5rem' }}
                                    id="product-quantity"
                                    type="number"
                                    InputProps={{
                                      inputProps: { min: 1, max: 999 },
                                    }}
                                    value={productsInCart[index].quantity}
                                    onChange={(
                                      e: React.ChangeEvent<HTMLInputElement>,
                                    ) =>
                                      handleChangeProductQuantity(
                                        e.target.value,
                                        index,
                                      )
                                    }
                                  />
                                </TableCell>
                              );
                            }
                            return (
                              <TableCell key={column.id}>
                                {column.format && typeof value === 'number'
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          }
                          return (
                            <TableCell key={column.id}>
                              <Button
                                color="error"
                                onClick={() => handleClickDeleteButton(index)}
                                variant="contained"
                                startIcon={<Delete />}
                              >
                                Remove
                              </Button>
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <div className="cart-payment">
              <Typography
                sx={{
                  fontWeight: 400,
                  textAlign: 'center',
                  fontSize: '1rem',
                }}
              >
                Total price:{' '}
                <span className="total-price">
                  {convertNumberToVND(totalPrice)}
                </span>
              </Typography>
              <Button
                color="primary"
                variant="contained"
                startIcon={<Payment />}
              >
                Make payment
              </Button>
            </div>
          </Paper>
        )}
      </div>

      <CustomSnackbar
        snackbarColor={snackbarType}
        res={snackbarRes}
        open={showSnackbar}
        setOpen={setShowSnackbar}
      />
    </Container>
  );
};
