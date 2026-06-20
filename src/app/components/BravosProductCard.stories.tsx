import type { Meta, StoryObj } from '@storybook/react';
import { BravosProductCard } from './BravosProductCard';

const meta = {
  title: 'Components/ProductCard',
  component: BravosProductCard,
  parameters: { layout: 'centered' },
  args: {
    title: 'Seguro de Vida',
    description: 'Você protegido em vida, e sua família tranquila em qualquer situação.',
    imageBackground: 'linear-gradient(135deg,#fde68a 0%,#f59e0b 60%,#92400e 100%)',
  },
  decorators: [(Story) => <div className="w-[300px]"><Story /></div>],
} satisfies Meta<typeof BravosProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Variante simples (compatível com a API original): imagem por URL + link "Conheça". */
export const Simples: Story = {
  args: {
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop',
    imageBackground: undefined,
    onLearnMore: () => {},
  },
};

/** Variante do portal: preço + CTA "Quero esse plano" + estado ativo. */
export const ComPlano: Story = {
  args: { price: 'R$ 19,90/mês', onSignup: () => {}, onLearnMore: () => {} },
};

export const Ativo: Story = {
  args: { price: 'R$ 19,90/mês', active: true, onSignup: () => {}, onLearnMore: () => {} },
};
