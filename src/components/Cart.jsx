import { useMemo } from 'react'

export default function Cart({ items, onCheckout, onRemove }) {
  const total = useMemo(() => {
    return items.reduce((sum, it) => sum + it.price * it.quantity, 0)
  }, [items])

  if (items.length === 0) {
    return (
      <div className="bg-white border border-dashed border-gray-300 rounded-xl p-6 text-center text-gray-500">
        Your cart is empty.
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="divide-y">
        {items.map((it) => (
          <div key={it.id} className="py-3 flex items-center justify-between">
            <div>
              <p className="font-medium">{it.title}</p>
              <p className="text-sm text-gray-500">Qty {it.quantity} • ${Number(it.price).toFixed(2)}</p>
            </div>
            <button className="text-red-600 text-sm" onClick={() => onRemove(it.id)}>Remove</button>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between pt-4 mt-2 border-t">
        <p className="font-semibold">Total</p>
        <p className="font-bold">${total.toFixed(2)}</p>
      </div>
      <button onClick={onCheckout} className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg">Checkout</button>
    </div>
  )
}
