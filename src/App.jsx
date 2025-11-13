import { useEffect, useMemo, useState } from 'react'
import Hero from './components/Hero'
import ProductCard from './components/ProductCard'
import Cart from './components/Cart'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [cart, setCart] = useState([])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${API_BASE}/api/products`)
      if (!res.ok) throw new Error('Failed to load products')
      const data = await res.json()
      setProducts(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const onAdd = (p) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === p.id)
      if (existing) {
        return prev.map((i) => (i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i))
      }
      return [...prev, { id: p.id, title: p.title, price: p.price, quantity: 1 }]
    })
  }

  const onRemove = (id) => setCart((prev) => prev.filter((i) => i.id !== id))

  const onCheckout = async () => {
    if (cart.length === 0) return
    const order = {
      customer: {
        name: 'Guest Customer',
        email: 'guest@example.com',
        address: '123 Demo Street',
      },
      items: cart.map((c) => ({ product_id: c.id, quantity: c.quantity })),
    }
    try {
      const res = await fetch(`${API_BASE}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      })
      if (!res.ok) throw new Error('Checkout failed')
      const data = await res.json()
      alert(`Order placed! Total: $${data.total}`)
      setCart([])
    } catch (e) {
      alert(e.message)
    }
  }

  const featured = useMemo(() => products.slice(0, 8), [products])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <header className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="text-xl font-extrabold tracking-tight">BlueCommerce</a>
          <nav className="text-sm text-gray-600 flex items-center gap-6">
            <a href="#features" className="hover:text-gray-900">Features</a>
            <a href="/test" className="hover:text-gray-900">Status</a>
            <div className="font-semibold">Cart ({cart.reduce((n, i) => n + i.quantity, 0)})</div>
          </nav>
        </div>
      </header>

      <Hero onShopClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })} />

      <main className="max-w-6xl mx-auto px-6 pb-20">
        <section id="catalog" className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Featured products</h2>
            <button onClick={fetchProducts} className="text-sm text-blue-700">Refresh</button>
          </div>
          {loading ? (
            <p className="text-gray-500">Loading products...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} onAdd={onAdd} />
              ))}
            </div>
          )}
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Your cart</h2>
          <Cart items={cart} onCheckout={onCheckout} onRemove={onRemove} />
        </section>

        <section id="features" className="mt-16 grid md:grid-cols-3 gap-6">
          {[
            { title: 'Fast storefront', text: 'Built with a modern stack for instant page loads.' },
            { title: 'Secure orders', text: 'Server-calculated totals and validated inputs.' },
            { title: 'Scalable database', text: 'Backed by MongoDB for reliable persistence.' },
          ].map((f) => (
            <div key={f.title} className="bg-white rounded-xl border p-5">
              <h3 className="font-semibold text-lg">{f.title}</h3>
              <p className="text-gray-600 mt-1 text-sm">{f.text}</p>
            </div>
          ))}
        </section>
      </main>

      <footer className="border-t py-10 text-center text-sm text-gray-500">© {new Date().getFullYear()} BlueCommerce. All rights reserved.</footer>
    </div>
  )
}
