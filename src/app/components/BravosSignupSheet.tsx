import { useState, useEffect } from 'react';
import { X, ArrowRight, Check, CheckCircle2, MessageCircle } from 'lucide-react';
import { BravosButton } from './BravosButton';

interface Plan {
  id: string;
  title: string;
  price: string;
  featured?: boolean;
}

const PLANS: Plan[] = [
  { id: 'vida', title: 'Seguro de Vida', price: 'R$ 19,90/mês' },
  { id: 'dental', title: 'Plano Dental', price: 'R$ 29,90/mês' },
  { id: 'assist', title: 'Assistências 24h', price: 'R$ 24,90/mês' },
  { id: 'medico', title: 'Médico na tela', price: 'R$ 14,90/mês' },
  { id: 'completo', title: 'Clube Completo (4 planos)', price: 'R$ 69,90/mês', featured: true }
];

interface BravosSignupSheetProps {
  open: boolean;
  /** Pre-selected plan id; when set, the flow skips straight to the data step. */
  plan?: string | null;
  onClose: () => void;
  whatsappUrl?: string;
}

const inputClass =
  'px-3.5 py-3 rounded-lg border-2 border-bravos-gray-light text-sm bg-white text-[#1a1a1a] w-full focus:outline-none focus:border-bravos-cyan transition-colors';
const labelText = 'text-[13px] font-medium text-[#1a1a1a] mb-1.5 block';

