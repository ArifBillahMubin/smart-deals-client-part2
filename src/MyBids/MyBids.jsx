import React, { useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';

const MyBids = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [bids, setBids] = useState([]);
    // console.log(user.accessToken)

    useEffect(() => {
        axiosSecure.get(`/bids?email=${user?.email}`)
            .then(data => {
                setBids(data.data);
            })
    }, [user, axiosSecure])

    // useEffect(() => { 
    //     fetch(`https://smart-deals-server-blue.vercel.app/bids?email=${user?.email}`,{
    //         headers: {
    //             authorization: `Bearer ${user?.accessToken}`
    //         }
    //     })
    //     .then(res=> res.json())
    //     .then(data=>{
    //         setBids(data)
    //     })
    // }, [user?.email, user?.accessToken])


    const handleDelete = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://smart-deals-server-blue.vercel.app/bids/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Bid has been deleted.",
                                icon: "success"
                            });
                            const remainingBids = bids.filter(bid => bid._id !== _id);
                            setBids(remainingBids);
                        }
                    })
            }

        });
    }

    return (
        <div className='py-8 max-w-11/12 mx-auto'>
            <h1 className='mb-3 text-4xl font-bold text-center'>My Bids : <span className='text-secondary'>{bids.length}</span></h1>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                SL.NO.
                            </th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Bid Price</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bids.map((bid, index) =>
                                <tr key={index}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">Hart Hagerty</div>
                                                <div className="text-sm opacity-50">United States</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        Zemlak, Daniel and Leannon
                                        <br />
                                        <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                                    </td>
                                    <td>{bid.bid_price}</td>
                                    <td>
                                        {
                                            bid.status === 'pending' ?
                                                <div className="badge badge-warning">
                                                    {bid.status}
                                                </div> :
                                                <div className="badge badge-success">
                                                    {bid.status}
                                                </div>
                                        }
                                    </td>
                                    <th>
                                        <button onClick={() => handleDelete(bid._id)} className="btn border-2 border-red-400 text-red-400 btn-xs">Remove bid</button>
                                    </th>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyBids;