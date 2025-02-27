import React, { useState } from 'react'

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
  BarChart as Chart,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
  Legend,
  Cell
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
  withFocusBar = false,
  tooltipComponent = null,
  legendComponent = null,
  children,
  tooltipProps = {},
  legendProps = {},
  ...props
}) => {
  const theme = useTeachfloorTheme()
  const { containerRef, width, height } = useResizable()
  const [focusBarIndex, setFocusBarIndex] = useState(null)
  const [mouseLeave, setMouseLeave] = useState(true)
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
          tick={<CustomXTick />}
          style={{ fontSize: 12 }}
          axisLine={{ stroke: theme.fn.rgba(theme.colors.gray[4], 0.5) }}
          tickLine={{ stroke: theme.fn.rgba(theme.colors.gray[4], 0.5) }}
        />
      )
    }

    return null
  }

  const renderYAxis = () => {
    const renderCells = (data, i, focusBarIndex, mouseLeave) => {
      return data.map((entry, index) => (
        <Cell
          key={`cell-${index}`}
          fill={
            focusBarIndex === index || mouseLeave
              ? generateHexColor(i)
              : generateHexColor(i, 1)
          }
        />
      ))
    }

    const renderYData = () => {
      if (typeof y === 'string') {
        return (
          <Bar
            dataKey={y}
            // strokeWidth={2}
            fill={generateHexColor(0)}
            isAnimationActive={false}
          >
            {renderCells(data, 0, focusBarIndex, mouseLeave)}
          </Bar>
        )
      }

      if (typeof y === 'object' && !Array.isArray(y)) {
        return (
          <Bar
            dataKey={y.value}
            name={y.label}
            fill={generateHexColor(0)}
            isAnimationActive={false}
            radius={[4, 4, 0, 0]}
          >
            {renderCells(data, 0, focusBarIndex, mouseLeave)}
          </Bar>
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
                radius={[4, 4, 0, 0]}
              >
                {renderCells(data, i, focusBarIndex, mouseLeave)}
              </Bar>
            )
          }

          if (typeof item === 'string') {
            return (
              <Bar
                key={`${item}${i}`}
                dataKey={item}
                fill={generateHexColor(i)}
                isAnimationActive={false}
                radius={[4, 4, 0, 0]}
              >
                {renderCells(data, i, focusBarIndex, mouseLeave)}
              </Bar>
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

  return (
    <Box ref={containerRef} w="100%" h="100%">
      {
        (width && height)
          ? (
            <Chart
              ref={chartRef}
              data={data}
              width={width}
              height={height}
              onMouseMove={(state) => {
                if (withFocusBar) {
                  if (state.isTooltipActive) {
                    setFocusBarIndex(state.activeTooltipIndex)
                    setMouseLeave(false)
                  } else {
                    setFocusBarIndex(null)
                    setMouseLeave(true)
                  }
                }
              }}
              onMouseLeave={() => setMouseLeave(true)}
              {...props}
            >
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

export default BarChart
