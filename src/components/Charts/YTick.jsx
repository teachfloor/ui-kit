import React from 'react'

const YTick = ({
  fill,
  x,
  y,
  payload,
  formatter,
  style,
}) => {
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
        <tspan x={x} dy="0.355em">
          {
            formatter
              ? formatter(payload.value)
              : payload.value
          }
        </tspan>
      </text>
    </g>
  );
}

export default YTick
