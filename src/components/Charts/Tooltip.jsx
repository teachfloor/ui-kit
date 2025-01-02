import React from 'react'

import {
  Box,
  Text,
  Group,
  ColorSwatch,
  SimpleGrid,
} from '../../'

const Tooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        p="md"
        py="xs"
        radius="md"
        sx={(theme) => ({
          backgroundColor: '#FFF',
          borderRadius: theme.radius.md,
          boxShadow: theme.shadows.sm,
          border: `1px solid ${theme.colors.gray[2]}`
        })}
        miw={120}
      >
        <SimpleGrid verticalSpacing="xs">
          <Text size="sm" weight={500}>{label}</Text>
          <SimpleGrid verticalSpacing={2}>
            {
              payload.map(({ name, dataKey, value, color }) => (
                <Group key={`${dataKey}${color}${value}`} position="apart" spacing="xs" noWrap>
                  <Group spacing="xs" noWrap>
                    <ColorSwatch size={8} color={color} withShadow={false} />
                    <Text size="sm" color="dimmed">{name || dataKey}</Text>
                  </Group>
                  <Text size="sm">{value}</Text>
                </Group>
              ))
            }
          </SimpleGrid>
        </SimpleGrid>
      </Box>
    );
  }

  return null
}

export default Tooltip
