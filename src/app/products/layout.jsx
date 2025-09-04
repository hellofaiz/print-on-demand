export const metadata = {
  title: 'Premium Clothing & Accessories | Our Products Collection',
  description: 'Discover our amazing collection of high-quality clothing and accessories. Shop t-shirts, hoodies, jeans, dresses, and more with fast shipping and great prices.',
  keywords: 'clothing, fashion, t-shirts, hoodies, jeans, dresses, accessories, online shopping, premium quality',
  authors: [{ name: 'Your Store Name' }],
  openGraph: {
    title: 'Premium Clothing & Accessories | Our Products Collection',
    description: 'Discover our amazing collection of high-quality clothing and accessories. Shop t-shirts, hoodies, jeans, dresses, and more.',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Premium Clothing Collection',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Premium Clothing & Accessories | Our Products Collection',
    description: 'Discover our amazing collection of high-quality clothing and accessories.',
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&h=630&fit=crop'],
  },
  alternates: {
    canonical: '/products',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function ProductsLayout({ children }) {
  return (
    <>
      {children}
      {/* JSON-LD structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Premium Clothing & Accessories Collection',
            description: 'Discover our amazing collection of high-quality clothing and accessories.',
            url: 'https://yourstore.com/products',
            mainEntity: {
              '@type': 'ItemList',
              name: 'Products',
              numberOfItems: 12,
              itemListElement: [
                {
                  '@type': 'Product',
                  name: 'Classic Cotton T-Shirt',
                  description: 'Comfortable 100% cotton t-shirt perfect for everyday wear.',
                  image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
                  offers: {
                    '@type': 'Offer',
                    price: '24.99',
                    priceCurrency: 'USD',
                    availability: 'https://schema.org/InStock',
                  },
                },
                // Add more products as needed
              ],
            },
          }),
        }}
      />
    </>
  )
} 