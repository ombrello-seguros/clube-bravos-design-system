import type { Meta, StoryObj } from '@storybook/react';
import { BravosProductsSection } from './BravosProductsSection';

const meta = {
  title: 'Sections/ProductsSection',
  component: BravosProductsSection,
  parameters: { layout: 'fullscreen' },
  args: { onSignup: () => {} },
} satisfies Meta<typeof BravosProductsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
