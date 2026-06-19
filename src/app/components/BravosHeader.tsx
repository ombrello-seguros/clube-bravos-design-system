import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { BravosButton } from './BravosButton';
import logo from "../../imports/Logo_Bravos_secundaria_300_.png";

interface BravosHeaderProps {
  onSignup?: () => void;
}

export function BravosHeader({ onSignup }: BravosHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'O Clube Bravos', href: '#sobre' },
    { label: 'Produtos', href: '#produtos' },
    { label: 'Depoimentos', href: '#depoimentos' }
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-4">
        <div className="flex items-center justify-between">
          <a href="#top">
            <img src={logo} alt="Clube Bravos" className="h-[54px] block" />
          </a>

          <nav className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-700 hover:text-[rgb(0,164,213)] transition-colors font-medium text-[15px]"
              >
                {item.label}
              </a>
            ))}
            <BravosButton variant="primary" size="sm" onClick={onSignup}>
              Quero ser Bravos
            </BravosButton>
          </nav>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-3 border-t border-black/10 pt-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-700 hover:text-[rgb(0,164,213)] transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <BravosButton variant="primary" size="sm" className="w-full" onClick={onSignup}>
              Quero ser Bravos
            </BravosButton>
          </nav>
        )}
      </div>
    </header>
  );
}
