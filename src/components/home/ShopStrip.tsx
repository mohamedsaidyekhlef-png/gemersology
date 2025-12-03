import React from 'react';
import { ShoppingBag, Star, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';

const products = [
  { 
    id: 1, 
    name: 'Logitech G Pro X', 
    category: 'Headset', 
    price: '$129.99', 
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=300&h=300' 
  },
  { 
    id: 2, 
    name: 'Razer Viper V2 Pro', 
    category: 'Mouse', 
    price: '$149.99', 
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&q=80&w=300&h=300' 
  },
  { 
    id: 3, 
    name: 'Wooting 60HE', 
    category: 'Keyboard', 
    price: '$174.99', 
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=300&h=300' 
  },
];

export const ShopStrip = () => {
  return (
    <section className="py-16 bg-brand-darker">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl font-bold mb-1">Pro Gear Setup</h2>
            <p className="text-gray-400 text-sm">Used by top 1% of tracked players</p>
          </div>
          <Link to="/shop">
            <Button variant="ghost" className="hidden md:flex">
              Visit Shop <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="group bg-brand-surface rounded-xl p-4 border border-white/5 hover:border-brand-gold/30 transition-all">
              <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-black/20 relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur px-2 py-1 rounded text-xs font-bold text-brand-gold flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" /> {product.rating}
                </div>
              </div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{product.category}</p>
                  <h3 className="font-bold text-lg leading-tight">{product.name}</h3>
                </div>
                <span className="font-mono text-brand-gold font-bold">{product.price}</span>
              </div>
              <Link to="/shop">
                <Button variant="secondary" size="sm" className="w-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  Check Price
                </Button>
              </Link>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Link to="/shop">
            <Button variant="ghost">View All Gear</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
