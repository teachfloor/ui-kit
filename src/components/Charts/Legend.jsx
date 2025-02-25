import React from 'react'

import {
  Text,
  Group,
  ColorSwatch,
} from '../../'

const Legend = ({ payload, align, verticalAlign, ...props }) => {
  const getAlignmentProps = () => {
    const getAlign = () => {
      switch (align) {
        case 'left':
          return {
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '0.5rem',
          }

        case 'right':
          return {
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '0.5rem',
          }

        case 'center':
        default:
          return {}
      }
    }

    const getVerticalAlign = () => {
      switch (verticalAlign) {
        case 'top':
          return {}

        case 'bottom':
          return {}

        case 'middle':
        default:
          return {}
      }
    }

    return {
      ...getAlign(),
      ...getVerticalAlign(),
    }
  }

  if (payload && payload.length) {
    return (
      <Group spacing="lg" position={align} sx={{ ...getAlignmentProps() }}>
        {
          payload.map(({ value, color }, index) => (
            <Group spacing="xs" noWrap key={`item-${index}`}>
              <ColorSwatch size={12} radius="sm" color={color} withShadow={false} />
              <Text size="sm" color="dimmed">{value}</Text>
            </Group>
          ))
        }
      </Group>
    )
  }

  return null
}

export default Legend
