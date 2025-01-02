import React from 'react'

const YTick = (props) => {
  const { fill, x, y, payload, style } = props

  console.log(props)

  return (
    <g>
      <text
        x={x}
        y={y}
        fill={fill}
        textAnchor="end"
        style={style}
      >
        <tspan x={x} dy="0.355em">{payload.value}</tspan>
      </text>
    </g>
  );
}

export default YTick
