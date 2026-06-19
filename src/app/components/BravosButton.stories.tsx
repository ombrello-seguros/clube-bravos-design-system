import type { Meta, StoryObj } from '@storybook/react';
import { BravosButton } from './BravosButton';

const meta = {
  title: 'Componentes/Button',
  component: BravosButton,
  args: { children: 'Quero ser Bravos', variant: 'primary', size: 'md' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'outline', 'ghost'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof BravosButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Outline: Story = { args: { variant: 'outline' } };
export const Ghost: Story = { args: { variant: 'ghost' } };

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <BravosButton {...args} size="sm">Pequeno</BravosButton>
      <BravosButton {...args} size="md">Médio</BravosButton>
      <BravosButton {...args} size="lg">Grande</BravosButton>
    </div>
  ),
};
