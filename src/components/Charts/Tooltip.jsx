import React from 'react'

import {
  Box,
  Text,
  Group,
  ColorSwatch,
  SimpleGrid,
} from '../../'

const Tooltip = ({ active, payload, label, formatters, ...props }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        p="md"
        py={6}
        radius="sm"
        sx={(theme) => ({
          backgroundColor: '#FFF',
          borderRadius: theme.radius.sm,
          boxShadow: theme.shadows.sm,
          border: `1px solid ${theme.colors.gray[2]}`
        })}
        miw={120}
      >
        <SimpleGrid verticalSpacing={4}>
          {label ? <Text size="sm" weight={500}>{label}</Text> : null}
          <SimpleGrid verticalSpacing={0}>
            {
              payload.map(({ name, dataKey, value, color, payload }) => (
                <Group key={`${dataKey}${color}${value}`} position="apart" spacing="lg" noWrap>
                  <Group spacing="xs" noWrap>
                    <ColorSwatch size={8} color={color || payload.fill} withShadow={false} />
                    <Text size="sm" color="dimmed">{name || dataKey}</Text>
                  </Group>
                  <Text size="sm">
                    {
                      (formatters && formatters[dataKey])
                        ? formatters[dataKey](value)
                        : value
                    }
                  </Text>
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
