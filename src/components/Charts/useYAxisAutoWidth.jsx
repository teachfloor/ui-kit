import { useState, useCallback, useMemo } from 'react'

const RECHART_CERTESIAN_AXIS_TICK_VALUE_SELECTOR = '.recharts-cartesian-y-axis-tick-value'

const useYAxisAutoWidth = ({ yAxisWidthModifier }) => {
  const [yAxisWidthState, setYAxisWidthState] = useState(undefined)

  const chartRef = useCallback((chartRef) => {
    if (chartRef != null && chartRef.container != null) {
      const tickValueElements = chartRef.container.querySelectorAll(RECHART_CERTESIAN_AXIS_TICK_VALUE_SELECTOR)

      const highestWidth = [...tickValueElements]
        .map(el => {
          const boundingRect = el.getBoundingClientRect()
          if (boundingRect != null && boundingRect.width != null) {
            return boundingRect.width
          }
          return 0
        })
        .reduce((accumulator, value) => {
          if (accumulator < value) {
            return value
          }

          return accumulator
        }, 0)

      setYAxisWidthState(highestWidth)
    }
  }, [setYAxisWidthState])

  const yAxisWidth = useMemo(() => {
    if (yAxisWidthModifier != null && yAxisWidthState != null) {
      return yAxisWidthModifier(yAxisWidthState)
    }

    return yAxisWidthState
  }, [yAxisWidthModifier, yAxisWidthState])

  return {
    yAxisWidth,
    chartRef,
  }
}

export default useYAxisAutoWidth