import React, { useEffect, useState } from 'react'
import { createCategory, deleteCategory, listCategory, showCategory, updateCategory } from '../../services/system/category';

function Category() {
  const [isloadingPage, setIsLoadingPage] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(null)
  const [categories, setCategory] = useState([]);
  const [paginate, setPaginate] = useState({});
  const [page, setPage] = useState(1);
  const [form, setForm] = useState({
    id: '',
    name: '',
    description: ''
  })

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    fetchData()
  }, [page])


  const fetchData = async () => {
    try {
      setIsLoadingPage(true)
      const response = await listCategory(page);
      const pagination = response.data.data
      const data = response.data.data.data;
      setCategory(data)
      setPaginate(pagination)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoadingPage(false)
    }
  }

  const handleInput = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form, [name]: value
    })
  }

  const onAddOpen = () => {
    setIsAdd(true)
    setIsFormOpen(true)
  }

  const onFormClose = () => {
    setIsFormOpen(false)
    setForm({
      name: '',
      description: ''
    })
  }

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      setIsLoadingPage(true)
      await createCategory(form);
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoadingPage(false)
      setIsAdd(true)
      fetchData();
    }
  }

  const handleShow = async (id) => {
    try {
      setIsLoadingPage(true)
      const response = await showCategory(id);
      const data = response.data.data;
      setForm(data)
      setIsAdd(false)
      setIsFormOpen(true)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoadingPage(false)
    }

  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      setIsLoadingPage(true)
      await updateCategory(form.id, form);
      setIsAdd(true)
      setIsFormOpen(false)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoadingPage(false)
      fetchData()
    }
  }

  const handleDelete = async (id) => {
    try {
      setIsLoadingPage(true)
      await deleteCategory(id)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoadingPage(false)
      fetchData()
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

            <div className='flex justify-between items-center'>
              <div className='font-semibold'>Category</div>
              <div className='mt-5'>
                <button className='cursor-pointer bg-[#040404]   w-max h-11 justify-center items-center rounded-full px-5 shrink-0 flex text-[#FFFFFF] font-semibold' type='submit' onClick={() => onAddOpen()}>
                  Add new category
                </button>
              </div>
            </div>

            <div className='w-full mt-5 overflow-auto'>
              <table className='w-full'>
                <thead >
                  <tr className='border-2 border-[#040404] h-10 w-full rounded-full'>
                    <th className='font-normal px-5 w-20'>Id*</th>
                    <th className='font-normal px-5 w-20'>Name*</th>
                    <th className='font-normal px-5 w-100'>Description</th>
                    <th className='font-normal px-5 w-50'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    categories.map((category) =>
                      <tr key={category.id} className='h-15 border-b-2 border-[#040404]'>
                        <td className='text-center px-2'>{category.id}</td>
                        <td className='text-center px-2'>{category.name}</td>
                        <td className='text-center'>{category.description}</td>
                        <td className='px-2'>
                          <div className='flex justify-center items-center gap-2'>
                            <button className='cursor-pointer border border-[#040404] bg-transparent w-max h-8 justify-center items-center rounded-full px-5 shrink-0 flex text-[#363636] font-semibold' type='button' onClick={() => handleShow(category.id)}>
                              Edit
                            </button>
                            <button className='cursor-pointer ] bg-[#040404] w-max h-8 justify-center items-center rounded-full px-5 shrink-0 flex text-[#FFFFFF] font-semibold' type='button' onClick={() => handleDelete(category.id)}>
                              Delete
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
              isFormOpen && <div className='pl-2 md:pl-30 pr-2 fixed bg-[rgba(255,255,255,0.50)] backdrop-blur-sm z-101 top-0 left-0 w-full h-full flex justify-center items-center'>
                <div className='border-2 border-[#040404] w-full md:w-[60%] h-max p-2'>
                  <div className='flex justify-between items-center'>
                    <div className='font-semibold'>
                      {
                        isAdd ? 'Add new category' : 'Edit category'
                      }

                    </div>
                    <div>
                      <div className='flex flex-col gap-1.5 cursor-pointer h-8 w-8 ' onClick={() => onFormClose()}>
                        <span className='inline-block w-8 h-1 bg-[#040404] rounded-full rotate-45 mt-3'></span>
                        <span className='inline-block w-8 h-1 bg-[#040404] rounded-full -rotate-45 -mt-2.5'></span>
                      </div>
                    </div>
                  </div>

                  <form action="" onSubmit={isAdd ? handleAdd : handleUpdate}>
                    <div className='flex gap-1 mt-5 flex-col'>
                      <label htmlFor="">Name*</label>
                      <input placeholder='Enter brand name' type="text" name="name" value={form?.name} required onChange={handleInput} className='placeholder:text-[#363636] h-11 border-2  outline-0 pl-5 rounded-full border-[#040404]' />
                    </div>

                    <div className='flex gap-1 mt-5 flex-col'>
                      <label htmlFor="">Descrption*</label>
                      <textarea placeholder='Enter brand description' type="text" name="description" value={form?.description} onChange={handleInput} className='placeholder:text-[#363636] h-21 border-2  outline-0 pl-5 rounded-xl border-[#040404]' />
                    </div>

                    {
                      isAdd ?
                        <div className='mt-2 flex justify-end'>
                          <button className='cursor-pointer bg-[#040404]   w-max h-11 justify-center items-center rounded-full px-5 shrink-0 flex text-[#FFFFFF] font-semibold' type='submit' disabled={isloadingPage}>
                            Add
                          </button>
                        </div> :
                        <div className='mt-2 flex justify-end gap-2'>
                          <button className='cursor-pointer border border-[#040404] bg-transparent w-max h-11 justify-center items-center rounded-full px-5 shrink-0 flex text-[#363636] font-semibold' type='button' onClick={() => onFormClose()}>
                            Cancel
                          </button>
                          <button className='cursor-pointer bg-[#040404]   w-max h-11 justify-center items-center rounded-full px-5 shrink-0 flex text-[#FFFFFF] font-semibold' type='submit' disabled={isloadingPage}>
                            Update
                          </button>
                        </div>
                    }
                  </form>
                </div>
              </div>
            }


          </>

      }


    </>
  )
}

export default Category