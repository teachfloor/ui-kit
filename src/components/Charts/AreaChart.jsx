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
  AreaChart as Chart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  Legend,
} from 'recharts'

/**
 * AreaChart
 */
export const AreaChart = ({
  data,
  x,
  y,
  withLegend = false,
  withTooltip = true,
  tooltipComponent = null,
  legendComponent = null,
  children,
  curveType = 'monotone',
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
          axisLine={{ stroke: theme.fn.rgba(theme.colors.gray[4], 0.5) }}
          tickLine={{ stroke: theme.fn.rgba(theme.colors.gray[4], 0.5) }}
        />
      )
    }

    return null
  }

  const renderYAxis = () => {
    const renderYData = () => {
      if (typeof y === 'string') {
        return (
          <Area
            type={curveType}
            dataKey={y}
            strokeWidth={2}
            stroke={generateHexColor(0)}
            isAnimationActive={false}
            dot={false}
            fill={`url(#color${y})`}
          />
        )
      }

      if (typeof y === 'object' && !Array.isArray(y)) {
        return (
          <Area
            type={y.type || curveType}
            dataKey={y.value}
            name={y.label}
            strokeWidth={2}
            stroke={generateHexColor(0)}
            isAnimationActive={false}
            dot={false}
            fill={`url(#color${y.value})`}
          />
        )
      }

      if (Array.isArray(y)) {
        return y.map((item, i) => {
          if (typeof item === 'object' && !Array.isArray(item)) {
            return (
              <Area
                key={`${item.value}${i}`}
                type={item.type || curveType}
                dataKey={item.value}
                name={item.label}
                strokeWidth={2}
                stroke={generateHexColor(i)}
                isAnimationActive={false}
                dot={false}
                fill={`url(#color${item.value})`}
              />
            )
          }

          if (typeof item === 'string') {
            return (
              <Area
                key={`${item}${i}`}
                type="natural"
                dataKey={item}
                strokeWidth={2}
                stroke={generateHexColor(i)}
                isAnimationActive={false}
                dot={false}
                fill={`url(#color${item})`}
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
            axisLine={{ stroke: theme.fn.rgba(theme.colors.gray[4], 0.5) }}
            tickLine={{ stroke: theme.fn.rgba(theme.colors.gray[4], 0.5) }}
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

  const renderDefs = () => {
    const renderLinearGradients = () => {
      const renderLinearGradient = (dataKey, index) => (
        <linearGradient id={`color${dataKey}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={generateHexColor(index)} stopOpacity={0.8} />
          <stop offset="95%" stopColor={generateHexColor(index)} stopOpacity={0} />
        </linearGradient>
      )

      if (typeof y === 'string') {
        return renderLinearGradient(y, 0)
      }

      if (typeof y === 'object' && !Array.isArray(y)) {
        return renderLinearGradient(y.value, 0)
      }

      if (Array.isArray(y)) {
        return y.map((item, i) => {
          if (typeof item === 'object' && !Array.isArray(item)) {
            return renderLinearGradient(item.value, i)
          }

          if (typeof item === 'string') {
            return renderLinearGradient(item, i)
          }

          return null
        })
      }

      return null
    }

    return (
      <defs>
        {renderLinearGradients()}
      </defs>
    )
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
              {renderDefs()}
              {children}
            </Chart>
          )
          : null
      }
    </Box>
  )
}

export default AreaChart
