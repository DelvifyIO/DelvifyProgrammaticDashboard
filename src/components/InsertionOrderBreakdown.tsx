import * as React from 'react';
import {
  Table, Row, Card, CardHeader, Col,
} from 'reactstrap';
import { useTable } from 'react-table';
import Spinner from './Spinner';
import { GlobalStateContext } from '../context';
import { makeInsertionOrderMetrics } from '../transforms';

const columns = [
  {
    Header: 'Insertion Order',
    accessor: 'insertionOrderName',
  },
  {
    Header: 'Impressions',
    accessor: 'impressions',
    Cell: ({ row, cell }) => <span>{`${Math.round(cell.value).toLocaleString('en')}`}</span>,
  },
  {
    Header: 'Clicks',
    accessor: 'clicks',
    Cell: ({ row, cell }) => <span>{`${Math.round(cell.value).toLocaleString('en')}`}</span>,
  },
  {
    Header: 'CTR',
    accessor: 'clickRate',
  },
  {
    Header: 'Spend',
    accessor: 'spend',
    Cell: ({ row, cell }) => <span>{`$ ${Math.round(cell.value).toLocaleString('en')}`}</span>,
  },
  {
    Header: 'CPC',
    accessor: 'cpc',
    Cell: ({ row, cell }) => <span>{`$ ${Number(cell.value).toFixed(2)}`}</span>,
  },
  {
    Header: 'CPM',
    accessor: 'cpm',
    Cell: ({ row, cell }) => <span>{`$ ${Number(cell.value).toFixed(2)}`}</span>,
  },
  {
    Header: 'Conversions',
    accessor: 'conversions',
    Cell: ({ row, cell }) => <span>{`${Math.round(cell.value).toLocaleString('en')}`}</span>,
  },
  {
    Header: 'CPA',
    accessor: 'cpa',
    Cell: ({ row, cell }) => <span>{`$ ${Number(cell.value).toFixed(2)}`}</span>,
  },
];

function InsertionOrderBreakdown(): JSX.Element {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState([]);

  const {
    selectedCampaignId, data: { alltimeMetrics },
  } = React.useContext(GlobalStateContext);

  React.useEffect(() => {
    setIsLoading(true);
    setData(makeInsertionOrderMetrics(alltimeMetrics, selectedCampaignId));
    setIsLoading(false);
  }, []);

  const { headerGroups, rows, prepareRow } = useTable({ columns, data });

  return isLoading ? (
    <Spinner />
  ) : (
    <Card className="shadow">
      <CardHeader className="border-0">
        <Row className="align-items-center">
          <Col>
            <h3 className="mb-0">Insertion Order Overview</h3>
          </Col>
        </Row>
      </CardHeader>
      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((col, i) => (
                <th scope="col" {...col.getHeaderProps()}>
                  {col.render('Header')}
                </th>
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
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Card>
  );
}

export default InsertionOrderBreakdown;
