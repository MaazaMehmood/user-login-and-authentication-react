import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/UserSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    
    //states
    const[name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //redux state
    const {loading, error} = useSelector((state) => state.user);


    const dispatch = useDispatch();
    const navigate = useNavigate();

    //on submit
    const handleLoginEvent = (e) => {
        if (e) {
            e.preventDefault();
        }

        let userCredentials = {
            name, email, password
        }

        dispatch(loginUser(userCredentials)).then((result) => {
            if(result.payload){
                setName('');
                setEmail('');
                setPassword('');
                navigate('/');
            }
        });
    }

  return (
    <section className="h-screen bg-blue-950 body-font">
        <div className="container px-4 py-24 mx-auto flex flex-wrap items-center">
            <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                <h1 className="title-font font-serif font-bold text-3xl text-gray-100">Your Gateway to Exclusive Content.<br/> Elevate Your Experience with User Authentication and Login.</h1>
                <p className="leading-relaxed tracking-wide mt-4 text-gray-400">Welcome to our platform, where your security and convenience take center stage. Our robust user authentication and login system ensure a seamless and secure experience for all our valued users.</p>
            </div>
            <form onSubmit={handleLoginEvent} className="lg:w-2/6 lg:mr-8 md:w-1/2 bg-gray-100 rounded-lg p-10 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                <h2 className="text-gray-900 text-lg font-bold tracking-wide mb-5">Sign Up</h2>
                <div className="relative mb-4">
                    <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                    <input type="text"  onChange={(e) => setName(e.target.value)} id="name" name="name"  className="w-full bg-white rounded-xl border border-b-4 border-gray-300 focus:border-blue-850 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-500 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
                <div className="relative mb-4">
                    <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                    <input type="email" required pattern='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'  onChange={(e) => setEmail(e.target.value)} id="email" name="email"  className="w-full bg-white rounded-xl border border-b-4 border-gray-300 focus:border-blue-850 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-500 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
                <div className="relative mb-4">
                    <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
                    <input type="password" required pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,128}$' onChange={(e) => setPassword(e.target.value)} id="password" name="password"  className="w-full bg-white rounded-xl border border-b-4 border-gray-300 focus:border-blue-850 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-500 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
                <button type="submit" className="text-white bg-blue-950 border-0 py-2 px-8 focus:outline-none hover:bg-blue-900 rounded-xl text-lg">
                    {loading? 'loading...' : 'Login'}
                </button>
                {error && (
                    <div className='text-white text-sm bg-red-500 border-2 rounded-xl mt-2.5 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out'>{error}</div>
                )}
                <p className="text-xs text-blue-800 mt-3 underline">Streamlined Access, Maximum Security.</p>
            </form>
        </div>
  </section>
  )
}

export default Login;
