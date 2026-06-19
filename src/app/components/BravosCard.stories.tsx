import type { Meta, StoryObj } from '@storybook/react';
import { BravosCard } from './BravosCard';

const meta = {
  title: 'Components/Card',
  component: BravosCard,
  args: {
    variant: 'default',
    children: (
      <div>
        <h4 className="font-bold mb-2">Card Padrão</h4>
        <p className="text-sm text-gray-600">Conteúdo do card com sombra e cantos arredondados.</p>
      </div>
    ),
  },
  argTypes: { variant: { control: 'inline-radio', options: ['default', 'highlight'] } },
  decorators: [(Story) => <div className="w-[360px]"><Story /></div>],
} satisfies Meta<typeof BravosCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Highlight: Story = {
  args: {
    variant: 'highlight',
    children: (
      <div>
        <h4 className="font-bold mb-2">Card Destaque</h4>
        <p className="text-sm text-white/90">Gradiente cyan para conteúdo importante.</p>
      </div>
    ),
  },
};
