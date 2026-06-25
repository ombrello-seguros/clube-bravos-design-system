import { useState, FormEvent } from 'react';
import { Check } from 'lucide-react';

const inputClass =
  'px-4 py-3 rounded-md border-0 bg-[#e5e7eb] text-[#1a1a1a] text-sm w-full focus:outline-none focus:ring-2 focus:ring-bravos-cyan';

export function BravosContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    captcha: ''
  });
  const [status, setStatus] = useState<null | 'ok' | 'captcha'>(null);

  const set = (k: keyof typeof formData, v: string) =>
    setFormData((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formData.captcha.trim() !== '17') {
      setStatus('captcha');
      return;
    }
    setStatus('ok');
    setTimeout(() => setStatus(null), 4000);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '', captcha: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input className={inputClass} placeholder="Nome" value={formData.name} onChange={(e) => set('name', e.target.value)} required />
        <input className={inputClass} type="email" placeholder="E-mail" value={formData.email} onChange={(e) => set('email', e.target.value)} required />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input className={inputClass} type="tel" placeholder="Telefone" value={formData.phone} onChange={(e) => set('phone', e.target.value)} />
        <input className={inputClass} placeholder="Assunto" value={formData.subject} onChange={(e) => set('subject', e.target.value)} />
      </div>

      <textarea
        className={`${inputClass} min-h-24 resize-y`}
        placeholder="Mensagem"
        value={formData.message}
        onChange={(e) => set('message', e.target.value)}
        required
      />

      <div className="flex items-center justify-end gap-3.5">
        <span className="text-white/85 text-[13px]">
          2 + 15 ={' '}
          <input
            className={`${inputClass} w-[60px] !px-2.5 !py-2 inline-block ml-1.5`}
            value={formData.captcha}
            onChange={(e) => set('captcha', e.target.value)}
            aria-label="Resultado da soma"
          />
        </span>
        <button
          type="submit"
          className="bg-bravos-cyan hover:bg-bravos-cyan-dark text-white px-8 py-3 rounded-md font-semibold text-[15px] transition-colors"
        >
          Enviar
        </button>
      </div>

      {status === 'ok' && (
        <div className="text-[#86efac] bg-[rgba(34,197,94,0.12)] border border-[rgba(134,239,172,0.35)] px-3.5 py-2.5 rounded-md text-sm flex items-center gap-2">
          <Check className="w-4 h-4" />
          Mensagem enviada! Entraremos em contato em breve.
        </div>
      )}
      {status === 'captcha' && (
        <div className="text-[#fca5a5] bg-[rgba(220,38,38,0.12)] border border-[rgba(252,165,165,0.35)] px-3.5 py-2.5 rounded-md text-sm">
          Confira a soma para enviar.
        </div>
      )}
    </form>
  );
}
