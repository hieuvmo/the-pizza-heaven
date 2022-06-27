import { Add, Delete, Edit } from '@mui/icons-material';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { Container } from '@mui/system';
import { routerPath } from 'common/config/router/router.path';
import { PRODUCT_TABLE_HEAD } from 'common/constants';
import { capitalizeFirstLetter, shortcutSentence } from 'common/helper/string';
import { useAppDispatch, useAppSelector } from 'common/hooks/ReduxHook';
import {
  IdFoodType,
  IFoodColumn,
  IFoodDataTable,
} from 'common/types/table.mui.model';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  deleteFoodById,
  getFoodDetailById,
  getFoodList,
} from 'redux/features/foodSlice';
import { RootState } from 'redux/store';

export const ProductList = () => {
  const { foodList, isLoading } = useAppSelector(
    (state: RootState) => state.food,
  );
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(getFoodList());
  }, [dispatch]);

  const foodColumns = PRODUCT_TABLE_HEAD.map((item): IFoodColumn => {
    const foodLabel =
      item === 'id' ? item.toUpperCase() : capitalizeFirstLetter(item);
    return { id: item as IdFoodType, label: foodLabel };
  });

  function createFoodData(
    id: number,
    categoryId: number,
    thumbnail: string,
    name: string,
    description: string,
    price: number,
    isStock: boolean,
  ): IFoodDataTable {
    return { id, categoryId, thumbnail, name, description, price, isStock };
  }

  const foodRows = foodList?.map((item) => {
    return createFoodData(
      item.id,
      item.categoryId,
      item.thumbnail,
      item.name,
      item.description,
      item.price,
      item.isStock,
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

  const handleClickEditButton = (foodId: number) => {
    dispatch(getFoodDetailById(foodId));
  };

  const handleClickDeleteButton = async (foodId: number) => {
    await dispatch(deleteFoodById(foodId));
    await dispatch(getFoodList());
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
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{ fontSize: '2rem' }}
                      align="center"
                      colSpan={8}
                    >
                      Product Management
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    {foodColumns.map((column) => (
                      <TableCell key={column.id}>{column.label}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {foodRows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                        >
                          {foodColumns.map((column) => {
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

                              if (typeof value === 'boolean') {
                                return (
                                  <TableCell key={column.id}>
                                    {value ? <p>Yes</p> : <p>No</p>}
                                  </TableCell>
                                );
                              }
                              return (
                                <TableCell key={column.id}>
                                  {typeof value === 'number'
                                    ? value
                                    : shortcutSentence(value, 25)}
                                </TableCell>
                              );
                            }
                            return (
                              <TableCell key={column.id}>
                                <Link
                                  to={`${routerPath.admin.FOOD_LIST}/${row.id}`}
                                  onClick={() => handleClickEditButton(row.id)}
                                >
                                  <Button
                                    sx={{
                                      marginRight: '1rem',
                                    }}
                                    color="info"
                                    variant="contained"
                                    startIcon={<Edit />}
                                  >
                                    Edit
                                  </Button>
                                </Link>
                                <Button
                                  onClick={() =>
                                    handleClickDeleteButton(row.id)
                                  }
                                  color="error"
                                  variant="contained"
                                  startIcon={<Delete />}
                                >
                                  Delete
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
            <Link to={routerPath.admin.FOOD_NEW}>
              <Button
                sx={{ marginLeft: '1rem', marginTop: '1rem' }}
                color="success"
                variant="contained"
                startIcon={<Add />}
              >
                Add new
              </Button>
            </Link>

            <TablePagination
              rowsPerPageOptions={[5, 25, 100]}
              component="div"
              count={foodRows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Container>
      )}
    </>
  );
};
