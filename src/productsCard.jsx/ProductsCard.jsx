import React from 'react';
import { Link } from 'react-router';

const ProductsCard = ({ product }) => {
    const { image, price_min, price_max, title ,} = product;
    return (
        <div className="card bg-base-100 shadow-sm">
            <figure className="p-4">
                <img
                    src={image}
                    alt={title}
                    className="rounded-xl min-h-30" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>Range: ${price_min}-${price_max}</p>
                <div className="card-actions">
                    <Link to={`/productsDetails/${product._id}`} className="btn border-2 border-secondary primary-g text-lg w-full">View Details</Link>
                </div>
            </div>
        </div>
    );
};

export default ProductsCard;