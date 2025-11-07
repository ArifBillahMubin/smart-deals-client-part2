import React from 'react';

const Banner = () => {
    return (
        <div className='bg-[linear-gradient(128.29deg,rgba(255,230,252,1),rgba(224,248,245,1)_100%)] p-6 text-center py-16'>
            <h1 className='text-6xl text-center font-bold mb-2'>Deal your <span className='primary-g'>Products</span> <br />
            in a <span className='primary-g'>Smart</span> way !</h1>

            <p>SmartDeals helps you sell, resell, and shop from trusted local sellers — all in one place!</p>

            <div className="join mt-3">
                <div>
                    <label className="input validator join-item">
                        <input className='w-[300px]' type="text" placeholder="search For Products, Categories..." required />
                    </label>
                </div>
                <button className="btn bg-primary-g text-lg text-base-100 font-semibold join-item">Search</button>
            </div>

            <div className='flex gap-3 mt-3 justify-center'>
                <button className='bg-primary-g btn text-base-100 font-semibold text-lg'>Watch All Products</button>
                <button className='border-2 border-secondary btn primary-g'>Post an Product</button>
            </div>
        </div>
    );
};

export default Banner;