import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',  // Fixed case here (from Phone to phone)
    address: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function change(e) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  const submit = async (e) => {
    e.preventDefault();  // Prevent form from refreshing page on submit
    try {
      // Check if all fields are filled
      if (!values.name || !values.email || !values.password || !values.phone || !values.address) {
        alert('All fields are required');
        return;  // Exit early if validation fails
      }

      // Make the Axios request
      const response = await axios.post('http://localhost:1010/api/auth/register', values);

      if (response.data.success) {
        alert(response.data.message);
        navigate('/login');  // Navigate to login page after successful registration
      } else {
        setError(response.data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      console.log(err);
      // Handle different types of errors more specifically
      if (err.response) {
        setError(err.response.data.message || 'An error occurred during registration. Please try again.');
      } else if (err.request) {
        setError('No response from server. Please check your connection.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className='h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center'>
      <div className='bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
        <p className='text-zinc-200 text-xl'>Sign Up</p>
        <div className='mt-4'>
          {error && <div className='text-red-500'>{error}</div>}

          <div>
            <label htmlFor='' className='text-zinc-400'>UserName</label>
            <input
              type='text'
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='username'
              name='name'
              required
              value={values.name}
              onChange={change}
            />
          </div>

          <div>
            <label htmlFor='' className='text-zinc-400'>Email</label>
            <input
              type='text'
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='xyz@example.com'
              name='email'
              required
              value={values.email}
              onChange={change}
            />
          </div>

          <div>
            <label htmlFor='' className='text-zinc-400'>Password</label>
            <input
              type='password'
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='password'
              name='password'
              required
              value={values.password}
              onChange={change}
            />
          </div>

          <div>
            <label htmlFor='' className='text-zinc-400'>Phone No.</label>
            <input
              type='text'
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              name='phone'
              required
              value={values.phone}  // Fixed case here
              onChange={change}
            />
          </div>

          <div>
            <label htmlFor='' className='text-zinc-400'>Address</label>
            <textarea
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              rows='5'
              placeholder='address'
              name='address'
              required
              value={values.address}
              onChange={change}
            />
          </div>

          <div className='mt-4'>
            <button
              className='w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300'
              onClick={submit}
            >
              SignUp
            </button>
          </div>

          <p className='flex mt-4 items-center justify-center text-zinc-200 font-semibold'>
            Or
          </p>
          <p className='flex mt-4 items-center justify-center text-zinc-500 font-semibold'>
            Already have an account? &nbsp;
            <Link to='/login' className='hover:text-blue-500'>
              <u>Login</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
