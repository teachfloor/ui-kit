import React from 'react';

import { Mantine } from './Mantine';

export default {
  title: 'Example/Mantine',
  component: Mantine,
};

const Template = (args) => <Mantine {...args} />;

export const Test = Template.bind({});
