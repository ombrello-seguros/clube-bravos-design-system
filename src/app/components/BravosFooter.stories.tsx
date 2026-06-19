import type { Meta, StoryObj } from '@storybook/react';
import { BravosFooter } from './BravosFooter';

const meta = {
  title: 'Seções/Footer',
  component: BravosFooter,
  parameters: { layout: 'fullscreen' },
  args: { onSignup: () => {} },
} satisfies Meta<typeof BravosFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
