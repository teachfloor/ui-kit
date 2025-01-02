import React from 'react'

import {
  Text,
  Group,
  ColorSwatch,
} from '../../'

const Legend = ({ payload, align, ...props }) => {
  if (payload && payload.length) {
    return (
      <Group spacing="lg" position={align}>
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
