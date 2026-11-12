import React, { useEffect, useState } from 'react'
import { listUser } from '../../services/system/user';

function User() {

  const [isloadingPage, setIsLoadingPage] = useState(false)
  const [users, setUser] = useState([]);
  const [paginate, setPaginate] = useState({});
  const [page, setPage] = useState(1);


  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    fetchData()
  }, [page])

  const fetchData = async () => {
    try {
      setIsLoadingPage(true)
      const response = await listUser(page);
      const pagination = response.data.data
      const data = response.data.data.data;
      setUser(data)
      setPaginate(pagination)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoadingPage(false)
    }
  }


 
  return (
    <>
      {
        isloadingPage ?
          <div className='h-[85vh] w-full flex justify-center items-center'>
            <div className='h-7 w-7 rounded-full relative'>
              <div className='h-full w-full border-3 border-[rgba(4,4,4,0.50)] rounded-full absolute top-0 left-0 z-1'></div>
              <div className='h-full w-full border-l-3 border-t-3  border-[rgba(4,4,4,100)] rounded-full absolute top-0 left-0 animate-spin z-2 '></div>
            </div>
          </div> :
          <>

            <div className='flex justify-start items-start'>
              <div className='font-semibold'>User</div>

            </div>

            <div className='w-full mt-5 overflow-auto'>
              <table className='w-full'>
                <thead >
                  <tr className='border-2 border-[#040404] h-10 w-full rounded-full'>
                    <th className='font-normal px-5 w-20'>Id*</th>
                    <th className='font-normal px-5 w-20'>Name*</th>
                    <th className='font-normal px-5 w-20'>Email*</th>
                    <th className='font-normal px-5 w-20'>Verify at*</th>
                    <th className='font-normal px-5 w-50'>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    users.map((user) =>
                      <tr key={user.id} className='h-15 border-b-2 border-[#040404]'>
                        <td className='text-center px-2'>{user.id}</td>
                        <td className='text-center px-2'>{user.name}</td>
                        <td className='text-center px-2'>{user.email}</td>
                        <td className='text-center'>{new Date(user?.email_verified_at).toISOString().split('T')[0]}</td>
                        <td className='px-2'>
                          <div className='flex justify-center items-center gap-2'>
                            <button className='cursor-pointer ] bg-[#040404] w-max h-8 justify-center items-center rounded-full px-5 shrink-0 flex text-[#FFFFFF] font-semibold' type='button'>
                              Active
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  }

                </tbody>
              </table>
            </div>

            <div className='flex justify-between mt-5'>
              <div>
                Page <span className='text-[#363636]'>{paginate.current_page}</span>
              </div>
              <div>
                <div className='flex justify-center items-center gap-2'>
                  <button className={`cursor-pointer ] bg-[#040404] w-max h-8 justify-center items-center rounded-full px-5 shrink-0 flex text-[#FFFFFF] font-semibold ${paginate.current_page === 1 ? ' hidden' : 'block'}  `} type='button' onClick={() => setPage(paginate.current_page - 1)}>
                    Prev
                  </button>
                  <button className={`cursor-pointer ] bg-[#040404] w-max h-8 justify-center items-center rounded-full px-5 shrink-0 flex text-[#FFFFFF] font-semibold   ${paginate.current_page === paginate.last_page ? ' hidden' : 'block'} `} type='button' onClick={() => setPage(paginate.current_page + 1)}>
                    Next
                  </button>
                </div>
              </div>
            </div>

          </>

      }


    </>
  )
}

export default User