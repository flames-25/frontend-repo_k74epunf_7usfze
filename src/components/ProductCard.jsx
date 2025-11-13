import { ShoppingCart } from 'lucide-react'

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition">
      {product.image_url && (
        <img src={product.image_url} alt={product.title} className="h-48 w-full object-cover" />
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{product.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 mt-1">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold">${Number(product.price).toFixed(2)}</span>
          <button onClick={() => onAdd(product)} className="inline-flex items-center gap-2 bg-gray-900 text-white rounded-lg px-3 py-2 hover:bg-black">
            <ShoppingCart className="w-4 h-4" /> Add
          </button>
        </div>
      </div>
    </div>
  )
}
