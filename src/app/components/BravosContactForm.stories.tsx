import type { Meta, StoryObj } from '@storybook/react';
import { BravosContactForm } from './BravosContactForm';

const meta = {
  title: 'Componentes/ContactForm',
  component: BravosContactForm,
  parameters: { layout: 'fullscreen' },
  // Inputs/captcha are styled for dark sections — preview on the brand purple.
  decorators: [(Story) => <div className="bg-[rgb(46,49,146)] p-12"><div className="max-w-xl mx-auto"><Story /></div></div>],
} satisfies Meta<typeof BravosContactForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
