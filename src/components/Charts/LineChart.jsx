import React from 'react'

import { Box, useTeachfloorTheme } from '../../'

import CustomTooltip from './Tooltip'
import CustomLegend from './Legend'
import CustomXTick from './XTick'
import CustomYTick from './YTick'
import useResizable from './useResizable'
import useHexColors from './useHexColors'
import useYAxisAutoWidth from './useYAxisAutoWidth'

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
  tooltipProps = {},
  legendProps = {},
  ...props
}) => {
  const theme = useTeachfloorTheme()
  const { containerRef, width, height } = useResizable()
  const generateHexColor = useHexColors()
  const { yAxisWidth, chartRef } = useYAxisAutoWidth({
    yAxisWidthModifier: (x) => (x + 5)
  })

  const yFormatters = Array.isArray(y)
    ? y.reduce((acc, item) => {
      acc[item.value] = item.formatter || ((val) => val)
      return acc
    }, {})
    : { [y.value || y]: y.formatter || ((val) => val) }

  const getFormatter = (dataKey) => {
    return yFormatters[dataKey]
  }

  const renderXAxis = () => {
    if (typeof x === 'string') {
      return (
        <XAxis
          dataKey={x}
          tickSize={4}
          style={{ fontSize: 12 }}
          tick={<CustomXTick />}
          axisLine={{ stroke: theme.colors.gray[3] }}
          tickLine={{ stroke: theme.colors.gray[3] }}
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
            type="natural"
            dataKey={y}
            strokeWidth={2}
            stroke={generateHexColor(0)}
            isAnimationActive={false}
            dot={false}
          />
        )
      }

      if (typeof y === 'object' && !Array.isArray(y)) {
        return (
          <Line
            type={y.type || 'natural'}
            dataKey={y.value}
            name={y.label}
            strokeWidth={2}
            stroke={generateHexColor(0)}
            isAnimationActive={false}
            dot={false}
          />
        )
      }

      if (Array.isArray(y)) {
        return y.map((item, i) => {
          if (typeof item === 'object' && !Array.isArray(item)) {
            return (
              <Line
                key={`${item.value}${i}`}
                type={item.type || 'natural'}
                dataKey={item.value}
                name={item.label}
                strokeWidth={2}
                stroke={generateHexColor(i)}
                isAnimationActive={false}
                dot={false}
              />
            )
          }

          if (typeof item === 'string') {
            return (
              <Line
                key={`${item}${i}`}
                type="natural"
                dataKey={item}
                strokeWidth={2}
                stroke={generateHexColor(i)}
                isAnimationActive={false}
                dot={false}
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
            tick={<CustomYTick formatter={getFormatter(y.value || y)} />}
            style={{ fontSize: 12 }}
            axisLine={{ stroke: theme.colors.gray[3] }}
            tickLine={{ stroke: theme.colors.gray[3] }}
            width={yAxisWidth}
          />
          {renderYData()}
        </>
      )
    }

    return null
  }

  const renderTooltip = () => {
    const _tooltipProps = {
      allowEscapeViewBox: { x: false, y: true },
      animationDuration: 150,
      wrapperStyle: { zIndex: 1000 },
    }

    if (!withTooltip) {
      return null
    }

    if (tooltipComponent) {
      return <Tooltip cursor={{ fill: 'transparent' }} content={tooltipComponent} {..._tooltipProps} {...tooltipProps} />
    }

    return <Tooltip cursor={{ fill: 'transparent' }} content={<CustomTooltip formatters={yFormatters} />} {..._tooltipProps} {...tooltipProps} />
  }

  const renderLegend = () => {
    if (!withLegend) {
      return null
    }

    if (legendComponent) {
      return <Legend content={legendComponent} wrapperStyle={{ paddingLeft: 60 }} {...legendProps} />
    }

    return <Legend content={<CustomLegend />} wrapperStyle={{ paddingLeft: 60 }} {...legendProps} />
  }

  return (
    <Box ref={containerRef} w="100%" h="100%">
      {
        (width && height)
          ? (
            <Chart ref={chartRef} data={data} width={width} height={height} {...props}>
              <CartesianGrid
                vertical={false}
                horizontal
                strokeDasharray="4"
                opacity={0.5}
              />
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
