import type { Meta, StoryObj } from '@storybook/react';
import { BravosHero } from './BravosHero';

const meta = {
  title: 'Sections/Hero',
  component: BravosHero,
  parameters: { layout: 'fullscreen' },
  args: { onSignup: () => {} },
} satisfies Meta<typeof BravosHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
