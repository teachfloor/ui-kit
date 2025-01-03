import React from 'react'

const YTick = (props) => {
  const { fill, x, y, payload, style } = props

  return (
    <g>
      <text
        x={x}
        y={y}
        fill={fill}
        textAnchor="end"
        style={style}
        className="recharts-cartesian-y-axis-tick-value"
      >
        <tspan x={x} dy="0.355em">{payload.value}</tspan>
      </text>
    </g>
  );
}

export default YTick
