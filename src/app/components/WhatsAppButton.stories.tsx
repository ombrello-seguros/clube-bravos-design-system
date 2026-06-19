import type { Meta, StoryObj } from '@storybook/react';
import { WhatsAppButton } from './WhatsAppButton';

const meta = {
  title: 'Componentes/WhatsAppButton',
  component: WhatsAppButton,
  parameters: { layout: 'fullscreen' },
  // Button is position:fixed — give it a tall canvas to anchor to.
  decorators: [(Story) => <div className="relative h-[320px] bg-gray-50"><Story /></div>],
} satisfies Meta<typeof WhatsAppButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
