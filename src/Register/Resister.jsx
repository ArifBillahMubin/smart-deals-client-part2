
import { Link } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import { use } from 'react';

const Resister = () => {

    const { singInUserGoogle, setUser } = use(AuthContext);
    const handleGoogleSignIn = () => {
        singInUserGoogle()
            .then(result => {
                setUser(result.user)
                const newUser = {
                    name: result.user.displayName,
                    email: result.user.email,
                    photoURL: result.user.photoURL
                }

                fetch('https://smart-deals-server-blue.vercel.app/users', {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log('data after user save ', data)
                    })
            })
            .catch(err => console.log(err.message));
    }
    return (
        <div className='min-h-screen flex items-center'>
            <div className="card bg-base-100 h-fit w-full max-w-sm mx-auto shrink-0 shadow-2xl">
                <div className="card-body">
                    <h1 className='text-3xl text-center font-bold'>Register Now!</h1>
                    <p className='text-center'>Already have an account? <Link to={'/login'} className='bg-linear-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent'>Login Now</Link></p>
                    <fieldset className="fieldset">

                        {/* Name */}
                        <label className="label">Name</label>
                        <input type="text" className="input" placeholder="Name" required />

                        {/* email */}
                        <label className="label">Email</label>
                        <input type="email" className="input" placeholder="Email" required />

                        {/* Image-Url */}
                        <label className="label">Image-URL</label>
                        <input type="text" className="input" placeholder="Image-URL" required />

                        {/* Password */}
                        <label className="label">Password</label>
                        <input type="password" className="input" placeholder="Password" required />

                        {/* <div><a className="link link-hover">Forgot password?</a></div> */}
                        <button className="btn bg-linear-to-r from-[#632EE3] to-[#9F62F2] text-base-100 font-semibold mt-4">Register</button>

                        <div class="flex items-center justify-center my-2">
                            <div class="flex-1 h-px bg-gray-400"></div>
                            <span class="px-4 text-2xl font-bold">
                                or
                            </span>
                            <div class="flex-1 h-px bg-gray-400"></div>
                        </div>

                        {/* Google */}
                        <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5]">
                            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                            Login with Google
                        </button>

                    </fieldset>
                </div>
            </div>
        </div>
    );
};

export default Resister;