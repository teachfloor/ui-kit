import React from 'react';

import { Button } from './Button'
import { IconBrandTwitter } from '../icons'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    color: {
      control: 'select',
      options: [
        'Default',
        'Cyan',
        'Teal',
        'Green',
        'Lime',
        'Yellow',
        'Orange',
        'Dark',
        'Gray',
        'Red',
        'Pink',
        'Grape',
        'Violet',
        'Indigo',
      ],
      mapping: {
        Default: null,
        Cyan: 'cyan',
        Teal: 'teal',
        Green: 'green',
        Lime: 'lime',
        Yellow: 'yellow',
        Orange: 'orange',
        Dark: 'dark',
        Gray: 'gray',
        Red: 'red',
        Pink: 'pink',
        Grape: 'grape',
        Violet: 'violet',
        Indigo: 'indigo',
      },
    },
    variant: {
      control: 'select',
      options: ['Filled', 'Light', 'Outline', 'Default', 'Subtle'],
      mapping: {
        Filled: null,
        Light: 'light',
        Outline: 'outline',
        Default: 'default',
        Subtle: 'subtle',
      },
    },
    loaderPosition: {
      control: 'select',
      options: ['right', 'left', 'center'],
    }
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Button {...args} />;

export const Usage = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Usage.args = {
  children: 'Button',
  disabled: false,
  compact: false,
  uppercase: false,
  loading: false,
  loaderPosition: 'left',
};

export const GradientVariant = Template.bind({});
GradientVariant.args = {
  children: 'Button',
  variant: 'gradient',
  gradient: { from: '#ed6ea0', to: '#ec8c69', deg: 35 },
};

export const WhiteVariant = Template.bind({});
WhiteVariant.args = {
  children: 'Button',
  variant: 'white',
};

export const LoadingState = Template.bind({});
LoadingState.args = {
  children: 'Button',
  loading: true,
  loaderPosition: 'left',
};

const CustomStyleTemplate = (args) => <Button leftIcon={<IconBrandTwitter />} {...args} />;
export const CustomStyle = CustomStyleTemplate.bind({});
CustomStyle.args = {
  children: 'Follow on Twitter',
  styles: (theme) => ({
    root: {
      backgroundColor: '#00acee',
      border: 0,
      height: 42,
      paddingLeft: 20,
      paddingRight: 20,

      '&:hover': {
        backgroundColor: theme.fn.darken('#00acee', 0.05),
      },
    },

    leftIcon: {
      marginRight: 15,
    },
  })
};
