import React, { useEffect, useState } from 'react'
import { listShipping } from '../../services/system/shipping';

function Shipping() {
  const [isloadingPage, setIsLoadingPage] = useState(false)
  const [shippings, setShipping] = useState([]);
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
      const response = await listShipping(page);
      const pagination = response.data.data;
      const data = response.data.data.data;
      setPaginate(pagination)
      setShipping(data);
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
          </div>
          :
          <>

            <div className='flex justify-between items-start'>
              <div className='font-semibold'>Shipping</div>
            </div>

            <div className='w-full mt-5 overflow-auto'>
              <table className='w-full'>
                <thead >
                  <tr className='border-2 border-[#040404] h-10 w-full rounded-full'>
                    <th className='font-normal px-5 w-20'>Id*</th>
                    <th className='font-normal px-5'>Email*</th>
                    <th className='font-normal px-5'>Phone number*</th>
                    <th className='font-normal px-5'>Country*</th>
                    <th className='font-normal px-5 w-20'>Address*</th>
                    <th className='font-normal px-5 w-50'>Total*</th>
                    <th className='font-normal px-5 w-100'>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    shippings.map((shipping) =>
                      <tr key={shipping.id} className='h-15 border-b-2 border-[#040404]'>
                        <td className='text-center px-2'>{shipping.id}</td>
                        <td className='text-center px-2 whitespace-nowrap'>{shipping?.email}</td>
                        <td className='text-center px-2 whitespace-nowrap'>{shipping?.phone_number}</td>
                        <td className='text-center px-2 whitespace-nowrap'>{shipping?.country}</td>
                        <td className='text-center px-2 whitespace-nowrap'>{shipping?.address}</td>
                        <td className='text-center px-2 whitespace-nowrap'>${shipping?.order?.total}</td>
                        <td className='px-2'>
                          <div className='flex justify-center items-center gap-2'>
                            <button className=' border border-[#040404] bg-transparent w-max h-8 justify-center items-center rounded-full px-5 shrink-0 flex text-[#363636] font-semibold' type='button' >
                              {shipping.statue}
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

export default Shipping