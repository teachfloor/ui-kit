import React from 'react'

import {
  TeachfloorProvider,
  Flex,
  Button,
  Chip,
  Tooltip,
  ColorInput,
  Avatar,
  Indicator,
  Alert,
  IconAlertCircle,
  Loader,
  Paper,
  Text,
  theme,
  showNotification,
} from '../'

/**
 * More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
 */
export default {
  title: 'Core/TeachfloorProvider',
  component: TeachfloorProvider,

  /**
   * More on argTypes: https://storybook.js.org/docs/react/api/argtypes
   */
  argTypes: {},
};

/**
 * More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
 */
const Template = (args) => (
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
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
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
    </Flex>
  </TeachfloorProvider>
);

export const Usage = Template.bind({});

/**
 * More on args: https://storybook.js.org/docs/react/writing-stories/args
 */
Usage.args = {
  children: null,
  mantineProps: {
    theme: { ...theme }
  },
  notificationsProps: {},
  modalsProps: {},
  spotlightProps: {},
};
