import React from 'react';
import { Curve } from 'recharts';

type CustomizedLabelLineProps = {
  percent: number;
};

const CustomizedLabelLine = (props: CustomizedLabelLineProps) => {
  const { percent } = props;
  if (percent * 100 < 1) {
    return <Curve style={{ display: 'none' }}/>
  };
  return <Curve {...props} type="linear" className="recharts-pie-label-line" />;
};

export default CustomizedLabelLine;
