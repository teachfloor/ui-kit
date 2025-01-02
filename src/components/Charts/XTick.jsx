import React from 'react'

const XTick = (props) => {
  const { fill, x, y, payload, style } = props

  return (
    <g>
      <text
        x={x}
        y={y}
        fill={fill}
        textAnchor="middle"
        style={style}
      >
        <tspan x={x} dy="0.9em">{payload.value}</tspan>
      </text>
    </g>
  );
}

export default XTick
