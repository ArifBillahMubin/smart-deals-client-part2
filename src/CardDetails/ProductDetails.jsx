import React, { use, useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import { Link, useLoaderData } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';
import axios from 'axios';

const ProductDetails = () => {
    const product = useLoaderData();
    const bidModalRef = useRef(null);
    const { user } = use(AuthContext);
    // console.log(user)
    const [bids, setBids] = useState([]);
    console.log(bids)

    const {
        image,
        title,
        description,
        condition,
        category,
        email,
        location,
        seller_contact,
        seller_image,
        seller_name,
        status,
        usage,
        price_max,
        price_min,
        created_at,
        _id,
    } = product;

    // Helper to format price range (e.g. "$22.5 - 30")
    const priceRange = price_min && price_max
        ? `$${price_min} - ${price_max}`
        : price_min
            ? `$${price_min}`
            : price_max
                ? `$${price_max}`
                : '';

    // Format the posted date
    const postedDate = created_at ? format(new Date(created_at), 'MM/dd/yyyy') : '';

    // LOAD BIDS DATA
    useEffect(() => {
        axios.get(`https://smart-deals-server-blue.vercel.app/products/bids/${_id}`)
            .then(data => {
                setBids(data.data)
            })
    }, [_id, user])


    //for fetch method

    // useEffect(() => {
    //     fetch(`https://smart-deals-server-blue.vercel.app/products/bids/${_id}`,{
    //         headers: {
    //             authorization: `Bearer ${user.accessToken}`
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             setBids(data);
    //         })
    // }, [_id,user])

    //modal section
    const handleSubmitBid = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const photoURL = e.target.photoURL.value;
        const contact = e.target.contact.value;
        const price = e.target.price.value;
        console.log(name, email, photoURL, contact, price)
        const newBid = {
            product: _id,
            buyer_image: photoURL,
            buyer_name: name,
            buyer_contact: contact,
            buyer_email: email,
            bid_price: price,
            status: "pending"
        }
        fetch('https://smart-deals-server-blue.vercel.app/bids', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newBid)
        })
            .then(res => res.json())
            .then(data => {
                console.log('after pleased bids: ', data);
                bidModalRef.current.close();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });
                newBid._id = data.insertedId;
                const newBids = [...bids, newBid];
                newBids.sort((a, b) => b.bid_price - a.bid_price)
                setBids(newBids);
            })
    }

    return (
        <div className="max-w-11/12 mx-auto  min-h-screen">
            <div className='p-4 bg-gray-50'>
                {/* Main grid */}
                <div className="mt-6 grid md:grid-cols-3 gap-6">
                    {/* Left column – Image */}
                    <div className="md:col-span-1">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 flex items-center justify-center">
                            {image && image.trim() !== "" ? (
                                <img src={image} alt={title} className="max-w-full max-h-full object-contain rounded" />
                            ) : (
                                <span className="text-gray-400">No image</span>
                            )}
                        </div>
                        {/* Description + Condition/Usage */}
                        <section className="bg-white p-4 rounded shadow-sm mt-3">
                            <h2 className="text-lg font-semibold mb-2">Product Description</h2>

                            <div className="flex flex-wrap gap-4 text-sm mb-3">
                                <div>
                                    <span className="font-medium">Condition:</span>{' '}
                                    <span className="capitalize">{condition || 'New'}</span>
                                </div>
                                <div>
                                    <span className="font-medium">Usage Time:</span>{' '}
                                    <span>{usage || '—'}</span>
                                </div>
                            </div>

                            <p className="text-gray-700 whitespace-pre-line">{description}</p>
                        </section>
                    </div>

                    {/* Right column – Details */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Back link */}
                        <div>
                            <Link to="/" className="inline-flex items-center text-sm text-gray-600 mb-4 hover:underline">
                                ← Back To Home
                            </Link>

                            {/* Title & Category */}
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h1>
                            <p className="text-sm text-purple-600 mt-1">{category}</p>

                            {/* Price */}
                            <p className="text-2xl font-semibold text-green-600 mt-3">{priceRange}</p>
                            <p className="text-sm text-gray-500">Price starts from</p>
                        </div>

                        {/* Product Details */}

                        <section className="bg-white p-4 rounded shadow-sm">
                            <h2 className="text-lg font-semibold mb-2">Product Details</h2>
                            <p className="text-sm text-gray-600">
                                Product ID: <span className="font-mono">{_id}</span>
                            </p>
                            <p className="text-sm text-gray-600">
                                Posted: {postedDate}
                            </p>
                        </section>



                        {/* Seller Information */}
                        <section className="bg-white p-4 rounded shadow-sm">
                            <h2 className="text-lg font-semibold mb-2">Seller Information</h2>

                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                                    {seller_image && seller_image.trim() !== "" ? (
                                        <img src={seller_image} alt={seller_name} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-gray-600 text-xl">{seller_name?.[0] || '?'}</span>
                                    )}
                                </div>
                                <div>
                                    <p className="font-medium">{seller_name}</p>
                                    <p className="text-sm text-gray-500">{email}</p>
                                </div>
                            </div>

                            <p className="text-sm text-gray-700">
                                <span className="font-medium">Location:</span> {location}
                            </p>
                            <p className="text-sm text-gray-700">
                                <span className="font-medium">Contact:</span> {seller_contact}
                            </p>

                            <div className="mt-3 flex items-center gap-2">
                                <span className="font-medium text-sm">Status:</span>
                                <span
                                    className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${status === 'On Sale'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-gray-300 text-gray-800'
                                        }`}
                                >
                                    {status}
                                </span>
                            </div>
                        </section>

                        {/* CTA Button */}
                        <button
                            onClick={() => bidModalRef.current.showModal()}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded transition">
                            I Want Buy This Product
                        </button>
                    </div>
                </div>
            </div>

            {/* modal */}
            <div>
                <dialog ref={bidModalRef} className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg text-center">Give Seller Your Offered Price</h3>

                        <form
                            onSubmit={handleSubmitBid}
                            className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm space-y-6"
                        >
                            {/* Buyer Name */}
                            <div>
                                <label
                                    htmlFor="buyer_name"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Buyer Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="buyer_name"
                                    readOnly
                                    defaultValue={user?.displayName}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>

                            {/* Buyer Email */}
                            <div>
                                <label
                                    htmlFor="buyer_email"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Buyer Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="buyer_email"
                                    readOnly
                                    defaultValue={user?.email}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>

                            {/* Buyer Image URL */}
                            <div>
                                <label
                                    htmlFor="buyer_image"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Buyer Image URL
                                </label>
                                <input
                                    type="url"
                                    name="photoURL"
                                    id="buyer_image"
                                    readOnly
                                    defaultValue={user?.photoURL}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>

                            {/* Place your Price */}
                            <div>
                                <label
                                    htmlFor="price"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Place your Price
                                </label>
                                <input
                                    type="text"
                                    name="price"
                                    id="price"
                                    placeholder="e.g. Artisan Roasters"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>

                            {/* Contact Info */}
                            <div>
                                <label
                                    htmlFor="contact"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Contact Info
                                </label>
                                <input
                                    type="text"
                                    name="contact"
                                    id="contact"
                                    placeholder="e.g. +1 555-1234"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>

                            <button className="bg-primary-g text-base-100 text-lg w-full btn">
                                Submit Bid
                            </button>
                        </form>

                        <div className="modal-action">

                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>

            {/* Bids for this product */}
            <div className='py-12  min-w-11/12 mx-auto'>
                <h1 className='text-3xl font-bold text-center'>Bids for this product : <span className='text-secondary'>{bids.length}</span></h1>

                <div className="">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>SL.NO.</th>
                                <th>Beyer Name</th>
                                <th>Beyer Email</th>
                                <th>Bids Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                bids.map((bid, index) =>
                                    <tr key={index}>
                                        <th>{index + 1}</th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src={bid.buyer_image && bid.buyer_image.trim() !== "" ? bid.buyer_image : "https://via.placeholder.com/80"}
                                                            alt="Buyer"
                                                            className="object-cover"
                                                        />

                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{bid.buyer_name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {bid.buyer_email}

                                        </td>
                                        <td>{bid.bid_price}</td>
                                        <th>
                                            <button className="btn btn-ghost btn-xs">details</button>
                                        </th>
                                    </tr>
                                )
                            }
                            {/* row 2 */}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;