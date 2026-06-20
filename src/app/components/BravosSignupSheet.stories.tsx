import type { Meta, StoryObj } from '@storybook/react';
import { BravosSignupSheet } from './BravosSignupSheet';

const meta = {
  title: 'Sections/SignupSheet',
  component: BravosSignupSheet,
  parameters: { layout: 'fullscreen' },
  args: { open: true, plan: null, onClose: () => {} },
  argTypes: {
    plan: { control: 'select', options: [null, 'vida', 'dental', 'assist', 'medico', 'completo'] },
  },
} satisfies Meta<typeof BravosSignupSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Fluxo completo a partir da escolha de plano. */
export const Default: Story = {};

/** Aberto já com um plano pré-selecionado (pula direto para os dados). */
export const ComPlano: Story = { args: { plan: 'completo' } };
