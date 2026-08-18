import type { Meta, StoryObj } from '@storybook/react';
import { BravosRadioCards } from './BravosRadioCards';

const meta = {
  title: 'Components/RadioCards',
  component: BravosRadioCards,
  args: {
    name: 'forma',
    value: 'boleto',
    onChange: () => {},
    options: [
      { value: 'boleto', label: 'Boleto', description: 'Vence todo dia 10' },
      { value: 'cartao', label: 'Cartão de crédito', description: 'Cobrança recorrente' },
    ],
  },
  decorators: [(Story) => <div className="w-[420px]"><Story /></div>],
} satisfies Meta<typeof BravosRadioCards<string>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const DuasColunas: Story = { args: { columns: 2 } };
export const SemSelecao: Story = { args: { value: undefined } };
