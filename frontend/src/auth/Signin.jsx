import { useNavigate } from 'react-router-dom'

function Signin() {
  const navigate = useNavigate();

  const toHome = () => {
    navigate('/')
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

          <form action="" className='mt-7'>
            <div className='flex gap-1 flex-col'>
              <label htmlFor="">Email*</label>
              <input type="text" placeholder='email@example.com' className='placeholder:text-[#363636] h-11 border-2 border-[#E9E9E9] outline-0 pl-5 rounded-full' />
            </div>
            <div className='flex gap-1 flex-col mt-4'>
              <label htmlFor="">Password*</label>
              <input type="password" placeholder='***************' className='placeholder:text-[#363636] h-11 border-2 border-[#E9E9E9] outline-0 pl-5 rounded-full' />
            </div>

            <div className='flex justify-between items-center mt-4'>
              <div className='flex gap-1 flex-row items-center'>
                <input type="checkbox" className='placeholder:text-[#363636] h-4 w-4 border-2 border-[#E9E9E9]  rounded-full' />
                <label htmlFor="">Remember me</label>
              </div>
              <div>
                <button>
                  Forget password?
                </button>
              </div>
            </div>

            <div className='mt-4'>
              <button className='cursor-pointer bg-[#040404] w-full h-11 justify-center items-center rounded-full shrink-0 flex text-[#FFFFFF] font-semibold' type='button'>
                Login
              </button>
            </div>

            <div className='mt-4'>
              <div className='flex gap-2 justify-center'>
                <div className='text-[#363636]'>
                  Don't have an account?
                </div>
                <button className='cursor-pointer'>
                  SignUp
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <button className='cursor-pointer bg-transparent w-max justify-center items-center rounded-full shrink-0 flex font-semibold underline underline-offset-2 absolute top-4 left-4' type='button' onClick={() => toHome()}>
        Go back
      </button>
    </>
  )
}

export default Signin