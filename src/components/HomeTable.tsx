import * as React from 'react';
import { Table } from 'reactstrap';
import { useTable } from 'react-table';

import HomeTableCustomToggle from './HomeTableCustomToggle';
import HomeTableViewButton from './HomeTableViewButton';

const columns = [
  {
    Header: 'Campaign',
    accessor: 'displayName',
  },
  {
    Header: 'Budget',
    accessor: 'budget',
    Cell: ({ row, cell }) => <span>{`$ ${Math.round(cell.value).toLocaleString('en')}`}</span>,
  },
  {
    Header: 'Spend',
    accessor: 'spend',
    Cell: ({ row, cell }) => <span>{`$ ${Math.round(cell.value).toLocaleString('en')}`}</span>,
  },
  {
    Header: 'Rem. Spend',
    accessor: 'remSpend',
    Cell: ({ row, cell }) => <span>{`$ ${Math.round(cell.value).toLocaleString('en')}`}</span>,
  },
  // {
  //   Header: 'Weekly Report',
  //   accessor: 'weeklyReport',
  //   Cell: HomeTableCustomToggle,
  // },
  {
    Header: '',
    accessor: 'view',
    Cell: HomeTableViewButton,
  },
];

function HomeTable({ data }: { data: [] }): JSX.Element {
  const { headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
    <Table className="align-items-center table-flush" responsive>
      <thead className="thead-light">
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((col, i) => (
              <th scope="col" {...col.getHeaderProps()}>{col.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default HomeTable;
