import React, { useEffect, useState } from 'react'
import { listRecord, showRecord } from '../../services/system/record';

function Record() {
  const [isloadingPage, setIsLoadingPage] = useState(false)
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [records, setRecord] = useState([]);
  const [eachRecord, setEachRecord] = useState({});
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
      const response = await listRecord(page);
      const pagination = response.data.data;
      const data = response.data.data.data;
      setPaginate(pagination)
      setRecord(data);
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoadingPage(false)
    }
  }

  const onShowRecord = async (id) => {
    try {
      setIsLoadingPage(true)

      const response = await showRecord(id)
      const data = response.data.data;
      console.log(data)
      setEachRecord(data);
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoadingPage(false)
      setIsDetailOpen(true)
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
              <div className='font-semibold'>Record</div>
            </div>

            <div className='w-full mt-5 overflow-auto'>
              <table className='w-full'>
                <thead >
                  <tr className='border-2 border-[#040404] h-10 w-full rounded-full'>
                    <th className='font-normal px-5 w-20'>Id*</th>
                    <th className='font-normal px-5'>Order name*</th>
                    <th className='font-normal px-5'>Type order*</th>
                    <th className='font-normal px-5'>Type payment*</th>
                    <th className='font-normal px-5 w-20'>Total*</th>
                    <th className='font-normal px-5 w-100'>Order at*</th>
                    <th className='font-normal px-5 w-50'>Total Item*</th>
                    <th className='font-normal px-5 w-20'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    records.map((record) =>
                      <tr key={record.id} className='h-15 border-b-2 border-[#040404]'>
                        <td className='text-center px-2'>{record.id}</td>
                        <td className='text-center px-2 whitespace-nowrap'>{record?.user?.name}</td>
                        <td className='text-center px-2 whitespace-nowrap'>{record.type_order}</td>
                        <td className='text-center px-2 whitespace-nowrap'>{record.type_payment}</td>
                        <td className='text-center px-2 whitespace-nowrap'>${record.total}</td>
                        <td className='text-center px-2 whitespace-nowrap'>{new Date(record.created_at).toISOString().split('T')[0]}</td>
                        <td className='text-center px-2 whitespace-nowrap'>{record.order_items_count} items</td>
                        <td className='px-2'>
                          <div className='flex justify-center items-center gap-2'>
                            <button className='cursor-pointer border border-[#040404] bg-transparent w-max h-8 justify-center items-center rounded-full px-5 shrink-0 flex text-[#363636] font-semibold' type='button' onClick={() => onShowRecord(record.id)} >
                              Detail
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

            {
              isDetailOpen && <div className='pl-2 md:pl-30 pr-2 fixed bg-[rgba(255,255,255,0.50)] backdrop-blur-sm z-101 top-0 left-0 w-full h-full flex justify-center items-center'>
                <div className='border-2 border-[#040404] w-full md:w-[75%] max-h-[95%] p-2 overflow-y-auto'>
                  <div className='flex justify-between items-center'>
                    <div className='font-semibold'>
                      Detail order #{eachRecord.id}
                    </div>
                    <div>
                      <div className='flex flex-col gap-1.5 cursor-pointer h-8 w-8 ' onClick={() => setIsDetailOpen(false)}>
                        <span className='inline-block w-8 h-1 bg-[#040404] rounded-full rotate-45 mt-3'></span>
                        <span className='inline-block w-8 h-1 bg-[#040404] rounded-full -rotate-45 -mt-2.5'></span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className='font-semibold mt-5 underline underline-offset-2'>Order info</div>

                    <div className='grid grid-cols-2 gap-5'>
                      <div>
                        <div className='flex mt-2 flex-col'>
                          <label htmlFor="" className='font-semibold'>Order name*</label>
                          <div >{eachRecord?.user?.name}</div>
                        </div>

                        <div className='flex mt-2 flex-col'>
                          <label htmlFor="" className='font-semibold'>Type order*</label>
                          <div >{eachRecord?.type_order}</div>
                        </div>

                        <div className='flex mt-2 flex-col'>
                          <label htmlFor="" className='font-semibold'>Type payment*</label>
                          <div >{eachRecord?.type_payment}</div>

                        </div>
                      </div>
                      <div className='flex justify-end'>
                        <div className='flex gap-1 mt-2 flex-col items-end'>
                          <label htmlFor="" className='font-semibold'>Order at*</label>
                          <div >{new Date(eachRecord.created_at).toISOString().split('T')[0]}</div>
                        </div>
                      </div>
                    </div>
                  </div>


                  <div>
                    <div className='font-semibold mt-5 underline underline-offset-2'>Orderitems info</div>
                    {
                      eachRecord?.order_items.map((order_item) => {
                        return <div key={order_item.id} className='flex flex-row justify-between mt-2'>
                          <div>
                            <div>
                              {order_item?.product?.name}
                            </div>
                            <div>
                              ${order_item?.price} x {order_item?.quantity}
                            </div>
                          </div>
                          <div className='text-end'>${order_item?.sub_total}</div>
                        </div>

                      })
                    }

                  </div>

                  <div className='h-px w-full bg-[#040404] mt-5 rounded-full'></div>

                  <div>
                    <div className='flex flex-row justify-between mt-2'>
                      <div className='font-semibold'>
                        Total
                      </div>
                      <div className='text-end'>${eachRecord?.total}</div>
                    </div>
                  </div>
                </div>
              </div>
            }
          </>

      }


    </>

  )
}

export default Record