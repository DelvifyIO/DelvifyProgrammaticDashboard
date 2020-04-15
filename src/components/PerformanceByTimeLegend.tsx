import React from 'react';
import {
  Row, Col,
} from 'reactstrap';

type RangeCap = number;
type StyledColProp = React.Component
type ComponentProps = { rangecap: RangeCap; StyledCol: StyledColProp }

function formatScaleDisplay(rangecap: RangeCap, num: number) {
  if (num === 0) {
    return 1;
  }
  const ret = Math.round((rangecap / 4) * num);
  return num === 1 ? Math.max(2, ret) : ret;
}

function getStyleObjFromNum(num) {
  const PADDING = 10;
  if (num <= 1) {
    return { paddingLeft: num === 1 ? PADDING : 0 };
  }
  return {
    textAlign: num < 3 ? 'center' : 'right',
    paddingRight: num === 3 ? PADDING : 0,
  };
}

function getMappedElements(rangecap: RangeCap, StyledCol) {
  if (rangecap === 0) {
    return [<Row />, <Row />];
  }
  if (rangecap >= 1 && rangecap <= 4) {
    const indices = [];
    for (let i = 1; i <= rangecap; i += 1) {
      indices.push(i);
    }
    return [(
      <Row>
        {indices.map((num) => (
          <StyledCol key={num} rangecap={rangecap} />
        ))}
      </Row>
    ), (
      <Row>
        {indices.map((num) => (
          <StyledCol style={{ textAlign: 'center' }} key={num}>
            {Math.round(num)}
          </StyledCol>
        ))}
      </Row>
    )];
  }
  return [(
    <Row>
      {[1, 2, 3, 4].map((num) => (
        <StyledCol
          key={num}
          amt={(rangecap / 4) * num}
          rangecap={rangecap}
        />
      ))}
    </Row>
  ), (
    <Row>
      {[0, 1, 2, 3, 4].map((num) => (
        <StyledCol key={num} style={getStyleObjFromNum(num)}>
          {formatScaleDisplay(rangecap, num)}
        </StyledCol>
      ))}
    </Row>
  )];
}

function PerformanceByTimeLegend({ rangecap, StyledCol }: ComponentProps): JSX.Element {
  const [legend, scales] = getMappedElements(rangecap, StyledCol);

  return (
    <Col>
      {legend}
      {scales}
    </Col>
  );
}

export default PerformanceByTimeLegend;
