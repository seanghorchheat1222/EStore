import React, { useEffect, useState } from 'react'
import { listBrand, listCategory, listProduct } from '../../services/system/product';

function Product() {

  const [isloadingPage, setIsLoadingPage] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [products, setProduct] = useState([]);
  const [brands, setBrand] = useState([]);
  const [categoires, setCategory] = useState([]);
  const [paginate, setPaginate] = useState({});
  const [page, setPage] = useState(1);
  const [form, setForm] = useState({
    brand_id: '',
    category_id: '',
    name: '',
    price: '',
    stock: '',
    description: ''
  })

  const sizes = [{ name: "S" }, { name: "M" }, { name: "L" }, { name: "XL" }, { name: "XXL" }]
  const colors = [{ name: "red" }, { name: "blue" }, { name: "black" }, { name: "gray" }, { name: "green" }]

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    fetchData()
  }, [page])


  const fetchData = async () => {
    try {
      setIsLoadingPage(true)
      const response = await listProduct(page);
      const responseBrand = await listBrand(page);
      const responseCategory = await listCategory(page);
      const pagination = response.data.data;
      const data = response.data.data.data;
      const dataBrand = responseBrand.data.data.data;
      const dataCategory = responseCategory.data.data.data;
      setPaginate(pagination)
      setProduct(data);
      setBrand(dataBrand);
      setCategory(dataCategory);
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
    setIsFormOpen(true)
  }



  const handleAdd = async (e) => {
    e.preventDefault();
    console.log(form)


  }

  const handleShow = async (id) => {

  }



  const handleDelete = async (id) => {

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

            <div className='flex justify-between items-center'>
              <div className='font-semibold'>Product</div>
              <div className='mt-5'>
                <button className='cursor-pointer bg-[#040404]   w-max h-11 justify-center items-center rounded-full px-5 shrink-0 flex text-[#FFFFFF] font-semibold' type='submit' onClick={() => onAddOpen()}>
                  Add new product
                </button>
              </div>
            </div>

            <div className='w-full mt-5 overflow-auto'>
              <table className='w-full'>
                <thead >
                  <tr className='border-2 border-[#040404] h-10 w-full rounded-full'>
                    <th className='font-normal px-5 w-20'>Id*</th>
                    <th className='font-normal px-5 '>Name*</th>
                    <th className='font-normal px-5 w-20'>Brand*</th>
                    <th className='font-normal px-5 w-20'>Category*</th>
                    <th className='font-normal px-5 w-20'>stock</th>
                    <th className='font-normal px-5 w-100'>Description</th>
                    <th className='font-normal px-5 w-20'>Status*</th>
                    <th className='font-normal px-5 w-50'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    products.map((product) =>
                      <tr key={product.id} className='h-15 border-b-2 border-[#040404]'>
                        <td className='text-center px-2'>{product.id}</td>
                        <td className='text-center px-2 whitespace-nowrap'>{product.name}</td>
                        <td className='text-center px-2'>{product?.brand?.name}</td>
                        <td className='text-center px-2'>{product?.category?.name}</td>
                        <td className='text-center px-2'>{product?.inventory?.stock}</td>
                        <td className='text-center line-clamp-3'>{product.description}</td>
                        <td className='text-center px-2'>{product.is_active ? 'active' : 'in-active'}</td>
                        <td className='px-2'>
                          <div className='flex justify-center items-center gap-2'>
                            <button className='cursor-pointer border border-[#040404] bg-transparent w-max h-8 justify-center items-center rounded-full px-5 shrink-0 flex text-[#363636] font-semibold' type='button' onClick={() => handleShow(product.id)}>
                              Edit
                            </button>
                            <button className='cursor-pointer ] bg-[#040404] w-max h-8 justify-center items-center rounded-full px-5 shrink-0 flex text-[#FFFFFF] font-semibold' type='button' onClick={() => handleDelete(product.id)}>
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
                <div className='border-2 border-[#040404] w-full md:w-[75%] max-h-[95%] p-2 overflow-y-auto'>
                  <div className='flex justify-between items-center'>
                    <div className='font-semibold'>
                      Add new product
                    </div>
                    <div>
                      <div className='flex flex-col gap-1.5 cursor-pointer h-8 w-8 ' onClick={() => setIsFormOpen(false)}>
                        <span className='inline-block w-8 h-1 bg-[#040404] rounded-full rotate-45 mt-3'></span>
                        <span className='inline-block w-8 h-1 bg-[#040404] rounded-full -rotate-45 -mt-2.5'></span>
                      </div>
                    </div>
                  </div>

                  <form action="" onSubmit={handleAdd}>
                    <div className='flex gap-1 mt-5 flex-col'>
                      <label htmlFor="">Name*</label>
                      <input placeholder='Enter brand name' type="text" name="name" value={form?.name} required onChange={handleInput} className='placeholder:text-[#363636] h-11 border-2  outline-0 pl-4 rounded-full border-[#040404]' />
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                      <div className='flex gap-1 mt-3 flex-col'>
                        <label htmlFor="">Brand*</label>
                        <div className='placeholder:text-[#363636] h-11 border-2  outline-0 pl-4 rounded-full border-[#040404] pr-2'>
                          <select id="" className='w-full h-full outline-0' onChange={handleInput} name="brand_id">
                            <option>Select brand</option>
                            {
                              brands.map((brand) =>
                                <option value={brand.id}>{brand.name}</option>
                              )
                            }
                          </select>
                        </div>

                      </div>
                      <div className='flex gap-1 mt-3 flex-col'>
                        <label htmlFor="">Category*</label>
                        <div className='placeholder:text-[#363636] h-11 border-2  outline-0 pl-4 rounded-full border-[#040404] pr-2'>
                          <select name="category_id" id="" className='w-full h-full outline-0 ' onChange={handleInput}>
                            <option>Select brand</option>
                            {
                              categoires.map((category) =>
                                <option value={category.id}>{category.name}</option>
                              )
                            }
                          </select>
                        </div>
                      </div>
                    </div>


                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                      <div className='flex gap-1 mt-3 flex-col'>
                        <label htmlFor="">Price*</label>
                        <input placeholder='Enter price' type="number" name="price" value={form?.price} required onChange={handleInput} className='placeholder:text-[#363636] h-11 border-2  outline-0 pl-4 rounded-full border-[#040404]' />
                      </div>
                      <div className='flex gap-1 mt-3 flex-col'>
                        <label htmlFor="">Stock*</label>
                        <input placeholder='Enter stock' type="number" name="stock" value={form?.stock} required onChange={handleInput} className='placeholder:text-[#363636] h-11 border-2  outline-0 pl-4 rounded-full border-[#040404]' />
                      </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                      <div className='flex gap-1 mt-3 flex-col'>
                        <div>
                          <label htmlFor="">Select Size*</label>
                        </div>
                        <div className='flex-wrap flex w-full min-h-11 items-center pl-4'>
                          {
                            sizes.map((size) =>
                              <div className='flex gap-2 w-15 h-7 items-center '>
                                <div className='w-max h-max'>{size.name}</div>
                                <div className=' h-max flex items-center'>
                                  <input placeholder='Enter price' type="checkbox" name="name" value={form?.name} onChange={handleInput} className='placeholder:text-[#363636] h-5 w-5 border-2  outline-0 pl-4 rounded-full border-[#040404]' />
                                </div>
                              </div>
                            )
                          }
                        </div>
                      </div>
                      <div className='flex gap-1 mt-3 flex-col'>
                        <div>
                          <label htmlFor="">Select Color*</label>
                        </div>
                        <div className='flex flex-wrap w-full min-h-11 items-center pl-4'>
                          {
                            colors.map((color) =>
                              <div className='flex gap-2 w-20 h-7 items-center'>
                                <div className='w-max h-max'>{color.name}</div>
                                <div className=' h-max flex items-center'>
                                  <input placeholder='Enter price' type="checkbox" name="name" value={form?.name} onChange={handleInput} className='placeholder:text-[#363636] h-5 w-5 border-2  outline-0 pl-4 rounded-full border-[#040404]' />
                                </div>
                              </div>
                            )
                          }
                        </div>
                      </div>
                    </div>

                    <div className='flex gap-1 mt-3 flex-col'>
                      <div>
                        <div>
                          <label htmlFor="">Image*</label>
                        </div>
                        <div className='flex justify-end'>
                          <button className='cursor-pointer ] bg-[#040404] w-max h-8 justify-center items-center rounded-full px-5 shrink-0 flex text-[#FFFFFF] font-semibold' type='button' >
                            Add image
                          </button>
                        </div>
                      </div>

                      <div placeholder='Enter brand description' type="text" name="description" value={form?.description} onChange={handleInput} className='placeholder:text-[#363636] h-21 border-2 pt-1  outline-0 pl-4 rounded-xl border-[#040404]'></div>
                    </div>

                    <div className='flex gap-1 mt-3 flex-col'>
                      <label htmlFor="">Descrption*</label>
                      <textarea placeholder='Enter brand description' type="text" name="description" value={form?.description} onChange={handleInput} className='placeholder:text-[#363636] h-21 border-2 pt-1  outline-0 pl-4 rounded-xl border-[#040404]' />
                    </div>
                    <div className='mt-2 flex justify-end'>
                      <button className='cursor-pointer bg-[#040404]   w-max h-11 justify-center items-center rounded-full px-5 shrink-0 flex text-[#FFFFFF] font-semibold' type='submit' disabled={isloadingPage}>
                        Add
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            }
          </>

      }


    </>
  )
}

export default Product