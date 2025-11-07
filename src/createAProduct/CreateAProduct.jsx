import React from 'react';
import useAuth from '../hooks/useAuth';
// import axios from 'axios';
// import useAxios from '../hooks/useAxios';
import useAxiosSecure from '../hooks/useAxiosSecure';

const CreateAProduct = () => {
    const { user } = useAuth();
    // const axiosInstance = useAxios();
    const axiosSecure = useAxiosSecure();
    // console.log(user);
    const handleCreateAProduct = e => {
        e.preventDefault();
        console.log('click');
        const title = e.target.title.value;
        const category = e.target.category.value;
        const price_min = e.target.price_min.value;
        const price_max = e.target.price_max.value;
        const condition = e.target.condition.value;
        const usage = e.target.usage.value;
        const image = e.target.image.value;
        const seller_contact = e.target.seller_contact.value;
        const seller_image = e.target.seller_image.value;
        const location = e.target.location.value;
        const description = e.target.description.value;
        const seller_name = e.target.seller_name.value;
        const email = e.target.email.value;

        console.log(title, category, price_max, price_min, condition, usage, image, seller_contact, seller_image, location, description);

        const newProduct = {
            title, // String
            price_min, // Int32
            price_max, // Int32
            email, // String
            category, // String
            created_at: new Date().toISOString(),
            image, // String
            status: "pending", // Default status
            location, // String
            seller_image, // String
            seller_name, // String
            condition, // String
            usage, // String
            description, // String
            seller_contact, // String
        };

        // axios.post('https://smart-deals-server-blue.vercel.app/products', newProduct)
        // .then(data=> {
        //     if(data.data.insertedId){
        //         alert('new product created done..')
        //     }
        // }
        // )

        // axiosInstance.post('/products',newProduct)
        // .then(data=> {
        //     if(data.data.insertedId){
        //         alert('new product created done..')
        //     }
        // }
        // )

        axiosSecure.post('/products', newProduct)
            .then(data => {
                if (data.data.insertedId) {
                    alert('new product created done..')
                }
            })

    }
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
            <div className="w-full max-w-2xl bg-white shadow-md rounded-2xl p-8">
                <button className="text-gray-600 text-center text-sm mb-4 flex items-center gap-1 hover:text-gray-800">
                    ← Back To Products
                </button>
                <h2 className="text-3xl font-bold text-center mb-8">
                    Create <span className="text-purple-500">A Product</span>
                </h2>


                <form onSubmit={handleCreateAProduct} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input name='title' type="text" placeholder="e.g. Yamaha Fz Guitar for Sale" className="input" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select name="category" className="input">
                                <option value="">Select a Category</option>
                                <option value="electronics">Electronics</option>
                                <option value="fashion">Fashion</option>
                                <option value="vehicles">Vehicles</option>
                                <option value="furniture">Furniture</option>
                                <option value="sports">Sports & Fitness</option>
                                <option value="books">Books & Education</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Min Price You Want to Sale ($)</label>
                            <input name='price_min' type="number" placeholder="e.g. 18.5" className="input" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Max Price You Want to Sale ($)</label>
                            <input name='price_max' type="number" placeholder="Optional (default = Min Price)" className="input" />
                        </div>
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Product Condition</label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2">
                                    <input type="radio" name="condition" value="brandNew" defaultChecked className="accent-purple-500" />
                                    Brand New
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="radio" name="condition" value="used" className="accent-purple-500" />
                                    Used
                                </label>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Product Usage Time</label>
                            <input name='usage' type="text" placeholder="e.g. 1 year 3 month" className="input" />
                        </div>
                    </div>


                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Your Product Image URL</label>
                        <input name='image' type="url" placeholder="https://..." className="input w-full" />
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Seller Name</label>
                            <input name='seller_name' type="text" placeholder="e.g. Artisan Roasters" readOnly defaultValue={user?.displayName} className="input" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Seller Email</label>
                            <input name='email' type="email" placeholder="e.g. leil31955@nrlord.com" readOnly defaultValue={user?.email} className="input" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Seller Contact</label>
                            <input name='seller_contact' type="tel" placeholder="e.g. +1-555-1234" className="input" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Seller Image URL</label>
                            <input name='seller_image' type="url" readOnly defaultValue={user?.photoURL} placeholder="https://..." className="input" />
                        </div>
                    </div>


                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input name='location' type="text" placeholder="City, Country" className="input w-full" />
                    </div>


                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Simple Description About Your Product</label>
                        <textarea
                            name='description'
                            rows="4"
                            placeholder="e.g. I bought this product 3 month ago. did not used more than 1/2 time. actually learning guitar is so tough..."
                            className="input w-full resize-none"
                        ></textarea>
                    </div>


                    <button type="submit" className="w-full bg-primary-g text-white py-3 rounded-xl font-medium hover:opacity-90">
                        Create A Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateAProduct;