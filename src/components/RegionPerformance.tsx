import * as React from 'react';
import styled from '@emotion/styled';
import {
  Card, CardBody, CardFooter, CardHeader, Row, Col, Table,
} from 'reactstrap';
import { useTable } from 'react-table';
import { VectorMap } from 'react-jvectormap';
import { GlobalStateContext } from '../context';
import { useSetRegionalData } from '../hooks';
import Spinner from './Spinner';

const Img = styled.img`
  width: auto;
  max-height: 1rem;
`;

const CountryFlag = ({ row, cell }) => (
  <span>
    <Img src={cell.value} />
  </span>
);

const columns = [
  { Header: '', accessor: 'src', Cell: CountryFlag },
  { Header: 'Country', accessor: 'country' },
  { Header: 'Conversions', accessor: 'conversions' },
];

function RegionPerformance(): JSX.Element {
  const { queryIds, selectedCampaignId } = React.useContext(GlobalStateContext);
  const { mapData, isLoading, tableData } = useSetRegionalData({
    qid: queryIds['30daysRegion'],
    selectedCampaignId,
  });

  const { headerGroups, rows, prepareRow } = useTable({ columns, data: tableData });

  // TODO: append table with tableData to below map. Get some flags too.

  return isLoading ? (
    <Spinner />
  ) : (
    <Card className="shadow" style={{ height: '100%' }}>
      <CardHeader className="bg-transparent">
        <Row>
          <Col>
            <h6 className="text-uppercase text-light ls-1 mb-1">
              Last 30 days
            </h6>
            <h3 className="mb-0">Conversions by Geography</h3>
          </Col>
        </Row>
      </CardHeader>
      <CardBody style={{ height: '300px' }}>
        <VectorMap
          containerClassName="vector-map"
          containerStyle={{
            width: '100%',
            height: '100%',
          }}
          map="world_mill"
          zoomOnScroll={false}
          scaleColors={['#f00', '#0071A4']}
          normalizeFunction="polynomial"
          hoverOpacity={0.7}
          hoverColor={false}
          backgroundColor="transparent"
          regionStyle={{
            initial: {
              fill: '#e9ecef',
              'fill-opacity': 0.8,
              stroke: 'none',
              'stroke-width': 0,
              'stroke-opacity': 1,
            },
            hover: {
              fill: '#dee2e6',
              'fill-opacity': 0.8,
              cursor: 'pointer',
            },
            selected: {
              fill: 'yellow',
            },
            selectedHover: {},
          }}
          series={{
            regions: [
              {
                values: mapData.Conversions,
                scale: ['#ced4da', '#adb5bd'],
                normalizeFunction: 'polynomial',
              },
            ],
          }}
        />
      </CardBody>
      <CardFooter>
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
      </CardFooter>
    </Card>
  );
}

export default RegionPerformance;
