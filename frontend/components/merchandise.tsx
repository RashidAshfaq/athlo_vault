"use client"
import { ShoppingCart, Star, Truck } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type Product = {
  id: number
  name: string
  price: number
  originalPrice: number
  image: string
  rating: number
  reviews: number
  badge?: string
  description: string
}

const merchandiseItems: Product[] = [
  {
    id: 1,
    name: "AthloVault Championship Jersey",
    price: 89.99,
    originalPrice: 119.99,
    image: "/placeholder.svg?height=300&width=300&text=Championship+Jersey",
    rating: 4.8,
    reviews: 124,
    badge: "Best Seller",
    description: "Premium quality jersey worn by our top athletes",
  },
  {
    id: 2,
    name: "Performance Training Shorts",
    price: 49.99,
    originalPrice: 69.99,
    image: "/placeholder.svg?height=300&width=300&text=Training+Shorts",
    rating: 4.6,
    reviews: 89,
    badge: "New",
    description: "Moisture-wicking fabric for optimal performance",
  },
  {
    id: 3,
    name: "AthloVault Water Bottle",
    price: 24.99,
    originalPrice: 34.99,
    image: "/placeholder.svg?height=300&width=300&text=Water+Bottle",
    rating: 4.9,
    reviews: 203,
    badge: "Eco-Friendly",
    description: "Sustainable stainless steel with temperature control",
  },
  {
    id: 4,
    name: "Athletic Performance Hoodie",
    price: 79.99,
    originalPrice: 99.99,
    image: "/placeholder.svg?height=300&width=300&text=Performance+Hoodie",
    rating: 4.7,
    reviews: 156,
    badge: "Limited Edition",
    description: "Comfortable hoodie perfect for training and casual wear",
  },
]

export function Merchandise() {
  return (
    <section className="py-20 bg-slate-900/50" id="merch">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Official AthloVault
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              Merchandise
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Show your support for tomorrow's champions with our exclusive collection of premium athletic wear and
            accessories
          </p>
        </div>

        {/* Merchandise Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {merchandiseItems.map((item) => (
            <Card
              key={item.id}
              className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 group"
            >
              <CardContent className="p-0">
                {/* Product Image */}
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {item.badge && (
                    <Badge
                      className={`absolute top-3 left-3 ${
                        item.badge === "Best Seller"
                          ? "bg-amber-500 text-slate-900"
                          : item.badge === "New"
                            ? "bg-green-500 text-white"
                            : item.badge === "Limited Edition"
                              ? "bg-purple-500 text-white"
                              : "bg-blue-500 text-white"
                      }`}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-amber-400 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-slate-400 text-sm mb-3 line-clamp-2">{item.description}</p>

                  {/* Rating */}
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(item.rating) ? "text-amber-400 fill-current" : "text-slate-600"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-slate-400 text-sm">
                      {item.rating} ({item.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-white font-bold text-xl">${item.price}</span>
                    <span className="text-slate-500 line-through text-sm">${item.originalPrice}</span>
                    <Badge variant="outline" className="border-green-500 text-green-400 text-xs">
                      Save ${(item.originalPrice - item.price).toFixed(2)}
                    </Badge>
                  </div>

                  {/* Add to Cart Button */}
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Free Shipping</h3>
            <p className="text-slate-400">Free shipping on orders over $75</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Premium Quality</h3>
            <p className="text-slate-400">High-quality materials used by professional athletes</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Easy Returns</h3>
            <p className="text-slate-400">30-day return policy on all merchandise</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3">
            <ShoppingCart className="h-5 w-5 mr-2" />
            Shop All Merchandise
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Merchandise
