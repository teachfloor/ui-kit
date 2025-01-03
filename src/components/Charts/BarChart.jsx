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
  BarChart as Chart,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
  Legend,
} from 'recharts'

/**
 * BarChart
 */
export const BarChart = ({
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
          tick={<CustomXTick />}
          style={{ fontSize: 12 }}
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
          <Bar
            dataKey={y}
            // strokeWidth={2}
            fill={generateHexColor(0)}
            isAnimationActive={false}
          />
        )
      }

      if (typeof y === 'object' && !Array.isArray(y)) {
        return (
          <Bar
            dataKey={y.value}
            name={y.label}
            fill={generateHexColor(0)}
            isAnimationActive={false}
          />
        )
      }

      if (Array.isArray(y)) {
        return y.map((item, i) => {
          if (typeof item === 'object' && !Array.isArray(item)) {
            return (
              <Bar
                key={`${item.value}${i}`}
                dataKey={item.value}
                name={item.label}
                fill={generateHexColor(i)}
                isAnimationActive={false}
              />
            )
          }

          if (typeof item === 'string') {
            return (
              <Bar
                key={`${item}${i}`}
                dataKey={item}
                fill={generateHexColor(i)}
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
            tick={<CustomYTick />}
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

export default BarChart
