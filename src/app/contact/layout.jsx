export const metadata = {
    title: 'Contact Us | POD Store',
    description: 'Have questions about custom designs? Need help with your order? Our team is here to help you create something amazing.',
    keywords: 'contact us, custom designs, print on demand, t-shirts, hoodies, jeans, dresses, accessories, online shopping, premium quality',
    authors: [{ name: 'POD Store' }],
    openGraph: {
        title: 'Contact Us | POD Store',
        description: 'Have questions about custom designs? Need help with your order? Our team is here to help you create something amazing.',
        type: 'website',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&h=630&fit=crop',
                width: 1200,
                height: 630,
                alt: 'Contact Us',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contact Us | POD Store',
        description: 'Have questions about custom designs? Need help with your order? Our team is here to help you create something amazing.',
        images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&h=630&fit=crop'],
    },
    alternates: {
        canonical: '/contact',
    },
    robots: {
        index: true,
        follow: true,
    },
}

export default function ContactLayout({ children }) {
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
                        name: 'Contact Us',
                        description: 'Have questions about custom designs? Need help with your order? Our team is here to help you create something amazing.',
                        url: 'https://yourstore.com/contact',
                        mainEntity: {
                            '@type': 'ItemList',
                            name: 'Contact Us',
                            numberOfItems: 12,
                            itemListElement: [
                                {
                                    '@type': 'Product',
                                    name: 'Contact Us',
                                    description: 'Have questions about custom designs? Need help with your order? Our team is here to help you create something amazing.',
                                    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
                                    offers: {
                                        '@type': 'Offer',
                                        price: '0',
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