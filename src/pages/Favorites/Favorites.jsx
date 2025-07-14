import React, { useEffect, useState, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loading from '../../components/Loading/Loading';
import { Link } from 'react-router-dom';
import { cartContext } from '../../context/Cart.context';

export default function Favorites() {
    const [favoriteIds, setFavoriteIds] = useState([]);
    const { addToCart } = useContext(cartContext);

    // Function to toggle favorite status
    const toggleFavorite = (productId) => {
        const updatedFavorites = { ...JSON.parse(localStorage.getItem('favorites')) || {} };
        updatedFavorites[productId] = !updatedFavorites[productId];
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        
        // Update state without refreshing
        const ids = Object.keys(updatedFavorites).filter(id => updatedFavorites[id]);
        setFavoriteIds(ids);
    };

    // Load favorites on initial render
    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
        const ids = Object.keys(savedFavorites).filter(id => savedFavorites[id]);
        setFavoriteIds(ids);
    }, []);

    const { data, isLoading } = useQuery({
        queryKey: ['favorites', favoriteIds],
        queryFn: async () => {
            if (favoriteIds.length === 0) return { data: [] };
            
            const requests = favoriteIds.map(id => 
                axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
            );
            const responses = await Promise.all(requests);
            return { data: responses.map(res => res.data.data) };
        },
        enabled: favoriteIds.length > 0
    });

    if (isLoading) return <Loading />;

    return (
        <div className="container mx-auto px-4 py-8 mt-16">
            <h1 className="text-2xl font-bold mb-6">Your Favorites</h1>
            
            {favoriteIds.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-lg text-gray-600">You haven't favorited any products yet</p>
                    <Link to="/products" className="text-primary mt-4 inline-block">
                        Browse Products
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {data?.data.map((product) => {
                        const isFavorite = favoriteIds.includes(product._id);
                        
                        return (
                            <div key={product._id} className="bg-white rounded-md shadow-sm hover:shadow-md transition-shadow overflow-hidden relative">
                                {/* Favorite heart icon (top right corner) */}
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavorite(product._id);
                                    }}
                                    className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center hover:scale-110 transition-transform"
                                >
                                    <i className={`fa-heart ${isFavorite ? 'fa-solid text-red-500' : 'fa-regular text-gray-500'} text-lg`}></i>
                                </button>
                                
                                {/* Product Image */}
                                <div className="relative aspect-square">
                                    <img 
                                        src={product.imageCover} 
                                        alt={product.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all flex items-center justify-center gap-2 opacity-0 hover:opacity-100">
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                addToCart(product._id);
                                            }}
                                            className="w-9 h-9 rounded-full bg-white text-primary flex items-center justify-center hover:scale-110 transition-transform"
                                        >
                                            <i className="fa-solid fa-cart-shopping text-sm"></i>
                                        </button>
                                        <Link 
                                            to={`/product/${product._id}`}
                                            className="w-9 h-9 rounded-full bg-white text-primary flex items-center justify-center hover:scale-110 transition-transform"
                                        >
                                            <i className="fa-solid fa-eye text-sm"></i>
                                        </Link>
                                    </div>
                                </div>
                                
                                {/* Product Info */}
                                <div className="p-2">
                                    <h3 className="text-xs text-gray-500 truncate">{product.category?.name}</h3>
                                    <h2 className="text-sm font-medium truncate mb-1">{product.title}</h2>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-bold">${product.price}</span>
                                        <div className="flex items-center">
                                            <i className="fa-solid fa-star text-yellow-400 text-xs mr-1"></i>
                                            <span className="text-xs">{product.ratingsAverage || 0}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}