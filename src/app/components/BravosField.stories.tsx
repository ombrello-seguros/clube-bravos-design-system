import type { Meta, StoryObj } from '@storybook/react';
import { BravosField } from './BravosField';
import { BravosInput } from './BravosInput';

const meta = {
  title: 'Components/Field',
  component: BravosField,
  args: { label: 'Nome completo', htmlFor: 'nome', children: <BravosInput id="nome" placeholder="Digite seu nome" /> },
  decorators: [(Story) => <div className="w-[320px]"><Story /></div>],
} satisfies Meta<typeof BravosField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Obrigatorio: Story = { args: { required: true } };
export const ComDica: Story = { args: { hint: 'Como está no documento' } };
export const ComErro: Story = {
  args: { required: true, error: 'Este campo é obrigatório', children: <BravosInput id="nome" error placeholder="Digite seu nome" /> },
};
