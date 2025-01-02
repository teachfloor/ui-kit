import React from 'react'

import { Box, Text } from '../../'

const Tooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        p="md"
        py="xs"
        radius="md"
        sx={(theme) => ({
          backgroundColor: '#FFF',
          borderRadius: theme.radius.sm,
          boxShadow: theme.shadows.sm,
        })}
        miw={120}
      >
        <Text size="sm" weight={500}>{label}</Text>
        {
          payload.map(({ dataKey, value, color }) => (
            <Text size="sm" color={color}>{`${dataKey}: ${value}`}</Text>
          ))
        }
      </Box>
    );
  }

  return null
}

export default Tooltip
