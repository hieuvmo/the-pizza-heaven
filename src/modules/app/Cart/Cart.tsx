import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Delete, Payment } from '@mui/icons-material';
import { Container } from '@mui/system';
import {
  AlertColor,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';

import { routerPath } from 'common/config/router/router.path';
import { PRODUCT_IN_CART_TABLE_HEAD } from 'common/constants';
import { convertNumberToVND } from 'common/helper/convertMoney';
import { capitalizeFirstLetter } from 'common/helper/string';
import { uid } from 'common/helper/uid';
import { useAppDispatch, useAppSelector } from 'common/hooks/ReduxHook';
import { IOrderDetail } from 'common/types/order.model';
import { CustomTextField } from 'components/MuiStyling/CustomTextField.style';
import { CustomSnackbar } from 'components/Snackbar/CustomSnackbar';
import { addNewOrderDetail } from 'redux/features/app/orderDetailSlice';
import { setTotalPriceForOrder } from 'redux/features/app/orderSlice';
import { RootState } from 'redux/store';
import {
  ICartColumn,
  ICartDataTable,
  IdCartType,
} from 'common/types/table.mui.model';
import {
  changeProductQuantityInCart,
  deleteProductInCart,
} from 'redux/features/app/cartSlice';
import './Cart.style.scss';

export const Cart = () => {
  const { productsInCart, snackbarRes } = useAppSelector(
    (state: RootState) => state.cart,
  );
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarType, setSnackbarType] = useState<AlertColor>();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const productInCartColumns = PRODUCT_IN_CART_TABLE_HEAD.map(
    (item): ICartColumn => {
      const productInCartLabel = capitalizeFirstLetter(item);
      return { id: item as IdCartType, label: productInCartLabel };
    },
  );

  function createProductInCartData(
    thumbnail: string,
    name: string,
    price: string,
    quantity: string,
    total: string,
  ): ICartDataTable {
    return { thumbnail, name, price, quantity, total };
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

  const handleClickMakePayment = () => {
    const newOrderDetail: IOrderDetail[] = productsInCart.map((item) => {
      return {
        id: uid(),
        orderId: Date.now(),
        foodId: item.id,
        quantity: item.quantity,
        isRated: false,
      };
    });
    dispatch(addNewOrderDetail(newOrderDetail));
    dispatch(setTotalPriceForOrder(totalPrice));
    navigate(routerPath.app.CHECKOUT_ORDER);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
              src="https://res.cloudinary.com/duitozhul/image/upload/v1656383537/the-pizza-heaven/cart/empty-cart.svg"
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
            <TableContainer sx={{ maxHeight: '42.5vh' }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {productInCartColumns.map((column) => (
                      <TableCell key={column.id}>{column.label}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productInCartRows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={index}
                        >
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
                                        e: ChangeEvent<HTMLInputElement>,
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
                  fontWeight: 500,
                  textAlign: 'center',
                  fontSize: '1.125rem',
                }}
              >
                Total price:{' '}
                <strong className="total-price">
                  {convertNumberToVND(totalPrice)}
                </strong>
              </Typography>
              <Button
                color="primary"
                variant="contained"
                startIcon={<Payment />}
                onClick={handleClickMakePayment}
                disabled={productsInCart.length === 0}
              >
                Make payment
              </Button>
            </div>

            <TablePagination
              rowsPerPageOptions={[5, 25, 100]}
              component="div"
              count={productInCartRows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
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
