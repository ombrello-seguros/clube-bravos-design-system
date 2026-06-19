import type { Meta, StoryObj } from '@storybook/react';
import { BravosInput } from './BravosInput';

const meta = {
  title: 'Componentes/Input',
  component: BravosInput,
  args: { label: 'Nome completo', placeholder: 'Digite seu nome' },
  decorators: [(Story) => <div className="w-[320px]"><Story /></div>],
} satisfies Meta<typeof BravosInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Email: Story = { args: { label: 'E-mail', type: 'email', placeholder: 'voce@email.com' } };
export const ComErro: Story = { args: { label: 'Campo obrigatório', error: 'Este campo é obrigatório', placeholder: 'Campo com erro' } };
