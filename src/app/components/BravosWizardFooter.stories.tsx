import type { Meta, StoryObj } from '@storybook/react';
import { ArrowRight } from 'lucide-react';
import { BravosWizardFooter } from './BravosWizardFooter';
import { BravosButton } from './BravosButton';

const meta = {
  title: 'Components/WizardFooter',
  component: BravosWizardFooter,
  args: { summary: 'v4 · 5 seções · 18 campos', children: null },
} satisfies Meta<typeof BravosWizardFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <BravosWizardFooter {...args}>
      <BravosButton variant="outline">Voltar</BravosButton>
      <BravosButton variant="primary">
        Próximo step <ArrowRight className="w-3.5 h-3.5" /> Revisão
      </BravosButton>
    </BravosWizardFooter>
  ),
};

/** First step — caller simply omits the back button. */
export const FirstStep: Story = {
  render: (args) => (
    <BravosWizardFooter {...args}>
      <BravosButton variant="primary">
        Próximo step <ArrowRight className="w-3.5 h-3.5" /> Dados
      </BravosButton>
    </BravosWizardFooter>
  ),
};

/** Last step — plain submit action. */
export const LastStep: Story = {
  render: (args) => (
    <BravosWizardFooter {...args}>
      <BravosButton variant="outline">Voltar</BravosButton>
      <BravosButton variant="primary">Concluir cadastro</BravosButton>
    </BravosWizardFooter>
  ),
};
