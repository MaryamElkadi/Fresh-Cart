import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Loading from '../../components/Loading/Loading'
import { Link } from 'react-router-dom'

export default function Brands() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['brands'],
        queryFn: async () => {
            const response = await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
            return response.data
        }
    })

    if (isLoading) return <Loading />
    if (error) return <div>Error loading brands</div>

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">All Brands</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data?.data.map((brand) => (
                    <Link 
                        to={`/brand/${brand._id}`} 
                        key={brand._id}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                        <div className="p-4 flex flex-col items-center">
                            <img 
                                src={brand.image} 
                                alt={brand.name}
                                className="w-32 h-32 object-contain mb-4"
                            />
                            <h2 className="text-xl font-semibold text-center">{brand.name}</h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}