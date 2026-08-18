import type { Meta, StoryObj } from '@storybook/react';
import { BravosSelect } from './BravosSelect';

const meta = {
  title: 'Components/Select',
  component: BravosSelect,
  args: {
    defaultValue: '',
    children: (
      <>
        <option value="">Selecione...</option>
        <option value="M">Masculino</option>
        <option value="F">Feminino</option>
      </>
    ),
  },
  decorators: [(Story) => <div className="w-[320px]"><Story /></div>],
} satisfies Meta<typeof BravosSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const ComErro: Story = { args: { error: true } };
