import React from 'react'

import { Box } from '../../'

import CustomTooltip from './Tooltip'
import CustomLegend from './Legend'
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
  legendComponent = null,
  children,
  ...props
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
            type="linear"
            dataKey={y}
            strokeWidth={2}
            stroke={generateHexColor(0)}
            isAnimationActive={false}
          />
        )
      }

      if (typeof y === 'object' && !Array.isArray(y)) {
        return (
          <Line
            type={y.type || 'linear'}
            dataKey={y.value}
            name={y.label}
            strokeWidth={2}
            stroke={generateHexColor(0)}
            isAnimationActive={false}
          />
        )
      }

      if (Array.isArray(y)) {
        return y.map((item, i) => {
          if (typeof item === 'object' && !Array.isArray(item)) {
            return (
              <Line
                key={`${item.value}${i}`}
                type={item.type || 'linear'}
                dataKey={item.value}
                name={item.label}
                strokeWidth={2}
                stroke={generateHexColor(i)}
                isAnimationActive={false}
              />
            )
          }

          if (typeof item === 'string') {
            return (
              <Line
                key={`${item}${i}`}
                type="linear"
                dataKey={item}
                strokeWidth={2}
                stroke={generateHexColor(i)}
                isAnimationActive={false}
              />
            )
          }

          return null
        })
      }

      return null
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

  const renderLegend = () => {
    if (!withLegend) {
      return null
    }

    if (legendComponent) {
      return <Legend content={legendComponent} wrapperStyle={{ paddingLeft: 60 }} />
    }

    return <Legend content={<CustomLegend />} wrapperStyle={{ paddingLeft: 60 }} />
  }

  return (
    <Box ref={containerRef} w="100%" h="100%">
      {
        (width && height)
          ? (
            <Chart data={data} width={width} height={height} {...props}>
              <CartesianGrid vertical={false} horizontal />
              {renderXAxis()}
              {renderYAxis()}
              {renderTooltip()}
              {renderLegend()}
              {children}
            </Chart>
          )
          : null
      }
    </Box>
  )
}

export default LineChart
