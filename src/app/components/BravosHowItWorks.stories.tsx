import type { Meta, StoryObj } from '@storybook/react';
import { BravosHowItWorks } from './BravosHowItWorks';

const meta = {
  title: 'Seções/HowItWorks',
  component: BravosHowItWorks,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof BravosHowItWorks>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
