import React from 'react'

import {
  TeachfloorProvider,
  useTeachfloorTheme,
  theme,

  Flex,
  Button,
  Chip,
  Tooltip,
  ColorInput,
  Avatar,
  Indicator,
  Badge,
  Alert,
  IconAlertCircle,
  Loader,
  Paper,
  Text,
  Card,
  Image,
  Group,
  Grid,
  showNotification,
} from './'

/**
 * More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
 */
export default {
  title: 'Core/Theme',
  component: TeachfloorProvider,

  /**
   * More on argTypes: https://storybook.js.org/docs/react/api/argtypes
   */
  argTypes: {},
}

/**
 * More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
 */
const TeachfloorProviderTemplate = (args) => (
  <TeachfloorProvider {...args}>
    <Flex
      gap="lg"
      direction="column"
      align="flex-start"
      wrap="wrap"
    >
      <Button>This is a Mantine button styled using Teachfloor theme</Button>
      <Button
        variant="outline"
        onClick={() =>
          showNotification({
            title: 'Default notification',
            message: 'Hey there, your code is awesome! 🤥',
          })
        }
      >
        Trigger a notification
      </Button>
      <Tooltip label="Tooltip">
        <Button variant="light">Button with tooltip</Button>
      </Tooltip>
      <Chip variant="filled" defaultChecked>Awesome chip</Chip>
      <ColorInput
        defaultValue="#C5D899"
        placeholder="Pick color"
        label="Your favorite color"
      />
      <Indicator
        inline
        dot
        size={16}
        offset={7}
        position="bottom-end"
        withBorder
        processing
      >
        <Avatar
          size="lg"
          src="https://avatars.githubusercontent.com/u/15775541?v=4"
          radius="xl"
          alt="it's me"
        />
      </Indicator>
      <Alert icon={<IconAlertCircle size={16} />} title="Bummer!" color="red">
        Something terrible happened! You made a mistake and there is no going back, your data was lost forever!
      </Alert>
      <Loader />
      <Paper shadow="xs" p="md">
        <Text>Paper is the most basic ui component</Text>
        <Text>
          Use it to create cards, dropdowns, modals and other components that require background
          with shadow
        </Text>
      </Paper>
      <Badge>Badge</Badge>
      <Grid>
        <Grid.Col span={5}>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Card.Section>
              <Image
                src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                height={160}
                alt="Norway"
              />
            </Card.Section>

            <Group position="apart" mt="md" mb="xs">
              <Text weight={500}>Norway Fjord Adventures</Text>
              <Badge color="pink" variant="light">
                On Sale
              </Badge>
            </Group>

            <Text size="sm" color="dimmed">
              With Fjord Tours you can explore more of the magical fjord landscapes with tours and
              activities on and around the fjords of Norway
            </Text>

            <Button variant="light" color="blue" fullWidth mt="md" radius="md">
              Book classic tour now
            </Button>
          </Card>
        </Grid.Col>
      </Grid>
    </Flex>
  </TeachfloorProvider>
)

export const ThemeProvider = TeachfloorProviderTemplate.bind({})

/**
 * More on args: https://storybook.js.org/docs/react/writing-stories/args
 */
ThemeProvider.args = {
  children: null,
  mantineProps: {
    theme: { ...theme }
  },
  notificationsProps: {},
  modalsProps: {},
  spotlightProps: {},
}




const CustomCard = () => {
  const theme = useTeachfloorTheme()
  return (
    <Card style={{ background: theme.colors.brand[1] }}>
      See code for more details on usage
    </Card>
  )
}

/**
 * More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
 */
const TeachfloorThemeTemplate = (args) => (
  <TeachfloorProvider>
    <CustomCard />
  </TeachfloorProvider>
)

export const ThemeHook = TeachfloorThemeTemplate.bind({})

/**
 * More on args: https://storybook.js.org/docs/react/writing-stories/args
 */
ThemeHook.args = {}

ThemeHook.parameters = {
  docs: {
    description: {
      story: '`useTeachfloorTheme` hook returns the theme from the TeachfloorProvider context or default theme if you did not provide theme override. This hook is a wrapper around `useMantineTheme` https://mantine.dev/theming/theme-object/#use-mantine-theme-hook',
    },
  },
}