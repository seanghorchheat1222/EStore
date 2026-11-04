import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { confirmResetPasswordOtp, requestResetPasswordOtp, resetPassword } from '../services/auth/resetPassword';

function ResetPassword() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    otp: ""
  })

  const [isloading, setIsLoading] = useState(false)
  const [isRequestOtp, setIsRequestOtp] = useState(true)
  const [isconfirmOtp, setIsConfirmOtp] = useState(false)

  const handleInput = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form, [name]: value
    })
  }

  const handleRequestOtp = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true);
      const response = await requestResetPasswordOtp({ email: form.email });
      if (response.status === 200) {
        setIsRequestOtp(false)
        setIsConfirmOtp(true)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleConfirmOtp = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const response = await confirmResetPasswordOtp({ email: form.email, otp: form.otp })
      if (response.status === 200) {
        setIsConfirmOtp(false);
      }
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  const toSignIn = () => {
    navigate('/signin')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const response = await resetPassword({ otp: form.otp, email: form.email, password: form.password })
      if (response.status === 200) {
        toSignIn()
      }
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  const toHome = () => {
    navigate('/')
  }



  return (
    <>
      <div className='flex w-full h-screen justify-center items-center px-2'>
        <div className='w-full md:w-[60%] lg:w-[40%]'>
          <div className='text-4xl font-bold'>
            Reset Password
          </div>
          <div className='text-[#363636]'>
            Alway been great w you!
          </div>
          {
            isRequestOtp ?
              <form action="" className='mt-7' onSubmit={handleRequestOtp}>
                <div className='flex gap-1 flex-col'>
                  <label htmlFor="">Email*</label>
                  <input required type="text" placeholder='email@example.com' className='placeholder:text-[#363636] h-11 border-2 border-[#E9E9E9] outline-0 pl-5 rounded-full focus:border-[#040404]' name="email" value={form.email} onChange={handleInput} />
                </div>

                <div className='flex justify-between items-center mt-4'>
                  <div className='flex gap-1 flex-row items-center'>

                  </div>
                  <div>
                    <button type='button'>
                      Create new account?
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
                        'Request OTP'
                    }
                  </button>
                </div>
              </form> :


              isconfirmOtp ?

                <form action="" className='mt-7' onSubmit={handleConfirmOtp}>
                  <div className='flex gap-1 flex-col'>
                    <label htmlFor="">Otp*</label>
                    <input required type="text" placeholder='12345678' className='placeholder:text-[#363636] h-11 border-2 border-[#E9E9E9] outline-0 pl-5 rounded-full focus:border-[#040404]' name="otp" value={form.otp} onChange={handleInput} />
                  </div>

                  <div className='flex justify-between items-center mt-4'>
                    <div className='flex gap-1 flex-row items-center'>

                    </div>
                    <div>
                      <button type='button'>
                        Create new account?
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
                          'Confirm OTP'
                      }
                    </button>
                  </div>
                </form>
                :
                <form action="" className='mt-7' onSubmit={handleSubmit}>
                  <div className='flex gap-1 flex-col'>
                    <label htmlFor="">Password*</label>
                    <input required type="text" placeholder='new password' className='placeholder:text-[#363636] h-11 border-2 border-[#E9E9E9] outline-0 pl-5 rounded-full focus:border-[#040404]' name="password" value={form.password} onChange={handleInput} />
                  </div>

                  <div className='flex justify-between items-center mt-4'>
                    <div className='flex gap-1 flex-row items-center'>

                    </div>
                    <div>
                      <button type='button'>
                        Create new account?
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
                          'Create account'
                      }
                    </button>
                  </div>
                </form>


          }

          <div className='mt-4'>
            <div className='flex gap-2 justify-center'>
              <div className='text-[#363636]'>
                Already create an account!
              </div>
              <button className='cursor-pointer' type="button" onClick={() => toSignIn()}>
                SignIn
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

export default ResetPassword