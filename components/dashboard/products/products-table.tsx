'use client';

import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { useSelection } from '@/hooks/use-selection';
import { ProductsFilter } from '@/app/dashboard/products/page';
import { IconButton } from '@mui/material';

import { paths } from '@/constants/paths';
import { useRouter } from 'next/navigation';
import { ProductWithCategory } from '@/types/ProductWithCategory';


interface ProductsTableProps {
  count?: number;
  page?: number;
  rows?: ProductWithCategory[];
  rowsPerPage?: number;
  onFilter: (filter: Partial<ProductsFilter>) => void;
  setSelectedProducts: (selected: string[]) => void;
  onDelete: (id: string) => void;
}

export function ProductsTable({
  count = 0,
  rows = [],
  page = 0,
  rowsPerPage = 0,
  onFilter,
  setSelectedProducts,
  onDelete
}: ProductsTableProps): React.JSX.Element {
  const rowIds = React.useMemo(() => {
    return rows.map((product) => product.id);
  }, [rows]);

  const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);

  const router = useRouter();

  const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;

  useEffect(() => {
    setSelectedProducts([...Array.from(selected)]);
  }, [selected])

  const handlePageChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, page: number) => {
    onFilter({ page });
  }

  const handlePerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilter({ perPage: parseInt(e.target.value, 10) })
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      selectAll();
    } else {
      deselectAll();
    }
  }

  const handleProductEdit = (id: string) => {
    router.push(`${paths.dashboard.products}/${id}`);
  }


  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={handleCheckboxChange}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Capacity</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Year</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const isSelected = selected?.has(row.id);

              return (
                <TableRow hover key={row.id} selected={isSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => {
                        if (event.target.checked) {
                          selectOne(row.id);
                        } else {
                          deselectOne(row.id);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                      <Typography variant="subtitle2">{row.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{row.category.name}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>{row.capacity}</TableCell>
                  <TableCell>{row.color}</TableCell>
                  <TableCell>{row.year}</TableCell>
                  <TableCell>
                    <Box>
                      <IconButton aria-label="edit" onClick={() => handleProductEdit(row.id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton aria-label="delete" onClick={() => onDelete(row.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <TablePagination
        component="div"
        count={count}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handlePerPage}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}
