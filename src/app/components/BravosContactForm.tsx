import { useState, FormEvent } from 'react';
import { BravosButton } from './BravosButton';

export function BravosContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Nome"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="px-4 py-3 rounded-lg bg-white border-2 border-gray-200 focus:border-[rgb(0,164,213)] focus:outline-none transition-colors"
          required
        />
        <input
          type="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="px-4 py-3 rounded-lg bg-white border-2 border-gray-200 focus:border-[rgb(0,164,213)] focus:outline-none transition-colors"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="tel"
          placeholder="Telefone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="px-4 py-3 rounded-lg bg-white border-2 border-gray-200 focus:border-[rgb(0,164,213)] focus:outline-none transition-colors"
        />
        <input
          type="text"
          placeholder="Assunto"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="px-4 py-3 rounded-lg bg-white border-2 border-gray-200 focus:border-[rgb(0,164,213)] focus:outline-none transition-colors"
        />
      </div>

      <textarea
        placeholder="Mensagem"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        rows={5}
        className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-200 focus:border-[rgb(0,164,213)] focus:outline-none transition-colors resize-none"
        required
      />

      <div className="flex justify-end">
        <BravosButton type="submit" variant="primary" size="lg">
          Enviar
        </BravosButton>
      </div>
    </form>
  );
}
