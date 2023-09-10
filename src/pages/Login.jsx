import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/UserSlice';
import { Link, useNavigate } from 'react-router-dom';


function Login ()  {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    //local states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    //redux/global state
    const {loading, otherError} = useSelector((state) => state.user);

    //on submit
    const handleLoginEvent = (e) => {
        if (e) {
            e.preventDefault();
        }

        let userCredentials = {
            email, password
        }
        
        // async thunk accept only one argument as a payload but if we have to send more than one argu, pass an object as the payload with both
        dispatch(loginUser({ userCredentials, auth: 'login' })).then((result) => {

            if(result.payload === 'No user found with these credentials'){
                setError(true);
            }
            else if(result.payload){
                setEmail('');
                setPassword('');
                navigate('/');
            }
        });
    }

    return (
         <section className="h-screen bg-white-950 body-font">
            <div className="h-full container px-4 py-24 mx-auto flex items-center">
                <form onSubmit={handleLoginEvent} className="max-h-full lg:w-1/3 mx-auto md:w-1/2 bg-gray-200 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 shadow-lg shadow-slate-300">
                    <h2 className="text-gray-900 text-xl font-medium tracking-wide mb-5">Login</h2>
                    <div className="relative mb-4">
                        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                        <input type="email"  pattern="^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}$"  onChange={(e) => setEmail(e.target.value)} id="email" name="email"  className="w-full bg-white rounded-xl border border-b-4 border-gray-300 focus:border-blue-850 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required/>
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
                        <input type="password"  pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,128}$' onChange={(e) => setPassword(e.target.value)} id="password" name="password"  className="w-full bg-white rounded-xl border border-b-4 border-gray-300 focus:border-blue-850 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required/>
                    </div>
                    <button type="submit" className="transition ease-in-out delay-100 text-white bg-blue-950 border-0 py-1 px-8 focus:outline-none hover:bg-blue-900 rounded-xl text-lg">
                        {loading? 'loading...' : 'Login'}
                    </button>

                    {error && (
                        <p className='text-red-600 text-sm bg-transparent  mt-2.5 py-1 px-1 leading-8 '>No user found with these credentials</p>
                    )}
                    {otherError && (
                        <p className='text-red-600 text-sm bg-transparent  mt-2.5 py-1 px-1 leading-8 '>{otherError}</p>
                    )}

                    <p className="text-xs text-blue-800 mt-3 underline">Don't have an account?  
                        <Link to="/Signup" >
                        Signup
                        </Link>
                    </p>   
                </form>
            </div>
        </section>
    );
}

export default Login;