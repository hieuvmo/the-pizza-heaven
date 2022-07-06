import { Info } from '@mui/icons-material';
import {
  AlertColor,
  Button,
  Grid,
  MenuItem,
  Paper,
  Select as MuiSelect,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import Select, { SingleValue } from 'react-select';
import { Container } from '@mui/system';
import { routerPath } from 'common/config/router/router.path';
import {
  ISelect,
  ORDER_FILTER_ATTRIBUTE,
  ORDER_ORDER_BY_ATTRIBUTE,
  ORDER_SELECT_STATUS,
  ORDER_TABLE_HEAD,
} from 'common/constants';
import { convertNumberToVND } from 'common/helper/convertMoney';
import { capitalizeFirstLetter } from 'common/helper/string';
import { useAppDispatch, useAppSelector } from 'common/hooks/ReduxHook';
import { IOrder, IOrderStatus } from 'common/types/order.model';
import {
  IdOrderType,
  IOrderColumn,
  IOrderDataTable,
} from 'common/types/table.mui.model';
import { CustomSnackbar } from 'components/Snackbar/CustomSnackbar';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  changeOrderStatusById,
  getOrderListByStatus,
} from 'redux/features/admin/orderAdminSlice';
import { resetAdminOrderDetail } from 'redux/features/admin/orderDetailAdminSlice';
import { RootState } from 'redux/store';
import './OrderList.style.scss';

export const OrderList = () => {
  const { orderList, isLoading } = useAppSelector(
    (state: RootState) => state.adminOrder,
  );
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [responseFromAPI, setResponseFromAPI] = useState('');
  const [snackbarType, setSnackbarType] = useState<AlertColor>();
  const [filterOrderSelect, setFilterOrderSelect] = useState<
    SingleValue<ISelect>
  >(ORDER_FILTER_ATTRIBUTE[0]);
  const [orderByOrderSelect, setOrderByOrderSelect] = useState<
    SingleValue<ISelect>
  >(ORDER_ORDER_BY_ATTRIBUTE[0]);

  useEffect(() => {
    dispatch(resetAdminOrderDetail());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      getOrderListByStatus({
        status: filterOrderSelect?.value as string,
        orderBy: orderByOrderSelect?.value as string,
      }),
    );
  }, [dispatch, filterOrderSelect, orderByOrderSelect]);

  const orderColumns = ORDER_TABLE_HEAD.map((item): IOrderColumn => {
    const orderLabel =
      item === 'id' ? item.toUpperCase() : capitalizeFirstLetter(item);
    return { id: item as IdOrderType, label: orderLabel };
  });

  function createOrderData(
    id: number,
    user: string,
    firstName: string,
    lastName: string,
    phone: string,
    address: string,
    totalPrice: string,
    status: string,
  ): IOrderDataTable {
    return {
      id,
      user,
      firstName,
      lastName,
      phone,
      address,
      totalPrice,
      status,
    };
  }

  const orderRows = orderList.map((item) => {
    return createOrderData(
      item.id,
      item.userId === null ? 'Anonymous' : 'Customer',
      item.firstName,
      item.lastName,
      item.phone,
      item.address,
      convertNumberToVND(item.totalPrice),
      'input-select',
    );
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangeStatusSelect = (
    e: SelectChangeEvent,
    orderIndex: number,

    orderId: number,
  ) => {
    const newUpdatedOrder: IOrder = {
      ...orderList[orderIndex],
      status: e.target.value as IOrderStatus,
    };
    setSnackbarType('info');
    setResponseFromAPI(
      `You have changed order status to ${e.target.value.toUpperCase()}`,
    );
    setShowSnackbar(true);
    dispatch(
      changeOrderStatusById({ updatedOrder: newUpdatedOrder, id: orderId }),
    );
  };

  return (
    <>
      {!isLoading && (
        <Container maxWidth="lg">
          <Paper
            sx={{
              paddingBlock: '3rem',
              paddingInline: '1rem',
              margin: 'auto',
              marginBlock: '2.5rem',
            }}
          >
            <TableContainer sx={{ maxHeight: '62.5vh' }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{ fontSize: '2rem' }}
                      align="center"
                      colSpan={9}
                    >
                      Order Management
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={9}>
                      <Grid
                        container
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        spacing={4}
                      >
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          sx={{
                            paddingTop: '0.5rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <div className="font-bold my-auto min-w-[5rem]">
                            Filter by:
                          </div>
                          <div className="w-full">
                            <Select
                              theme={(theme) => ({
                                ...theme,
                                borderRadius: 0,
                                colors: {
                                  ...theme.colors,
                                  primary25: '#e0e0e0',
                                  primary: '#008c7a',
                                },
                              })}
                              options={ORDER_FILTER_ATTRIBUTE}
                              placeholder="Sort by"
                              value={filterOrderSelect}
                              onChange={(newValue: SingleValue<ISelect>) =>
                                setFilterOrderSelect(newValue)
                              }
                            />
                          </div>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          sx={{
                            paddingTop: '0.5rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <div className="font-bold my-auto min-w-[5rem]">
                            Order by:
                          </div>
                          <div className="w-full">
                            <Select
                              theme={(theme) => ({
                                ...theme,
                                borderRadius: 0,
                                colors: {
                                  ...theme.colors,
                                  primary25: '#e0e0e0',
                                  primary: '#008c7a',
                                },
                              })}
                              options={ORDER_ORDER_BY_ATTRIBUTE}
                              placeholder="Oder by"
                              value={orderByOrderSelect}
                              onChange={(newValue: SingleValue<ISelect>) =>
                                setOrderByOrderSelect(newValue)
                              }
                            />
                          </div>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    {orderColumns.map((column) => (
                      <TableCell sx={{ fontWeight: '500' }} key={column.id}>
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                  {orderRows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, rowIndex) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                        >
                          {orderColumns.map((column) => {
                            const value = row[column.id];

                            if (value !== undefined) {
                              if (value === 'input-select') {
                                return (
                                  <TableCell key={column.id}>
                                    <div className="admin-order-list">
                                      <MuiSelect
                                        fullWidth
                                        required
                                        id="status"
                                        name="status"
                                        value={
                                          orderList[
                                            rowIndex + page * rowsPerPage
                                          ].status
                                        }
                                        onChange={(e: SelectChangeEvent) =>
                                          handleChangeStatusSelect(
                                            e,
                                            rowIndex + page * rowsPerPage,
                                            row.id,
                                          )
                                        }
                                      >
                                        {ORDER_SELECT_STATUS.map(
                                          (item, index) => {
                                            return (
                                              <MenuItem
                                                sx={{ fontSize: '0.875rem' }}
                                                key={index}
                                                value={item.value}
                                              >
                                                {item.label}
                                              </MenuItem>
                                            );
                                          },
                                        )}
                                      </MuiSelect>
                                    </div>
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
                                <Link
                                  to={`${routerPath.admin.ORDER_LIST}/${row.id}`}
                                >
                                  <Button
                                    variant="contained"
                                    startIcon={<Info />}
                                  >
                                    Detail
                                  </Button>
                                </Link>
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 25, 100]}
              component="div"
              count={orderRows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>

          <CustomSnackbar
            snackbarColor={snackbarType}
            res={responseFromAPI}
            open={showSnackbar}
            setOpen={setShowSnackbar}
          />
        </Container>
      )}
    </>
  );
};
