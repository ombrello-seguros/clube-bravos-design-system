import { Star } from 'lucide-react';

interface BravosTestimonialProps {
  text: string;
  author: string;
  rating?: number;
}

export function BravosTestimonial({ text, author, rating = 5 }: BravosTestimonialProps) {
  return (
    <div className="bg-white rounded-xl p-8 shadow-lg max-w-3xl mx-auto">
      <p className="text-gray-700 text-lg mb-6 leading-relaxed text-center">
        {text}
      </p>
      <div className="text-center">
        <p className="font-bold text-gray-900 mb-3">{author}</p>
        <div className="flex justify-center gap-1">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-bravos-yellow text-bravos-yellow" />
          ))}
        </div>
      </div>
    </div>
  );
}
