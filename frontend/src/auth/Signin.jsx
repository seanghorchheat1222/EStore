import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setToken } from '../store/tokenSlice';
import { setUser } from '../store/userSlice';
import { signin } from '../services/auth/signin';
import { currentUser } from '../services/auth/authsession';

function Signin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  })
  const dispatch = useDispatch();
  const [isloading, setIsLoading] = useState(false)

  const handleInput = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form, [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const response = await signin(form);
      const data = response.data
      const token = data.token
      if (response.status === 200) {
        dispatch(setToken({ token: token }))

        const response = await currentUser();
        const data = response.data.data;

        if (response.status === 200) {
          dispatch(setUser({
            name: data.name,
            email: data.email,
            role: data.role,
            setting: data.setting
          }))
          navigate('/admin')
        }
      }
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
      setForm({
        email: "",
        password: ""
      })
    }
  }

  const toHome = () => {
    navigate('/')
  }

  const toSignup = () => {
    navigate('/signup')
  }

  return (
    <>
      <div className='flex w-full h-screen justify-center items-center px-2'>
        <div className='w-full md:w-[60%] lg:w-[40%]'>
          <div className='text-4xl font-bold'>
            Welcome Back!
          </div>
          <div className='text-[#363636]'>
            Get your favorite outfit!
          </div>

          <form action="" className='mt-7' onSubmit={handleSubmit}>
            <div className='flex gap-1 flex-col'>
              <label htmlFor="">Email*</label>
              <input required type="text" placeholder='email@example.com' className='placeholder:text-[#363636] h-11 border-2 border-[#E9E9E9] outline-0 pl-5 rounded-full focus:border-[#040404]' name="email" value={form.email} onChange={handleInput} />
            </div>
            <div className='flex gap-1 flex-col mt-4'>
              <label htmlFor="">Password*</label>
              <input required type="password" placeholder='password' className='placeholder:text-[#363636] h-11 border-2 border-[#E9E9E9] outline-0 pl-5 rounded-full focus:border-[#040404]' name="password" value={form.password} onChange={handleInput} />
            </div>

            <div className='flex justify-between items-center mt-4'>
              <div className='flex gap-1 flex-row items-center'>
                <input type="checkbox" className='placeholder:text-[#363636] h-4 w-4 border-2 border-[#E9E9E9]  rounded-full' />
                <label htmlFor="">Remember me</label>
              </div>
              <div>
                <button type='button'>
                  Forget password?
                </button>
              </div>
            </div>

            <div className='mt-4'>
              <button className='cursor-pointer bg-[#040404] w-full h-11 justify-center items-center rounded-full shrink-0 flex text-[#FFFFFF] font-semibold' type='submit'>
                {
                  isloading ?
                    <div className='h-7 w-7 rounded-full relative'>
                      <div className='h-full w-full border-3 border-[rgba(255,255,255,0.50)] rounded-full absolute top-0 left-0 z-1'></div>
                      <div className='h-full w-full border-l-3 border-t-3  border-[rgba(255,255,255,100)] rounded-full absolute top-0 left-0 animate-spin z-2'></div>
                    </div>
                    :
                    'Login'
                }


              </button>
            </div>
          </form>

          <div className='mt-4'>
            <div className='flex gap-2 justify-center'>
              <div className='text-[#363636]'>
                Don't have an account?
              </div>
              <button className='cursor-pointer' type='button' onClick={() => toSignup()}>
                SignUp
              </button>
            </div>
          </div>
        </div>
      </div>

      <button className='cursor-pointer bg-transparent w-max justify-center items-center rounded-full shrink-0 flex font-semibold underline underline-offset-2 absolute top-4 left-2 md:left-4' type='button' onClick={() => toHome()}>
        Go back
      </button>
    </>
  )
}

export default Signin