import { clsx } from 'clsx';
import { ArrowRight, ChevronDown } from 'lucide-react';

interface BravosProductCardProps {
  /** Image URL rendered as <img>. Use `imageBackground` for a CSS gradient instead. */
  image?: string;
  /** CSS background value (e.g. a gradient) used in place of `image`. */
  imageBackground?: string;
  title: string;
  /** Optional "a partir de" price line, e.g. "R$ 19,90/mês". */
  price?: string;
  description: string;
  onLearnMore?: () => void;
  /** Optional primary CTA ("Quero esse plano"). Shown only when provided. */
  onSignup?: () => void;
  /** Elevated/active state (used by BravosProductsSection). */
  active?: boolean;
  className?: string;
}

export function BravosProductCard({
  image,
  imageBackground,
  title,
  price,
  description,
  onLearnMore,
  onSignup,
  active = false,
  className
}: BravosProductCardProps) {
  return (
    <div
      onClick={onLearnMore}
      className={clsx(
        'bg-white rounded-xl overflow-hidden flex flex-col transition-all duration-300',
        onLearnMore && 'cursor-pointer',
        active ? 'shadow-2xl -translate-y-1.5' : 'shadow-lg hover:shadow-2xl hover:-translate-y-1',
        className
      )}
    >
      <div className="aspect-[16/10] w-full overflow-hidden">
        {imageBackground ? (
          <div className="w-full h-full" style={{ background: imageBackground }} />
        ) : (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        )}
      </div>
      <div className="px-6 pt-5 pb-6 text-center">
        <h3 className="font-bold text-[22px] mb-1 text-bravos-purple" style={{ fontFamily: 'Poppins, Arial, sans-serif' }}>
          {title}
        </h3>
        {price && (
          <p className="text-bravos-cyan font-bold text-sm mb-2.5" style={{ fontFamily: 'Poppins, Arial, sans-serif' }}>
            a partir de <span className="text-lg">{price}</span>
          </p>
        )}
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {description}
        </p>
        <div className="flex flex-col gap-2 items-center">
          {onSignup ? (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); onSignup(); }}
                className="inline-flex items-center gap-1.5 bg-bravos-cyan hover:bg-bravos-cyan-dark text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors"
              >
                Quero esse plano
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <span className="inline-flex items-center gap-1 text-bravos-purple font-semibold text-[13px]">
                ver detalhes <ChevronDown className="w-3 h-3" />
              </span>
            </>
          ) : (
            <button
              onClick={onLearnMore}
              className="inline-flex items-center gap-2 text-bravos-cyan font-medium hover:gap-3 transition-all duration-200"
            >
              Conheça
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
