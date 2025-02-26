import React from 'react'

import { Box, useTeachfloorTheme } from '../../'

import CustomTooltip from './Tooltip'
import CustomLegend from './Legend'
import useResizable from './useResizable'
import useHexColors from './useHexColors'

import {
  PieChart as Chart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts'

const RADIAN = Math.PI / 180

/**
 * DonutChart
 */
export const DonutChart = ({
  data,
  withLegend = false,
  withTooltip = true,
  tooltipComponent = null,
  legendComponent = null,
  children,
  thickness = 30,
  size = 180,
  paddingAngle = 0,
  strokeWidth = 0,
  withLabels = false,
  labelsType = 'value',
  labelsPosition = 'outside',
  pieProps = {},
  tooltipProps = {},
  legendProps = {},
  ...props
}) => {
  const theme = useTeachfloorTheme()
  const { containerRef, width, height } = useResizable()
  const generateHexColor = useHexColors()

  const getLabel = (labelsType = 'value', labelsPosition = 'outside') => ({
    x,
    y,
    cx,
    cy,
    percent,
    value,
    midAngle,
    innerRadius,
    outerRadius,
  }) => {
    const getFormattedValue = () => (
      labelsType === 'percent'
        ? `${(percent * 100).toFixed(0)}%`
        : value
    )

    if (labelsPosition === 'inside') {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5

      return (
        <text
          x={cx + radius * Math.cos(-midAngle * RADIAN)}
          y={cy + radius * Math.sin(-midAngle * RADIAN)}
          fill="white"
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily={theme.fontFamily}
          fontSize={12}
        >
          {getFormattedValue()}
        </text>
      )
    }

    return (
      <text
        x={x}
        y={y}
        cx={cx}
        cy={cy}
        textAnchor={x > cx ? 'start' : 'end'}
        fill={theme.colors.gray[6]}
        fontFamily={theme.fontFamily}
        fontSize={12}
      >
        <tspan x={x}>
          {getFormattedValue()}
        </tspan>
      </text>
    )
  }

  const cells = data.map((item, index) => (
    <Cell
      key={index}
      fill={item.color || generateHexColor(index)}
      // stroke="var(--chart-stroke-color, var(--mantine-color-body))"
      strokeWidth={strokeWidth}
    />
  ));

  const renderPie = () => {
    const getLabelProp = () => {
      if (!withLabels) {
        return false
      }

      return getLabel(labelsType || 'value', labelsPosition || 'outside')
    }

    return (
      <Pie
        data={data}
        dataKey="value"
        fill={generateHexColor(0)}
        isAnimationActive={false}
        innerRadius={size / 2 - thickness}
        outerRadius={size / 2}
        paddingAngle={paddingAngle}
        label={getLabelProp()}
        {...pieProps}
      >
        {cells}
      </Pie>
    )
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

    return <Tooltip cursor={{ fill: 'transparent' }} content={<CustomTooltip />} {..._tooltipProps} {...tooltipProps} />
  }

  const renderLegend = () => {
    if (!withLegend) {
      return null
    }

    if (legendComponent) {
      return <Legend content={legendComponent} wrapperStyle={{}} align="right" verticalAlign="middle" layout="vetical" {...legendProps} />
    }

    return <Legend content={<CustomLegend />} wrapperStyle={{}} align="right" verticalAlign="middle" layout="vetical" {...legendProps} />
  }

  return (
    <Box ref={containerRef} w="100%" h="100%">
      {
        (width && height)
          ? (
            <Chart data={data} width={width} height={height} {...props}>
              {renderPie()}
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

export default DonutChart
