import { MessageCircle, X, ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
}

export function WhatsAppButton({
  phoneNumber = '5521968414294',
  message = 'Olá! Gostaria de saber mais sobre o Clube Bravos.'
}: WhatsAppButtonProps) {
  const [open, setOpen] = useState(false);
  const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 w-[60px] h-[60px] bg-bravos-green text-white rounded-full shadow-[0_10px_24px_rgba(37,211,102,0.45)] hover:scale-110 transition-transform duration-200 z-[60] flex items-center justify-center"
        aria-label="Fale via WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 w-[300px] bg-white rounded-xl shadow-2xl z-[61] overflow-hidden border border-black/10">
          <div className="bg-bravos-green px-4 py-3.5 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <MessageCircle className="w-5 h-5" />
              <strong style={{ fontFamily: 'Poppins, Arial, sans-serif' }}>Fale conosco</strong>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Fechar"
              className="p-1 text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-4 text-sm text-gray-600 leading-relaxed">
            <p className="mb-3">
              Olá! 👋 Estamos online de <b>2ª a 6ª, das 9h às 17h</b>. Quer continuar a conversa no WhatsApp?
            </p>
            <a
              href={waUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-bravos-green text-white px-4 py-2.5 rounded-lg font-semibold w-full justify-center"
            >
              Abrir WhatsApp
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
