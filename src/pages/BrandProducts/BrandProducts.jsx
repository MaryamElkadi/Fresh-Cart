import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Loading from '../../components/Loading/Loading'
import Card from '../../components/Card/Card'
import { useParams, Link } from 'react-router-dom'

export default function BrandProducts() {
    const { brandId } = useParams()

    const { data: brandData, isLoading: brandLoading } = useQuery({
        queryKey: ['brand', brandId],
        queryFn: async () => {
            const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`)
            return response.data
        }
    })

    const { data: productsData, isLoading: productsLoading } = useQuery({
        queryKey: ['brandProducts', brandId],
        queryFn: async () => {
            const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`)
            return response.data
        }
    })

    if (brandLoading || productsLoading) return <Loading />
    
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center mb-6">
                {brandData?.data.image && (
                    <img 
                        src={brandData.data.image} 
                        alt={brandData.data.name}
                        className="w-12 h-12 object-contain mr-4"
                    />
                )}
                <h1 className="text-2xl font-bold">{brandData?.data.name} Products</h1>
            </div>
            
            {productsData?.data.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-lg text-gray-600">No products found for this brand</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {productsData?.data.map((product) => (
                        <Link 
                            to={`/product/${product._id}`} 
                            key={product._id} 
                            className="transform transition-transform hover:scale-105"
                        >
                            <Card 
                                productInfo={product} 
                                compact={true}
                            />
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}