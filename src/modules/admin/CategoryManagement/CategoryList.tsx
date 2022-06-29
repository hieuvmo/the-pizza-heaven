import { Add, Delete, Edit } from '@mui/icons-material';
import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { routerPath } from 'common/config/router/router.path';
import { CATEGORY_TABLE_HEAD } from 'common/constants';
import { capitalizeFirstLetter } from 'common/helper/string';
import { useAppDispatch, useAppSelector } from 'common/hooks/ReduxHook';
import {
  ICategoryColumn,
  ICategoryDataTable,
  IdCategoryType,
} from 'common/types/table.mui.model';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  deleteCategoryById,
  getCategoryDetailById,
  getCategoryList,
} from 'redux/features/categorySlice';
import { RootState } from 'redux/store';

export const CategoryList = () => {
  const { categoryList, isLoading } = useAppSelector(
    (state: RootState) => state.category,
  );
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(getCategoryList());
  }, [dispatch]);

  const categoryColumns = CATEGORY_TABLE_HEAD.map((item): ICategoryColumn => {
    const categoryLabel =
      item === 'id' ? item.toUpperCase() : capitalizeFirstLetter(item);
    return { id: item as IdCategoryType, label: categoryLabel };
  });

  function createCategoryData(id: number, name: string): ICategoryDataTable {
    return { id, name };
  }

  const categoryRows = categoryList?.map((item) => {
    return createCategoryData(item.id, item.categoryName);
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

  const handleClickEditButton = (categoryId: number) => {
    dispatch(getCategoryDetailById(categoryId));
  };

  const handleClickDeleteButton = async (categoryId: number) => {
    await dispatch(deleteCategoryById(categoryId));
    await dispatch(getCategoryList());
  };

  return (
    <>
      {/* <Navbar /> */}
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
            <TableContainer sx={{ maxHeight: 390 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{ fontSize: '2rem' }}
                      align="center"
                      colSpan={7}
                    >
                      Category Management
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    {categoryColumns.map((column) => (
                      <TableCell key={column.id} align="center">
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categoryRows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                        >
                          {categoryColumns.map((column) => {
                            const value = row[column.id];
                            if (value) {
                              return (
                                <TableCell key={column.id} align="center">
                                  {column.format && typeof value === 'number'
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              );
                            } else {
                              return (
                                <TableCell key={column.id} align="center">
                                  <Link
                                    to={`${routerPath.admin.CATEGORY_LIST}/${row.id}`}
                                    onClick={() =>
                                      handleClickEditButton(row.id)
                                    }
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
                            }
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <Link to={routerPath.admin.CATEGORY_NEW}>
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
              count={categoryRows.length}
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
