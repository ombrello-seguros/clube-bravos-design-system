import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { BravosButton } from './BravosButton';
import logo from "../../imports/Logo_Bravos_300.png";

export function BravosHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'O Clube Bravos', href: '#sobre' },
    { label: 'Produtos', href: '#produtos' },
    { label: 'Regulamento', href: '#regulamento' }
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <img src={logo} alt="Clube Bravos" className="h-12" />

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-700 hover:text-[rgb(0,164,213)] transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
            <BravosButton variant="primary" size="sm">
              Entrar
            </BravosButton>
          </nav>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-700 hover:text-[rgb(0,164,213)] transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <BravosButton variant="primary" size="sm" className="w-full">
              Entrar
            </BravosButton>
          </nav>
        )}
      </div>
    </header>
  );
}
