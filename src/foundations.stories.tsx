import type { Meta, StoryObj } from '@storybook/react';
import {
  ArrowRight, MessageCircle, ShieldCheck, Menu, X, ChevronLeft, ChevronRight, ChevronDown,
  Star, Check, CheckCircle2, Clock, Phone, Mail, Zap, Shield, Smile, Car, Video,
  type LucideIcon,
} from 'lucide-react';
import { WaveDown, WaveUp } from './app/components/Wave';
import logoPrimary from './imports/Logo_Bravos_300.png';
import logoSecondary from './imports/Logo_Bravos_secundaria_300_.png';

const meta: Meta = {
  title: 'Foundations',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

const Page = ({ children }: { children: React.ReactNode }) => (
  <div className="p-10 max-w-5xl" style={{ fontFamily: 'var(--font-body)' }}>{children}</div>
);

const BRAND = [
  ['--bravos-cyan', 'Cyan (primária)'],
  ['--bravos-cyan-light', 'Cyan light'],
  ['--bravos-cyan-dark', 'Cyan dark'],
  ['--bravos-purple', 'Purple'],
  ['--bravos-purple-dark', 'Purple dark'],
  ['--bravos-yellow', 'Yellow'],
  ['--bravos-green', 'Green (WhatsApp)'],
  ['--bravos-gray', 'Gray'],
  ['--bravos-gray-light', 'Gray light'],
  ['--bravos-gray-dark', 'Gray dark'],
];

export const Cores: Story = {
  render: () => (
    <Page>
      <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Cores da marca</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {BRAND.map(([token, label]) => (
          <div key={token} className="rounded-lg overflow-hidden border border-black/10">
            <div className="h-24" style={{ background: `var(${token})` }} />
            <div className="p-3">
              <div className="font-medium text-sm">{label}</div>
              <code className="text-xs text-gray-500">{token}</code>
            </div>
          </div>
        ))}
      </div>
    </Page>
  ),
};

const TYPE = [
  ['--text-6xl', '60'], ['--text-5xl', '48'], ['--text-4xl', '36'], ['--text-3xl', '30'],
  ['--text-2xl', '24'], ['--text-xl', '20'], ['--text-lg', '18'], ['--text-base', '16'],
  ['--text-sm', '14'], ['--text-xs', '12'],
];

export const Tipografia: Story = {
  render: () => (
    <Page>
      <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Tipografia</h2>
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-gray-500 mb-1">Títulos · <code>--font-heading</code></p>
          <p className="text-4xl" style={{ fontFamily: 'var(--font-heading)', fontWeight: 700 }}>Poppins Bold</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Corpo · <code>--font-body</code></p>
          <p className="text-xl" style={{ fontFamily: 'var(--font-body)' }}>Arial — texto corrido</p>
        </div>
      </div>
      <div className="space-y-2">
        {TYPE.map(([token, px]) => (
          <div key={token} className="flex items-baseline gap-4 border-b border-black/5 pb-2">
            <code className="text-xs text-gray-500 w-32 shrink-0">{token} · {px}px</code>
            <span style={{ fontSize: `var(${token})`, fontFamily: 'var(--font-heading)' }}>Clube Bravos</span>
          </div>
        ))}
      </div>
    </Page>
  ),
};

const SHADOWS = ['--shadow-sm', '--shadow-md', '--shadow-lg', '--shadow-xl', '--shadow-cyan'];

export const Sombras: Story = {
  render: () => (
    <Page>
      <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Sombras</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
        {SHADOWS.map((token) => (
          <div key={token} className="text-center">
            <div className="h-24 rounded-xl bg-white" style={{ boxShadow: `var(${token})` }} />
            <code className="text-xs text-gray-500 mt-3 block">{token}</code>
          </div>
        ))}
      </div>
    </Page>
  ),
};

const SPACING = [['--s-1', 4], ['--s-2', 8], ['--s-3', 12], ['--s-4', 16], ['--s-5', 24], ['--s-6', 32], ['--s-7', 48], ['--s-8', 64]];

export const Espacamento: Story = {
  render: () => (
    <Page>
      <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Espaçamento (escala 4pt)</h2>
      <div className="space-y-3">
        {SPACING.map(([token, px]) => (
          <div key={token as string} className="flex items-center gap-4">
            <code className="text-xs text-gray-500 w-28 shrink-0">{token} · {px}px</code>
            <div className="h-6 rounded bg-[rgb(0,164,213)]" style={{ width: `var(${token})` }} />
          </div>
        ))}
      </div>
    </Page>
  ),
};

const RADII = ['--r-xs', '--r-sm', '--r-md', '--r-lg', '--r-xl', '--r-2xl', '--r-full'];

export const Radii: Story = {
  render: () => (
    <Page>
      <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Cantos (radii)</h2>
      <div className="grid grid-cols-3 md:grid-cols-7 gap-6">
        {RADII.map((token) => (
          <div key={token} className="text-center">
            <div
              className="h-20 w-20 bg-[rgb(0,164,213)] mx-auto"
              style={{ borderRadius: `var(${token})` }}
            />
            <code className="text-xs text-gray-500 mt-3 block">{token}</code>
          </div>
        ))}
      </div>
    </Page>
  ),
};

const ICONS: [LucideIcon, string][] = [
  [ArrowRight, 'ArrowRight'], [MessageCircle, 'MessageCircle'], [ShieldCheck, 'ShieldCheck'],
  [Shield, 'Shield'], [Smile, 'Smile'], [Car, 'Car'], [Video, 'Video'], [Star, 'Star'],
  [Check, 'Check'], [CheckCircle2, 'CheckCircle2'], [Clock, 'Clock'], [Phone, 'Phone'],
  [Mail, 'Mail'], [Zap, 'Zap'], [Menu, 'Menu'], [X, 'X'],
  [ChevronLeft, 'ChevronLeft'], [ChevronRight, 'ChevronRight'], [ChevronDown, 'ChevronDown'],
];

export const Iconografia: Story = {
  render: () => (
    <Page>
      <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Iconografia</h2>
      <p className="text-sm text-gray-500 mb-6">Set <code>lucide-react</code> usado nos componentes · stroke 2, herda <code>currentColor</code>.</p>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {ICONS.map(([Icon, name]) => (
          <div key={name} className="flex flex-col items-center gap-2 p-4 rounded-lg border border-black/10">
            <Icon className="w-7 h-7 text-[rgb(0,164,213)]" />
            <code className="text-[11px] text-gray-500">{name}</code>
          </div>
        ))}
      </div>
    </Page>
  ),
};

export const Logos: Story = {
  render: () => (
    <Page>
      <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Logotipos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-lg border border-black/10 p-8 flex flex-col items-center gap-4 bg-white">
          <img src={logoPrimary} alt="Logo principal" className="h-28" />
          <span className="text-sm text-gray-500">Principal · vertical</span>
        </div>
        <div className="rounded-lg border border-black/10 p-8 flex flex-col items-center gap-4 bg-white">
          <img src={logoSecondary} alt="Logo secundária" className="h-28" />
          <span className="text-sm text-gray-500">Secundária · horizontal</span>
        </div>
        <div className="rounded-lg p-8 flex flex-col items-center gap-4 bg-[rgb(46,49,146)] md:col-span-2">
          <img src={logoSecondary} alt="Logo em fundo escuro" className="h-20 brightness-0 invert" />
          <span className="text-sm text-white/70">Secundária em fundo escuro (footer) · <code>brightness-0 invert</code></span>
        </div>
      </div>
    </Page>
  ),
};

export const WaveMotif: Story = {
  render: () => (
    <Page>
      <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Wave motif</h2>
      <p className="text-sm text-gray-500 mb-6">Divisores de seção da marca — <code>WaveDown</code> / <code>WaveUp</code>, qualquer cor.</p>
      <div className="space-y-8">
        <div>
          <code className="text-xs text-gray-500">WaveDown · cyan</code>
          <WaveDown color="rgb(0,164,213)" />
        </div>
        <div>
          <code className="text-xs text-gray-500">WaveUp · cyan</code>
          <WaveUp color="rgb(0,164,213)" />
        </div>
        <div>
          <code className="text-xs text-gray-500">WaveUp · purple</code>
          <WaveUp color="rgb(46,49,146)" />
        </div>
      </div>
    </Page>
  ),
};
