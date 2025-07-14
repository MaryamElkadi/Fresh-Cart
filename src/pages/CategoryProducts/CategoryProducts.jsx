import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Loading from '../../components/Loading/Loading'
import Card from '../../components/Card/Card'
import { useParams, Link } from 'react-router-dom'

export default function CategoryProducts() {
    const { categoryId } = useParams()

    // Fetch category details
    const { 
        data: categoryData, 
        isLoading: categoryLoading, 
        error: categoryError 
    } = useQuery({
        queryKey: ['category', categoryId],
        queryFn: async () => {
            const response = await axios.get(
                `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`
            )
            return response.data
        }
    })

    // Fetch products for this category
    const { 
        data: productsData, 
        isLoading: productsLoading, 
        error: productsError 
    } = useQuery({
        queryKey: ['categoryProducts', categoryId],
        queryFn: async () => {
            const response = await axios.get(
                `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`
            )
            return response.data
        }
    })

    // Loading state
    if (categoryLoading || productsLoading) {
        return <Loading />
    }

    // Error handling
    if (categoryError) {
        return (
            <div className="text-red-600 text-center my-8">
                Error loading category: {categoryError.message}
            </div>
        )
    }

    if (productsError) {
        return (
            <div className="text-red-600 text-center my-8">
                Error loading products: {productsError.message}
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Category title with image if available */}
            <div className="flex items-center mb-8">
                {categoryData?.data.image && (
                    <img 
                        src={categoryData.data.image} 
                        alt={categoryData.data.name}
                        className="w-16 h-16 object-cover rounded-full mr-4"
                    />
                )}
                <h1 className="text-3xl font-bold">
                    {categoryData?.data.name} Products
                </h1>
            </div>

            {/* Products grid */}
            {productsData?.data.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-xl text-gray-600">
                        No products found in this category
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {productsData?.data.map((product) => (
                        <Link 
                            to={`/product/${product._id}`}
                            key={product._id}
                            className="transform transition-transform hover:scale-105"
                        >
                            <Card 
                                productInfo={product}
                            />
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}