export function BravosSignupSheet({
  open,
  plan,
  onClose,
  whatsappUrl = 'https://wa.me/5521968414294'
}: BravosSignupSheetProps) {
  const [step, setStep] = useState(0);
  const [chosen, setChosen] = useState(plan || 'completo');
  const [form, setForm] = useState({ name: '', email: '', phone: '', cpf: '' });

  useEffect(() => {
    if (open) {
      setStep(plan ? 1 : 0);
      setChosen(plan || 'completo');
    }
  }, [open, plan]);

  if (!open) return null;

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const valid = form.name.trim() && form.email.includes('@') && form.phone.length >= 8;
  const planObj = PLANS.find((p) => p.id === chosen) || PLANS[0];

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 bg-[rgba(15,23,42,0.55)] backdrop-blur-[2px] z-[70]" />
      <aside
        role="dialog"
        aria-label="Quero ser Bravos"
        className="fixed top-0 right-0 bottom-0 w-[min(480px,100vw)] bg-white z-[71] shadow-2xl flex flex-col overflow-y-auto"
      >
        {/* Header */}
        <div className="px-7 py-5 flex items-center justify-between border-b border-black/10 sticky top-0 bg-white z-[1]">
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-[0.08em] font-semibold">
              Passo {step + 1} de 3
            </div>
            <h3 className="mt-0.5 text-xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'Poppins, Arial, sans-serif' }}>
              {step === 0 && 'Escolha seu plano'}
              {step === 1 && 'Seus dados'}
              {step === 2 && 'Tudo pronto!'}
            </h3>
          </div>
          <button onClick={onClose} aria-label="Fechar" className="text-gray-500 p-1.5">
            <X className="w-[22px] h-[22px]" />
          </button>
        </div>

        {/* progress */}
        <div className="flex gap-1 px-7 mt-3.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`flex-1 h-1 rounded-sm transition-colors ${
                i <= step ? 'bg-bravos-cyan' : 'bg-bravos-gray-light'
              }`}
            />
          ))}
        </div>

        {/* Body */}
        <div className="px-7 py-6 flex-1">
          {step === 0 && (
            <div className="flex flex-col gap-2.5">
              {PLANS.map((p) => {
                const selected = chosen === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setChosen(p.id)}
                    className={`text-left rounded-xl px-4 py-3.5 flex items-center gap-3.5 border-2 transition-all ${
                      selected ? 'border-bravos-cyan bg-bravos-cyan/[0.07]' : 'border-bravos-gray-light bg-white'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full border-2 inline-flex items-center justify-center shrink-0 ${
                        selected ? 'border-bravos-cyan' : 'border-[#d1d5db]'
                      }`}
                    >
                      {selected && <span className="w-2.5 h-2.5 rounded-full bg-bravos-cyan" />}
                    </span>
                    <span className="flex-1">
                      <span className="block font-bold text-bravos-purple text-[15px]" style={{ fontFamily: 'Poppins, Arial, sans-serif' }}>
                        {p.title}
                        {p.featured && (
                          <span className="ml-2 text-[11px] px-2 py-0.5 rounded-full bg-bravos-yellow text-[#7a5a00] font-bold tracking-[0.04em] uppercase align-middle">
                            Mais escolhido
                          </span>
                        )}
                      </span>
                      <span className="text-[13px] text-gray-500">{p.price}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {step === 1 && (
            <div className="flex flex-col gap-3.5">
              <div className="bg-bravos-cyan/[0.07] border border-[rgba(0,164,213,0.20)] rounded-md px-3.5 py-2.5 text-[13px] text-gray-600 flex items-center gap-2.5">
                <CheckCircle2 className="w-[18px] h-[18px] text-bravos-cyan" />
                <span>
                  Plano selecionado: <b className="text-bravos-purple">{planObj.title}</b> — {planObj.price}
                </span>
              </div>
              <label className="block">
                <span className={labelText}>Nome completo</span>
                <input className={inputClass} value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Como devemos te chamar" />
              </label>
              <label className="block">
                <span className={labelText}>E-mail</span>
                <input className={inputClass} type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="voce@email.com" />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label>
                  <span className={labelText}>Celular</span>
                  <input className={inputClass} value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="(21) 9 0000-0000" />
                </label>
                <label>
                  <span className={labelText}>CPF (opcional)</span>
                  <input className={inputClass} value={form.cpf} onChange={(e) => set('cpf', e.target.value)} placeholder="000.000.000-00" />
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Ao continuar você concorda com nossos termos. A contratação é feita 100% online — sem ligação, sem corretor.
              </p>
            </div>
          )}

          {step === 2 && (
            <div className="text-center py-3">
              <div className="w-[84px] h-[84px] rounded-full bg-[rgba(37,211,102,0.14)] mx-auto mt-2 mb-[18px] flex items-center justify-center">
                <Check className="w-10 h-10 text-bravos-green" strokeWidth={3} />
              </div>
              <h4 className="font-bold text-[#1a1a1a] text-[22px] mb-2" style={{ fontFamily: 'Poppins, Arial, sans-serif' }}>
                Bem-vindo(a) ao Clube Bravos!
              </h4>
              <p className="text-gray-600 mb-[22px] leading-snug">
                Enviamos as instruções para <b>{form.email || 'seu e-mail'}</b>. Em alguns minutos seu plano{' '}
                <b>{planObj.title}</b> já estará ativo.
              </p>
              <div className="bg-[#fafafa] border border-black/10 rounded-xl px-5 py-[18px] text-left">
                <p className="text-[13px] font-bold text-[#1a1a1a] mb-1.5">Precisa de ajuda?</p>
                <p className="text-[13px] text-gray-600 mb-2.5">
                  Continue a conversa pelo WhatsApp — é o nosso canal principal.
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-bravos-green text-white px-4 py-2.5 rounded-lg font-semibold text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  Falar no WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-7 pt-4 pb-5 border-t border-black/10 flex justify-between gap-3 bg-white sticky bottom-0">
          {step === 0 && (
            <>
              <button onClick={onClose} className="text-gray-500 px-4 py-3 font-medium text-sm">
                Cancelar
              </button>
              <BravosButton onClick={() => setStep(1)}>
                Continuar
                <ArrowRight className="w-4 h-4" />
              </BravosButton>
            </>
          )}
          {step === 1 && (
            <>
              <button onClick={() => setStep(0)} className="text-gray-500 px-4 py-3 font-medium text-sm">
                Voltar
              </button>
              <BravosButton
                onClick={() => valid && setStep(2)}
                className={valid ? '' : 'opacity-50 !cursor-not-allowed'}
              >
                Contratar {planObj.price.split('/')[0]}
                <Check className="w-4 h-4" />
              </BravosButton>
            </>
          )}
          {step === 2 && (
            <BravosButton onClick={onClose} className="ml-auto">
              Concluir
            </BravosButton>
          )}
        </div>
      </aside>
    </>
  );
}
