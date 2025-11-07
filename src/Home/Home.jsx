import React from 'react';
import Banner from '../banner/Banner';
import LatestProducts from '../latestProducts/LatestProducts';

const latestProductsPromise = fetch('https://smart-deals-server-blue.vercel.app/latestProducts').then(res => res.json())
const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <div>
                <LatestProducts latestProductsPromise={latestProductsPromise}></LatestProducts>
            </div>
        </div>
    );
};

export default Home;