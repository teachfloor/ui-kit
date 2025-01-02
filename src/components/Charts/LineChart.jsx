import React from 'react'

import { Box } from '../../'

import CustomTooltip from './Tooltip'
import CustomXTick from './XTick'
import CustomYTick from './YTick'
import useResizable from './useResizable'
import useHexColors from './useHexColors'

import {
  CartesianGrid,
  LineChart as Chart,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  Legend,
} from 'recharts'

/**
 * LineChart
 */
export const LineChart = ({
  data,
  x,
  y,
  withLegend = false,
  withTooltip = true,
  tooltipComponent = null,
  children,
}) => {
  const { containerRef, width, height } = useResizable()
  const generateHexColor = useHexColors()

  const renderXAxis = () => {
    if (typeof x === 'string') {
      return (
        <XAxis
          dataKey={x}
          tickSize={4}
          style={{ fontSize: 12 }}
          tick={<CustomXTick />}
          axisLine={{ stroke: 'rgb(204, 204, 204)' }}
          tickLine={{ stroke: 'rgb(204, 204, 204)' }}
        />
      )
    }

    return null
  }

  const renderYAxis = () => {
    const renderYData = () => {
      if (typeof y === 'string') {
        return (
          <Line
            type="monotone"
            dataKey={y}
            strokeWidth={2}
            stroke={generateHexColor(0)}
            isAnimationActive={false}
          />
        )
      }

      if (Array.isArray(y)) {
        return y.map((item, i) => (
          <Line
            type="monotone"
            dataKey={item}
            strokeWidth={2}
            stroke={generateHexColor(i)}
            isAnimationActive={false}
          />
        ))
      }
    }

    if (y) {
      return (
        <>
          <YAxis
            // axisLine={false}
            // tick={false}
            // tickSize={0}
            tick={<CustomYTick />}
            // tickCount={2}
            style={{ fontSize: 12 }}
            axisLine={{ stroke: 'rgb(204, 204, 204)' }}
            tickLine={{ stroke: 'rgb(204, 204, 204)' }}
          />
          {renderYData()}
        </>
      )
    }

    return null
  }

  const renderTooltip = () => {
    if (!withTooltip) {
      return null
    }

    if (tooltipComponent) {
      return <Tooltip cursor={{ fill: 'transparent' }} content={tooltipComponent} />
    }

    return <Tooltip cursor={{ fill: 'transparent' }} content={<CustomTooltip />} />
  }

  return (
    <Box ref={containerRef} w="100%" h="100%">
      {
        (width && height)
          ? (
            <Chart data={data} width={width} height={height}>
              <CartesianGrid vertical={false} horizontal />
              {renderXAxis()}
              {renderYAxis()}
              {renderTooltip()}
              {withLegend ? <Legend /> : null}
              {children}
            </Chart>
          )
          : null
      }
    </Box>
  )
}

export default LineChart
