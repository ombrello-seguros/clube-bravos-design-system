import type { Meta, StoryObj } from '@storybook/react';
import { BravosHeader } from './BravosHeader';

const meta = {
  title: 'Seções/Header',
  component: BravosHeader,
  parameters: { layout: 'fullscreen' },
  args: { onSignup: () => {} },
} satisfies Meta<typeof BravosHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
