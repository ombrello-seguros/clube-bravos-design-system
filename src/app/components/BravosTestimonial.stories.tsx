import type { Meta, StoryObj } from '@storybook/react';
import { BravosTestimonial } from './BravosTestimonial';

const meta = {
  title: 'Components/Testimonial',
  component: BravosTestimonial,
  parameters: { layout: 'fullscreen' },
  args: {
    text: 'Não recusa cobertura nenhuma, as autorizações saem super rápido e nunca tenho dor de cabeça. Faço meu tratamento e indico sem medo nenhum.',
    author: 'Charles Vinícius Brito',
    rating: 5,
  },
  decorators: [(Story) => <div className="p-12 bg-gray-50"><Story /></div>],
} satisfies Meta<typeof BravosTestimonial>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
