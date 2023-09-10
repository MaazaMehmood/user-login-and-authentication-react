import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser } from '../store/UserSlice';
import { useNavigate } from 'react-router-dom';


function Signup () {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    //local states
    const[name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    //redux/global states
    const {loading, otherError} = useSelector((state) => state.user);

    //on submit
    const handleSignupEvent = (e) => {
        if (e) {
            e.preventDefault();
        }

        let userCredentials = {
            name, email, password
        }

        // async thunk accept only one argument as a payload but if we have to send more than one args, pass an object as the payload with both
        dispatch(loginUser({userCredentials, auth: 'signup' })).then((result) => {

            if(result.payload === 'Account already exist with these credentials'){
                setError(true);
            }
            else if(result.payload){
                setName('');
                setEmail('');
                setPassword('');
                navigate('/');
            }
        });
    }

    return (
        <section className="h-screen bg-white-950 body-font ">
            <div className="h-full container px-4 py-2 mx-auto flex flex-wrap items-center justify-center">
                <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0 pt-8">
                    <h1 className="title-font font-serif font-bold text-3xl text-blue-900">Your Gateway to Exclusive Content.<br/> Elevate Your Experience with User Authentication and Login.</h1>
                    <p className="leading-relaxed tracking-wide mt-4 text-gray-500">Welcome to our platform, where your security and convenience take center stage. Our robust user authentication and login system ensure a seamless and secure experience for all our valued users.</p>
                </div>
                <form onSubmit={handleSignupEvent} className="max-h-full lg:w-2/6 lg:mr-8 md:w-1/2 bg-gray-200 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 lg:mt-14 md:mt-12 shadow-lg shadow-slate-300">
                    <h2 className="text-gray-900 text-xl font-medium tracking-wide mb-5">Sign Up</h2>
                    <div className="relative mb-4">
                        <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                        <input type="text"  onChange={(e) => setName(e.target.value)} id="name" name="name"  className="w-full bg-white rounded-xl border border-b-4 border-gray-300 focus:border-blue-850 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required/>
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                        <input type="email"  pattern="^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}$"  onChange={(e) => setEmail(e.target.value)} id="email" name="email"  className="w-full bg-white rounded-xl border border-b-4 border-gray-300 focus:border-blue-850 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required/>
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
                        <input type="password"  pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,128}$' onChange={(e) => setPassword(e.target.value)} id="password" name="password"  className="w-full bg-white rounded-xl border border-b-4 border-gray-300 focus:border-blue-850 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required/>
                    </div>
                    <button type="submit" className="transition ease-in-out delay-100 text-white bg-blue-950 border-0 py-1 px-8 focus:outline-none hover:bg-blue-900 rounded-xl text-lg">
                        {loading? 'loading...' : 'Sign Up'}
                    </button>

                    {error && (
                        <p className='text-red-600 text-sm bg-transparent  mt-2.5 py-1 px-1 leading-8 '>Account already exist with these credentials</p>
                    )}
                    {otherError && (
                        <p className='text-red-600 text-sm bg-transparent  mt-2.5 py-1 px-1 leading-8 '>{otherError}</p>
                    )}

                    <p className="text-xs text-blue-800 mt-3 underline">Already have an account? 
                        <Link to="/Login" >
                         Login
                        </Link>
                    </p>
                </form>
            </div>
        </section>
    )
}

export default Signup;
