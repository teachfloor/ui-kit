import React, { useState } from 'react'

import {
  TeachfloorProvider,
  Box,
  ProgressDots,
} from './'

export default {
  title: 'Components/ProgressDots',
  component: ProgressDots,
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
  argTypes: {
    loading: { control: 'boolean' },
    dots: { control: 'text' },
    progress: { control: 'text' },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
  },
}

const ProgressDotsTemplate = (args) => (
  <TeachfloorProvider>
    <Box sx={{ maxHeight: args.height }}>
      <ProgressDots {...args} />
    </Box>
  </TeachfloorProvider>
)

export const Usage = ProgressDotsTemplate.bind({})

Usage.args = {
  children: null,
  withBorder: false,
  borderRadius: 'sm',
  shadow: 'sm',
  horizontalSpacing: 'xs',
  verticalSpacing: 'xs',
  fontSize: 'sm',
  verticalAlignment: 'center',
  textSelectionDisabled: false,
  height: 800,
  // notificationsProps: {},
  // modalsProps: {},
  // spotlightProps: {},
}