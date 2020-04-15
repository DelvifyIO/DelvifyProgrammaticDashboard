import * as React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Card, CardBody, CardHeader, Row, Col, UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem,
} from 'reactstrap';
import { GlobalStateContext } from '../context';
import { State } from '../context/types';
import { makeLineGraph } from '../transforms';
import { useRenderChart } from '../hooks';

const mapKeyToTitle = {
  Impressions: 'Impressions',
  'Revenue (Adv Currency)': 'Spend',
  Clicks: 'Clicks',
  'Total Conversions': 'Conversions',
  'Revenue eCPA (Adv Currency)': 'CPA',
};

function LineGraph(): JSX.Element {
  const [isLoading, setIsLoading] = React.useState(true);
  const [chosenMetric, setChosenMetric] = React.useState('Impressions');

  const [data, setData] = React.useState({});
  const {
    data: { dailyMetrics }, selectedCampaignId,
  } = React.useContext(GlobalStateContext) as State;
  useRenderChart({
    dailyMetrics,
    campaignId: selectedCampaignId,
    setData,
    setIsLoading,
  });
  const handleSelectClick = (metric) => (e) => {
    e.preventDefault();
    if (chosenMetric === metric) {
      return;
    }
    setData(makeLineGraph(dailyMetrics, selectedCampaignId, metric));
    setChosenMetric(metric);
  };
  return isLoading ? (
    <></>
  ) : (
    // TODO: add wrapper for padding + margin.
    <Card className="bg-default">
      <CardHeader className="bg-transparent">
        <Row className="align-items-center">
          <Col>
            <h6 className="text-uppercase text-light ls-1 mb-1">
              Last 30 days
            </h6>
            <h2 className="text-white mb-0">{chosenMetric}</h2>
          </Col>
          <Col className="d-flex flex-row-reverse d-md-flex">
            <UncontrolledDropdown>
              <DropdownToggle caret>
                { mapKeyToTitle[chosenMetric] }
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                { Object.entries(mapKeyToTitle).map(([key, value]) => key !== chosenMetric && (
                  <DropdownItem key={value} onClick={handleSelectClick(key)}>
                    { value }
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </UncontrolledDropdown>
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        <div className="chart">
          {/* Chart wrapper */}
          <Line
            data={data}
            options={{
              scales: {
                yAxes: [
                  {
                    gridLines: {
                      color: '#212529',
                      zeroLineColor: '#212529',
                    },
                    ticks: {
                      callback(value) {
                        if (chosenMetric === 'Revenue (Adv Currency)') {
                          return `$${value.toLocaleString('en')}`;
                        }
                        return value.toLocaleString('en');
                      },
                    },
                  },
                ],
                xAxes: [
                  {
                    type: 'time',
                    time: {
                      unit: 'week',
                    },
                  },
                ],
              },
            }}
          />
        </div>
      </CardBody>
    </Card>
  );
}

export default LineGraph;
