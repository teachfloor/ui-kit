import React from 'react'

import {
  TeachfloorProvider,
  Button,
  theme,
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
    <Button>This is a Mantine button styled using Teachfloor theme</Button>
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
