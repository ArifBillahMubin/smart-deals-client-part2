import React, { use } from 'react';
import ProductsCard from '../productsCard.jsx/ProductsCard';

const LatestProducts = ({ latestProductsPromise }) => {
    const latestProducts = use(latestProductsPromise);
    console.log(latestProducts);
    
    return (
        <div className='py-12 max-w-11/12 mx-auto'>
            <h1 className='text-4xl font-bold text-center pb-12'>Recent <span className='primary-g'>Products</span></h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                    latestProducts.map(product => <ProductsCard key={product._id} product={product}></ProductsCard>)
                }
            </div>
        </div>
    );
};

export default LatestProducts;