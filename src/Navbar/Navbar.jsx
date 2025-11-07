import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = use(AuthContext);

    const handleLogOut = () => {
        logout()
            .then(() => {
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    const links = <>
        <li><NavLink to={'/'}>Home</NavLink></li>
        <li><NavLink to={'/allProducts'}>All Products</NavLink></li>
        {
            user&& <>
                <li><NavLink to={'/myProducts'}>My Products</NavLink></li>
                <li><NavLink to={'/myBids'}>My Bids</NavLink></li>
                <li><NavLink to={'/CreateAProduct'}>Create A Product</NavLink></li>
            </>
        }
    </>
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {
                            links
                        }
                    </ul>
                </div>
                <Link to={'/'} className="text-2xl font-bold">Smart<span className='text-2xl font-bold bg-linear-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent'>Deals</span></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {
                        links
                    }
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ?
                        <>
                            <button className='btn mr-5 bg-linear-to-r from-[#632EE3] to-[#9F62F2] text-base-100 font-semibold' onClick={handleLogOut}>LogOut</button>
                            <div className=''>
                                <img className='w-10 rounded-full' src={user.photoURL} alt="" />
                            </div>
                        </>
                        : 
                        <>
                            <button className='btn border-2 border-[#9F62F2] mr-3 font-semibold'><NavLink to={'/login'}>Login</NavLink></button>

                            <button className='btn bg-linear-to-r from-[#632EE3] to-[#9F62F2] text-base-100 font-semibold'><NavLink to={'/register'}>Register</NavLink></button>
                        </>
                }
            </div>
        </div>
    );
};

export default Navbar;