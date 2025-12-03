import React from 'react';
import { ShoppingBag, Filter, Star, ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/Button';

const products = [
  { id: 1, name: 'Logitech G Pro X', category: 'Headset', price: '$129.99', rating: 4.8, image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: 2, name: 'Razer Viper V2 Pro', category: 'Mouse', price: '$149.99', rating: 4.9, image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: 3, name: 'Wooting 60HE', category: 'Keyboard', price: '$174.99', rating: 5.0, image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: 4, name: 'Zowie XL2546K', category: 'Monitor', price: '$499.00', rating: 4.9, image: 'https://images.unsplash.com/photo-1547394765-185e1e68f34e?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: 5, name: 'Secretlab Titan Evo', category: 'Chair', price: '$549.00', rating: 4.7, image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: 6, name: 'Finalmouse UltralightX', category: 'Mouse', price: '$189.00', rating: 4.6, image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&q=80&w=300&h=300' },
];

export const ShopPage = () => {
  
  const handleBuyClick = (productName: string) => {
    // Simulate external affiliate link
    alert(`Redirecting to Amazon for: ${productName}`);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-brand-dark">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">Pro Gear Shop</h1>
            <p className="text-gray-400">Equipment used by the top 1% of players.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" icon={<Filter className="w-4 h-4" />}>Filters</Button>
            <Button icon={<ShoppingBag className="w-4 h-4" />}>View Cart (0)</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="group bg-brand-surface rounded-xl p-4 border border-white/5 hover:border-brand-gold/30 transition-all flex flex-col">
              <div className="aspect-square rounded-lg overflow-hidden mb-4 bg-black/20 relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur px-2 py-1 rounded text-xs font-bold text-brand-gold flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" /> {product.rating}
                </div>
              </div>
              
              <div className="mb-4 flex-1">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{product.category}</p>
                <h3 className="font-bold text-lg leading-tight mb-2">{product.name}</h3>
                <span className="font-mono text-brand-gold font-bold text-xl">{product.price}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-auto">
                <Button variant="secondary" size="sm">Details</Button>
                <Button 
                  variant="primary" 
                  size="sm" 
                  icon={<ExternalLink className="w-3 h-3" />}
                  onClick={() => handleBuyClick(product.name)}
                >
                  Buy Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
