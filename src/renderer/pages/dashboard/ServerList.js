import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedServer } from '../../store/reducers/server';

// material-ui
import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

// third-party
import { NumericFormat } from 'react-number-format';

// project import
import Dot from '../../components/@extended/Dot';
import { getComparator, stableSort } from '../../utils/anythingData';

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
  {
    id: 'game',
    align: 'left',
    disablePadding: false,
    label: 'Game'
  },
  {
    id: 'name',
    align: 'left',
    disablePadding: true,
    label: 'Server Name'
  },
  {
    id: 'status',
    align: 'left',
    disablePadding: false,
    label: 'Status'
  },
  {
    id: 'players',
    align: 'right',
    disablePadding: false,
    label: 'Total Players'
  }
];

function getCellWidth(index) {
  if (index === 0) return `40%`;
  if (index === 1) return `40%`;
  if (index === 2) return `10%`;
  if (index === 3) return `10%`;
  return 200;
}

// ==============================|| ORDER TABLE - HEADER ||============================== //

function ServerListTableHead({ order, orderBy, setOrderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => {
          return (
            <TableCell
              key={headCell.id}
              align={headCell.align}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
              onClick={() => {
                setOrderBy(headCell.id);
              }}
            >
              <div style={{ cursor: 'pointer', textDecoration: orderBy === headCell.id ? 'underline' : '' }}>{headCell.label}</div>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}

ServerListTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string,
  setOrderBy: PropTypes.func
};

// ==============================|| ORDER TABLE - STATUS ||============================== //

const ServerStatus = ({ status }) => {
  let color;
  let title;

  switch (status) {
    case 0:
      color = 'error';
      title = 'Down';
      break;
    case 1:
      color = 'success';
      title = 'Running';
      break;
    default:
      color = 'primary';
      title = 'None';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
};

ServerStatus.propTypes = {
  status: PropTypes.number
};

// ==============================|| ORDER TABLE ||============================== //

export default function ServerList({ itemsPerPage, page, servers }) {
  const selectedServer = useSelector((state) => state.server.selectedServer);
  const [order] = useState('asc');
  const [orderBy, setOrderBy] = useState('status');
  const sortedServerList = stableSort(servers, getComparator(order, orderBy));
  const serverListPage = sortedServerList.slice(page * itemsPerPage - itemsPerPage, page * itemsPerPage);
  const dispatch = useDispatch();

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          sx={{
            '& .MuiTableCell-root:first-of-type': {
              pl: 2
            },
            '& .MuiTableCell-root:last-of-type': {
              pr: 3
            }
          }}
        >
          <ServerListTableHead order={order} orderBy={orderBy} setOrderBy={setOrderBy} />
          <TableBody>
            {serverListPage.map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;
              const isItemSelected = selectedServer.id === row.id;

              return (
                <TableRow
                  hover
                  component={null}
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                  tabIndex={-1}
                  key={row.id}
                  aria-checked={isItemSelected}
                  selected={isItemSelected}
                  onClick={() => dispatch(setSelectedServer({ selectedServer: row }))}
                >
                  <TableCell sx={{ width: getCellWidth(index) }} id={labelId} align="left">
                    {row.game.length > 40 ? row.game.slice(0, 40) + '...' : row.game}
                  </TableCell>
                  <TableCell sx={{ width: getCellWidth(index) }} align="left">
                    {row.name.length > 30 ? row.name.slice(0, 30) + '...' : row.name}
                  </TableCell>
                  <TableCell sx={{ width: getCellWidth(index) }} align="left">
                    <ServerStatus status={row.status} />
                  </TableCell>
                  <TableCell sx={{ width: getCellWidth(index) }} align="right">
                    <NumericFormat value={row.players} displayType="text" thousandSeparator />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

ServerList.propTypes = {
  itemsPerPage: PropTypes.number,
  page: PropTypes.number,
  servers: PropTypes.array
};
