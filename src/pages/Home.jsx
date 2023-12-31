import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';


function Home  () {

  const getUser= () => {
    let ifUser = localStorage.getItem('user');
    if(ifUser){
      ifUser = JSON.parse(ifUser);
    }
    else {
      ifUser = null;
    }
    return ifUser;
  }

  const [user, setUser] = useState(getUser());
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  }

  return (
    < >
      <div className="h-screen lg:w-3/5 md:w-1/2 md:pr-16 px-4 py-28 mx-auto my-auto flex flex-wrap items-center justify-center">
        {user ? (
          <div className='w-4/5 bg-gray-100 rounded-lg p-10 border-5 flex flex-col items-center justify-start shadow-lg shadow-slate-300'>
            <h4 className='font-serif leading-relaxed tracking-wide text-2xl text-bold text-blue-900 my-2'>Hello, {user.name} </h4>
            <h5 className='font-serif leading-relaxed tracking-wide text-sm text-bold text-gray-600 my-2'>your email: {user.email}</h5><br/>
            <button className="transition ease-in-out delay-100 text-white bg-blue-950 border-0 mt-3 py-2 px-8 focus:outline-none hover:bg-blue-900 rounded-xl text-lg" onClick={handleLogout}>
              Logout
              <FontAwesomeIcon icon={faChevronLeft} className= 'arrow' />
            </button>
          </div>
        ) : (
          <div className='w-4/5 bg-gray-100 rounded-lg p-10 flex flex-col items-center justify-between shadow-lg shadow-slate-300'>
            <p className="font-serif leading-relaxed tracking-wide underline mt-4 text-lg text-bold text-blue-900 my-3 decoration-solid ">Streamlined Access, Maximum Security.</p><br/>
            <Link to="/Signup"className="transition ease-in-out delay-100 text-white bg-blue-950 border-0 py-2 px-8 focus:outline-none hover:bg-blue-900  rounded-xl text-lg">
              Sign Up
              <FontAwesomeIcon icon={faChevronRight} className='arrow'/>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

export default Home;
