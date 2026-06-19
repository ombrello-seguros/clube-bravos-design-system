import type { Meta, StoryObj } from '@storybook/react';
import { WaveDown, WaveUp } from './Wave';

const meta = {
  title: 'Seções/Wave',
  component: WaveDown,
  parameters: { layout: 'fullscreen' },
  args: { color: 'rgb(0,164,213)' },
  argTypes: { color: { control: 'color' } },
} satisfies Meta<typeof WaveDown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Down: Story = {};
export const Up: Story = { render: (args) => <WaveUp {...args} /> };
