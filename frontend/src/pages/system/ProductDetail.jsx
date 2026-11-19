import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DeleteIcon from '../../components/ui/DeleteIcon';
import { deleteProductImage, isActiveProduct, listBrand, listCategory, showProduct, updateProduct } from '../../services/system/productdetail';
import DoneIcon from '../../components/ui/DoneIcon';

function ProductDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [brands, setBrand] = useState([]);
  const [categoires, setCategory] = useState([]);
  const [product, setProduct] = useState({})
  const [isloadingPage, setIsLoadingPage] = useState(false)
  const [form, setForm] = useState({
    brand_id: '',
    category_id: '',
    name: '',
    price: '',
    stock: '',
    description: ''
  })
  const [imagePreviews, setImagePreview] = useState([]);
  const [newImage, setNewImage] = useState([])
  const [isEdit, setIsEdit] = useState(false);
  const [sizeForms, setSizeForm] = useState([]);
  const [colorForms, setColorForm] = useState([]);

  const sizes = [
    { id: 1, name: "S", checked: false },
    { id: 2, name: "M", checked: false },
    { id: 3, name: "L", checked: false },
    { id: 4, name: "XL", checked: false },
    { id: 5, name: "XXL", checked: false }
  ]


  const colors = [
    { id: 1, name: "red", checked: false },
    { id: 2, name: "blue", checked: false },
    { id: 3, name: "black", checked: false },
    { id: 4, name: "gray", checked: false },
    { id: 5, name: "green", checked: false },
  ];


  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setIsLoadingPage(true)
      const response = await showProduct(id)
      const responseBrand = await listBrand();
      const responseCategory = await listCategory();
      const data = response.data.data
      const dataImagePreview = response.data.data.product_images
      const dataBrand = responseBrand.data.data.data;
      const dataCategory = responseCategory.data.data.data;
      setCategory(dataCategory)
      setBrand(dataBrand)
      setProduct(data)
      setForm({
        name: data.name,
        price: data.price,
        stock: data?.inventory?.stock,
        description: data.description
      })
      setImagePreview(dataImagePreview)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoadingPage(false)
    }
  }



  const handleAddSize = (Id) => {
    const sizeAlreadyAdd = sizeForms.some((sizeform) => sizeform.id === Id);
    if (sizeAlreadyAdd) {
      const finalsizeForms = sizeForms.filter((sizeform) => sizeform.id !== Id)
      setSizeForm([...finalsizeForms])
    } else {
      const findSize = sizes.find((sizeform) => sizeform.id === Id);
      findSize.checked = !findSize.checked
      const finalSize = sizes.find((size) => size.checked === true)
      setSizeForm([...sizeForms, finalSize])
    }
  }

  const handleAddColor = (Id) => {
    const colorAlreadyAdd = colorForms.some((colorform) => colorform.id === Id);
    if (colorAlreadyAdd) {
      const finalcolorForms = colorForms.filter((colorform) => colorform.id !== Id)
      setColorForm([...finalcolorForms])
    } else {
      const findColor = colors.find((colorform) => colorform.id === Id);
      findColor.checked = !findColor.checked
      const finalColor = colors.find((color) => color.checked === true)
      setColorForm([...colorForms, finalColor])
    }
  }

  const handleInput = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form, [name]: value
    })
  }

  const handleImageInput = (e) => {
    const file = e.target.files[0];
    const eachimagePreview = file ? URL.createObjectURL(file) : '';
    const image = {
      type: 'new_image',
      image: file,
      image_preview: eachimagePreview
    }
    setImagePreview([...imagePreviews, image])
    setNewImage([...newImage, image])
  }

  const handleDeleteImage = async (i, type) => {
    try {
      if (type === "new_image") {
        const resultImagePreview = imagePreviews.filter((imagePreview, index) => index !== i)
        setImagePreview(resultImagePreview)
      } else {
        setIsLoadingPage(true)
        const imageProductId = imagePreviews.find((imagePreview, index) => index == i).id
        await deleteProductImage(imageProductId)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoadingPage(false)
      fetchData()
    }
  }

  const handleUpdateProduct = async () => {
    try {
      setIsLoadingPage(true)
      const formdata = new FormData();
      formdata.append('brand_id', form.brand_id);
      formdata.append('category_id', form.category_id);
      formdata.append('name', form.name);
      formdata.append('price', form.price);
      formdata.append('stock', form.stock);

      if (sizeForms.length !== 0) {
        sizeForms.forEach((sizeform, index) =>
          formdata.append(`productsizes[${index}][name]`, sizeform.name)
        )
      }

      if (colorForms.length !== 0) {
        colorForms.forEach((colorform, index) =>
          formdata.append(`productcolors[${index}][name]`, colorform.name)
        )
      }

      if (newImage.length !== 0) {
        newImage.forEach((imagePreview, index) => {
          formdata.append(`productimages[${index}][image]`, imagePreview.image)
        }
        )
      }

      await updateProduct(id, formdata)

    } catch (err) {
      console.log(err)
    } finally {
      setIsLoadingPage(false)
      setIsEdit(false)
      fetchData()
    }
  }

  const toProduct = () => {
    navigate('/admin/products')
  }


  const onIsActiveProduct = async () => {
    try {
      setIsLoadingPage(true);
      await isActiveProduct(id);
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoadingPage(false)
      fetchData();
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
              <button className='cursor-pointer bg-transparent w-max justify-center items-center rounded-full shrink-0 flex font-semibold underline underline-offset-2 md:left-4' type='button' onClick={() => toProduct()}>
                Go back
              </button>

              {
                isEdit ?
                  <div className='flex gap-3'>
                    <button className='cursor-pointer border border-[#040404] bg-transparent w-max h-11 justify-center items-center rounded-full px-5 shrink-0 flex text-[#363636] font-semibold' type='button' onClick={() => setIsEdit(false)}>
                      Cancel
                    </button>
                    <button className='cursor-pointer bg-[#040404] w-max h-11 justify-center items-center rounded-full px-5 shrink-0 flex text-[#FFFFFF] font-semibold' type='button' onClick={() => handleUpdateProduct()}>
                      {
                        isloadingPage ?
                          <div className='h-7 w-7 rounded-full relative'>
                            <div className='h-full w-full border-3 border-[rgba(255,255,255,0.50)] rounded-full absolute top-0 left-0 z-1'></div>
                            <div className='h-full w-full border-l-3 border-t-3  border-[rgba(255,255,255,100)] rounded-full absolute top-0 left-0 animate-spin z-2 '></div>
                          </div>
                          :
                          'Update'
                      }
                    </button>
                  </div>
                  :
                  <div className='flex gap-4 '>
                    <button className='cursor-pointer bg-[#040404] w-max h-11 justify-center items-center rounded-full px-5 shrink-0 flex text-[#FFFFFF] font-semibold' type='button' onClick={() => setIsEdit(true)}>
                      Edit
                    </button>
                  </div>
              }
            </div>


            <div className='w-full  max-h-[95%]overflow-y-auto mt-5'>
              <div className='flex justify-between items-center'>
                <div className='font-semibold '>
                  Product detail #{id}
                </div>
                <div>
                </div>
              </div>

              <form action="" >
                <div className='flex gap-1 mt-5 flex-col'>
                  <label htmlFor="">Name*</label>
                  <input placeholder='Enter brand name' type="text" name="name" value={form?.name} required onChange={handleInput} className='placeholder:text-[#363636] h-11 border-2  outline-0 pl-4 rounded-full border-[#040404]' />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                  {
                    isEdit ?
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
                      :
                      <div className='flex gap-1 mt-5 flex-col'>
                        <label htmlFor="">Brand*</label>
                        <input placeholder='Enter brand name' type="text" name="name" value={product?.brand?.name} required onChange={handleInput} className='placeholder:text-[#363636] h-11 border-2  outline-0 pl-4 rounded-full border-[#040404]' />
                      </div>
                  }

                  {
                    isEdit ?
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
                      :
                      <div className='flex gap-1 mt-5 flex-col'>
                        <label htmlFor="">Category*</label>
                        <input placeholder='Enter brand name' type="text" name="name" value={product?.category?.name} required onChange={handleInput} className='placeholder:text-[#363636] h-11 border-2  outline-0 pl-4 rounded-full border-[#040404]' />
                      </div>
                  }
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

                  {
                    isEdit ? <div className='flex gap-1 mt-3 flex-col'>
                      <div>
                        <label htmlFor="">Select Size*</label>
                      </div>
                      <div className='flex-wrap flex w-full min-h-11 items-center pl-4'>
                        {
                          sizes.map((size) =>
                            <div className='flex gap-2 w-15 h-7 items-center '>
                              <div className='w-max h-max'>{size.name}</div>
                              <div className=' h-max flex items-center'>
                                <input type="checkbox" onChange={() => handleAddSize(size.id)} className='placeholder:text-[#363636] h-5 w-5 border-2  outline-0 pl-4 rounded-full border-[#040404]' />
                              </div>
                            </div>
                          )
                        }
                      </div>
                    </div>
                      :
                      <div className='flex gap-1 mt-3 flex-col'>
                        <div>
                          <label htmlFor="">Size Selected*</label>
                        </div>
                        <div className='flex-wrap flex w-full min-h-11 items-center pl-4'>
                          {
                            product?.product_sizes?.map((size) =>
                              <div className='flex gap-2 w-15 h-7 items-center '>
                                <div className='w-max h-max'>{size.name}</div>
                                <div className=' flex items-center h-5 w-5 border-2 border-[#040404] bg-[#] rounded-sm'>
                                  <div>
                                    <DoneIcon className={'fill-[#363636] w-full h-full'}>
                                    </DoneIcon>
                                  </div>
                                </div>
                              </div>
                            )
                          }
                        </div>
                      </div>
                  }

                  {
                    isEdit ? <div className='flex gap-1 mt-3 flex-col'>
                      <div>
                        <label htmlFor="">Select color*</label>
                      </div>
                      <div className='flex flex-wrap w-full min-h-11 items-center pl-4'>
                        {
                          colors.map((color) => {
                            return <div className='flex gap-2 w-20 h-7 items-center'>
                              <div className='w-max h-max'>{color.name}</div>
                              <div className=' h-max flex items-center'>
                                <input type="checkbox" onChange={() => handleAddColor(color.id)} className='placeholder:text-[#363636] h-5 w-5 border-2  outline-0 pl-4 rounded-full border-[#040404]' />
                              </div>
                            </div>
                          }
                          )
                        }
                      </div>
                    </div> :

                      <div className='flex gap-1 mt-3 flex-col'>
                        <div>
                          <label htmlFor="">Color Selected*</label>
                        </div>
                        <div className='flex flex-wrap w-full min-h-11 items-center pl-4'>
                          {
                            product?.product_colors?.map((color) => {
                              return <div className='flex gap-2 w-20 h-7 items-center'>
                                <div className='w-max h-max'>{color.name}</div>
                                <div className=' flex items-center h-5 w-5 border-2 border-[#040404] bg-[#] rounded-sm'>
                                  <div>
                                    <DoneIcon className={'fill-[#363636] w-full h-full'}>
                                    </DoneIcon>
                                  </div>
                                </div>
                              </div>
                            }
                            )
                          }
                        </div>
                      </div>
                  }
                </div>

                <div className='flex gap-1 mt-3 flex-col'>
                  <div>
                    <div>
                      <label htmlFor="">Image*</label>
                    </div>
                    {
                      isEdit && <div className='flex justify-end'>
                        <button className='cursor-pointer ] bg-[#040404] w-max h-8 justify-center items-center rounded-full px-5 shrink-0 flex text-[#FFFFFF] font-semibold relative' type='button' >
                          <input type="file" className='absolute w-full h-full opacity-0 cursor-pointer' onChange={handleImageInput} />
                          Add image
                        </button>
                      </div>
                    }

                  </div>

                  <div type="text" name="description" className=' h-auto border-2 outline-0 rounded-xl border-[#040404] p-4'>
                    <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
                      {
                        imagePreviews.map((imagePreview, index) =>
                          <div key={index} className='w-full h-50 rounded-md border-[#040404] border-2 relative'>
                            <button className='cursor-pointer bg-[#040404] w-11 h-11 flex justify-center items-center rounded-full shrink-0 absolute -right-3 -top-3' type='button' onClick={() => handleDeleteImage(index, imagePreview.type)}>
                              <div className='w-4 h-4'>
                                <DeleteIcon className={"fill-[#FFFFFF] w-full h-full"}>
                                </DeleteIcon>
                              </div>
                            </button>
                            <img src={imagePreview.type === "new_image" ? imagePreview.image_preview : `${import.meta.env.VITE_IMAGE_URL}/${imagePreview.image_path}`} alt="" className='object-cover w-full h-full rounded-md' />
                          </div>
                        )
                      }
                    </div>
                  </div>
                </div>

                <div className='flex gap-1 mt-3 flex-col'>
                  <label htmlFor="">Descrption*</label>
                  <textarea placeholder='Enter brand description' type="text" name="description" value={form?.description} onChange={handleInput} className='placeholder:text-[#363636] h-21 border-2 pt-1  outline-0 pl-4 rounded-xl border-[#040404]' />
                </div>

                <div className='flex  w-full min-h-11 items-center justify-end mt-3'>

                  <div className='flex gap-2 w-20 h-7 items-center'>
                    <div className='w-max h-max'>Status*</div>
                    <div className=' h-max flex items-center'>
                      <input type="checkbox" checked={product.is_active === 1} onChange={() => onIsActiveProduct()} className='placeholder:text-[#363636] h-5 w-5 border-2  outline-0 pl-4 rounded-full border-[#040404]' />
                    </div>
                  </div>
                </div>

              </form>
            </div>
          </>
      }
    </>


  )
}

export default ProductDetail