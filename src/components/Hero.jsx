import { ShoppingCart, Rocket } from 'lucide-react'

export default function Hero({ onShopClick }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-70" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-70" />

      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm mb-6">
          <Rocket className="w-4 h-4" /> Launch your store in minutes
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900">
          Ecommerce website for modern online businesses
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Showcase products, accept orders, and manage everything from one easy place. Fast, secure, and beautiful by default.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <button onClick={onShopClick} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-lg shadow">
            <ShoppingCart className="w-5 h-5" /> Browse products
          </button>
          <a href="#features" className="font-semibold text-gray-700 hover:text-gray-900">See features</a>
        </div>
      </div>
    </section>
  )
}
