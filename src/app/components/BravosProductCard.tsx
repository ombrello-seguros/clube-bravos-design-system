import { clsx } from 'clsx';
import { ArrowRight } from 'lucide-react';

interface BravosProductCardProps {
  image: string;
  title: string;
  description: string;
  onLearnMore?: () => void;
  className?: string;
}

export function BravosProductCard({
  image,
  title,
  description,
  onLearnMore,
  className
}: BravosProductCardProps) {
  return (
    <div className={clsx(
      'bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1',
      className
    )}>
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="font-bold text-xl mb-3 text-gray-900">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {description}
        </p>
        <button
          onClick={onLearnMore}
          className="inline-flex items-center gap-2 text-[rgb(0,164,213)] font-medium hover:gap-3 transition-all duration-200"
        >
          Conheça
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
