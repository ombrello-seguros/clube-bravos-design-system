import type { Meta, StoryObj } from '@storybook/react';
import { BravosLandingPage } from './BravosLandingPage';

const meta = {
  title: 'Páginas/Landing Page',
  component: BravosLandingPage,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof BravosLandingPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Página completa: Header → Hero → Produtos → Como funciona → Depoimentos → Footer + WhatsApp + Signup. */
export const Default: Story = {};
