import type { Meta, StoryObj } from '@storybook/react';
import { BravosTestimonials } from './BravosTestimonials';

const meta = {
  title: 'Sections/Testimonials',
  component: BravosTestimonials,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof BravosTestimonials>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
