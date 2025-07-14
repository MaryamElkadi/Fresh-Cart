import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Loading from '../../components/Loading/Loading'
import { Link } from 'react-router-dom'

export default function Categories() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['subcategories'],
        queryFn: async () => {
            const response = await axios.get('https://ecommerce.routemisr.com/api/v1/subcategories')
            return response.data
        }
    })

    if (isLoading) return <Loading />
    if (error) return <div>Error loading categories</div>

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">All Categories</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data?.data.map((subcategory) => (
                    <Link 
                        to={`/category/${subcategory._id}`} 
                        key={subcategory._id}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-2">{subcategory.name}</h2>
                            <p className="text-gray-600">{subcategory.slug}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}