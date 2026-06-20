import type { Meta, StoryObj } from '@storybook/react';
import { BravosBadge } from './BravosBadge';

const meta = {
  title: 'Components/Badge',
  component: BravosBadge,
  args: { children: 'Novo', variant: 'primary' },
  argTypes: { variant: { control: 'inline-radio', options: ['primary', 'secondary', 'gray'] } },
} satisfies Meta<typeof BravosBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Secondary: Story = { args: { variant: 'secondary', children: 'Destaque' } };
export const Gray: Story = { args: { variant: 'gray', children: 'Informação' } };

export const Todos: Story = {
  render: () => (
    <div className="flex gap-3">
      <BravosBadge variant="primary">Novo</BravosBadge>
      <BravosBadge variant="secondary">Destaque</BravosBadge>
      <BravosBadge variant="gray">Informação</BravosBadge>
    </div>
  ),
};
