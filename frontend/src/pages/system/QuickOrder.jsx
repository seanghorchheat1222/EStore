import React, { useState } from 'react'
import preImage from '../../assets/images/preProfile.png'
import { useEffect } from 'react'
import { listCategory, listProduct, order, showProduct } from '../../services/system/quickorder'
import AddIcon from '../../components/ui/addIcon'
import AbstractIcon from '../../components/ui/AbstractIcon'
import { useDispatch, useSelector } from 'react-redux'
import { addCart, clearItem, decreaseQuantity, increaseQuantity, removeItem } from '../../store/cartSlice'
import DeleteIcon from '../../components/ui/DeleteIcon'
import CartIcon from '../../components/ui/CartIcon'
import DoneIcon from '../../components/ui/DoneIcon'

function QuickOrder() {
  const [isloadingPage, setIsLoadingPage] = useState(false)
  const [paginate, setPaginate] = useState({});
  const [page, setPage] = useState(1);
  const [products, setProduct] = useState([]);
  const [categories, setCategory] = useState([]);
  const [sortCategory, setSortCategory] = useState(-1)
  const dispatch = useDispatch()
  const carts = useSelector((state) => state.cart.items)
  const [total, setTotal] = useState(0)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isPaymentType, setIsPaymentType] = useState('');
  const [isOrderSuccess, setIsOrderSuccess] = useState(false)
  const [orderRecipt, setOrderRecipt] = useState({})


  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    fetchData()
  }, [page, sortCategory])

  useEffect(() => {
    let sum = 0;

    carts.forEach(item => sum = sum + Number(item.price) * Number(item.quantity));

    setTotal(sum)
  }, [carts])

  const fetchData = async () => {
    try {
      setIsLoadingPage(true)
      const response = await listProduct(page, sortCategory);
      const categoryResponse = await listCategory();
      const data = response.data.data.data;
      const categoryData = categoryResponse.data.data.data;
      const pagination = response.data.data;
      setPaginate(pagination)
      setProduct(data);
      console.log(data)
      setCategory(categoryData)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoadingPage(false)
    }
  }

  const onAddCart = async (id) => {
    try {
      const response = await showProduct(id);
      const data = response.data.data;
      console.log(data)
      dispatch(addCart(
        {
          id: data.id,
          name: data.name,
          price: data.price,
          product_images: data.product_images,
          quantity: 1
        }
      ))
    } catch (err) {
      console.log(err)
    } finally {
    }
  }

  const handleOrder = async () => {
    try {
      const form = {
        type_order: 'walkin',
        type_payment: isPaymentType,
        orderitems: carts
      }

      const response = await order(form);
      const data = response.data.order
      console.log(data)
      setOrderRecipt(data);
      setIsOrderSuccess(true)

    } catch (err) {
      console.log(err)
    } finally {
      dispatch(clearItem())
      setIsPaymentType('')
    }
  }



  return (
    <>
      {
        isloadingPage ?
          <div className='h-[85vh] w-full flex justify-center items-center'>
            < div className='h-7 w-7 rounded-full relative' >
              <div className='h-full w-full border-3 border-[rgba(4,4,4,0.50)] rounded-full absolute top-0 left-0 z-1'></div>
              <div className='h-full w-full border-l-3 border-t-3  border-[rgba(4,4,4,100)] rounded-full absolute top-0 left-0 animate-spin z-2 '></div>
            </div >
          </div > :

          <>
            <div className='font-semibold'>Quick order</div>
            <div className='flex gap-3 mt-5'>

              <div className='flex-1'>

                <div className='flex flex-wrap gap-3 mb-5'>
                  <button className={`cursor-pointer ${sortCategory === -1 ? ' bg-[#040404] text-[#FFFFFF] ' : 'bg-transparent border border-[#040404] text-[#363636]'} w-max h-8 justify-center items-center rounded-full px-5 shrink-0 flex  font-semibold `} type='button' onClick={() => setSortCategory(-1)}>
                    All item
                  </button>
                  {
                    categories.map((category) =>
                      <button key={category.id} className={`cursor-pointer ${sortCategory === category.id ? ' bg-[#040404] text-[#FFFFFF] ' : 'bg-transparent border border-[#040404] text-[#363636]'} w-max h-8 justify-center items-center rounded-full px-5 shrink-0 flex  font-semibold `} type='button' onClick={() => setSortCategory(category.id)} >
                        {category.name}
                      </button>
                    )
                  }
                </div>

                <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 `}>
                  {
                    products.map((product) =>
                      <div key={product.id} className={` p-3 bg-[#FFFFFF] rounded-md ${carts.some((cart) => cart.id === product.id) ? 'border border-[#040404]' : 'border-0'}`}>
                        <div className='w-full h-80'>
                          <img src={`${import.meta.env.VITE_IMAGE_URL}/${product?.product_images[0]?.image_path}`} alt="" className='w-full h-full object-cover object-top' />
                        </div>
                        <div>
                          <div className='line-clamp-1 mt-3'>
                            {product.name}<span className='text-[#363636]'>(${product.price})</span>
                          </div>
                          {
                            carts.some((cart) => cart.id === product.id) ?
                              <div className='mt-3 flex gap-2 justify-between'>
                                <button className={`cursor-pointer  bg-[#040404] text-[#FFFFFF] flex-1 h-8 justify-center items-center rounded-full px-5 shrink-0 flex  font-semibold   `} type='button' >
                                  Choose
                                </button>
                                <div className='flex bg-[#E9E9E9] rounded-full h-8 px-1.5 gap-2 items-center'>
                                  <button className={`cursor-pointer  bg-[#FFFFFF] w-6 h-6 justify-center items-center rounded-full shrink-0 flex  font-semibold   `} type='button' onClick={() => dispatch(decreaseQuantity(product.id))} >
                                    <div className='w-5 h-5'>
                                      <AbstractIcon className={'fill-[#363636] w-full h-full'}>
                                      </AbstractIcon>
                                    </div>
                                  </button>
                                  <div>
                                    {
                                      carts.find((cart) => cart.id === product.id).quantity
                                    }
                                  </div>
                                  <button className={`cursor-pointer bg-[#FFFFFF]  w-6 h-6 justify-center items-center rounded-full shrink-0 flex  font-semibold   `} type='button' onClick={() => dispatch(increaseQuantity(product.id))}>
                                    <div className='w-5 h-5'>
                                      <AddIcon className={'fill-[#363636] w-full h-full'}>
                                      </AddIcon>
                                    </div>
                                  </button>
                                </div>

                              </div> :
                              <div className='mt-3'>
                                <button className={`cursor-pointer  bg-transparent border border-[#040404] text-[#363636] w-full h-8 justify-center items-center rounded-full px-5 shrink-0 flex  font-semibold   `} type='button' onClick={() => onAddCart(product.id)} disabled={carts.some((cart) => cart.id === product.id)} >
                                  Add item
                                </button>
                              </div>

                          }

                        </div>
                      </div>
                    )
                  }

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
              </div>

              <div className={`w-60 lg:w-80 bg-[#FFFFFF] h-screen md:h-full rounded-md fixed  z-10 md:static ${isCartOpen ? 'right-0' : '-right-full '} overflow-auto`}>
                <div className='relative p-2'>
                  <div className='font-semibold'>Order Summary</div>
                  <div className='h-px w-full bg-[#040404] mt-5 rounded-full'></div>
                  <div className='mt-3'>
                    Select Payment Type
                  </div>
                  <div className='mt-3 flex w-full justify-center gap-3'>
                    <div className='w-full'>
                      <button className={`cursor-pointer    w-full h-8 justify-center items-center rounded-full px-5 shrink-0 flex  font-semibold  ${isPaymentType === 'cash' ? 'border-0 text-[#FFFFFF] bg-[#040404]' : 'border border-[#040404] text-[#363636] bg-transparent'} `} type='button' onClick={() => setIsPaymentType('cash')}>
                        Cash
                      </button>
                    </div>

                    <div className='w-full'>
                      <button className={`cursor-pointer  w-full h-8 justify-center items-center rounded-full px-5 shrink-0 flex  font-semibold  ${isPaymentType === 'qr' ? 'border-0 text-[#FFFFFF] bg-[#040404]' : 'border border-[#040404] text-[#363636] bg-transparent'} `} type='button' onClick={() => setIsPaymentType('qr')}>
                        Qr
                      </button>
                    </div>
                  </div>
                  <div className='h-px w-full bg-[#040404] mt-5 rounded-full'></div>
                  <div className='mt-3'>
                    total Item <span className='text-[#363636]'>({carts.length})</span>
                  </div>
                  <div className='mt-2 flex flex-col gap-2 w-full  h-full md:h-[50vh] overflow-auto'>
                    {
                      carts.map((cart) =>
                        <div key={cart.id} className='flex justify-between items-center rounded-md gap-2'>
                          <div className='flex gap-1 '>
                            <div className='w-20 h-20 shrink-0'>
                              <img src={`${import.meta.env.VITE_IMAGE_URL}/${cart?.product_images[0]?.image_path}`} alt="" className='w-full h-full object-cover' />
                            </div>
                            <div className='flex flex-col mt-2'>
                              <div className='line-clamp-1'>
                                {cart.name}
                              </div>
                              <div className='text-[12px]'>
                                (${cart.price}) x {cart.quantity}
                              </div>
                            </div>
                          </div>
                          <button className='cursor-pointer bg-[#040404] w-11 h-11 flex justify-center items-center rounded-full shrink-0' type='button' onClick={() => dispatch(removeItem(cart.id))}>
                            <div className='w-4 h-4' >
                              <DeleteIcon className={"fill-[#FFFFFF] w-full h-full"}>
                              </DeleteIcon>
                            </div>
                          </button>
                        </div>
                      )
                    }
                  </div>
                  <div className='h-px w-full bg-[#040404] mt-5 rounded-full'></div>
                  <div className='mt-3 font-semibold'>
                    Payment Summary
                  </div>
                  <div className='flex justify-between mt-2'>
                    <div>
                      Total
                    </div>
                    <div className='font-semibold'>
                      ${total.toFixed(2)}
                    </div>
                  </div>

                  <div className='mt-3'>
                    <button className='cursor-pointer bg-[#040404]   w-full h-11 justify-center items-center rounded-full px-5 shrink-0 flex text-[#FFFFFF] font-semibold' type='submit' onClick={() => handleOrder()}>
                      Order
                    </button>
                  </div>

                  <div className='flex md:hidden flex-col gap-1.5 cursor-pointer h-8 w-8 absolute top-2 right-2' onClick={() => setIsCartOpen(false)}>
                    <span className='inline-block w-8 h-1 bg-[#040404] rounded-full rotate-45 mt-3'></span>
                    <span className='inline-block w-8 h-1 bg-[#040404] rounded-full -rotate-45 -mt-2.5'></span>
                  </div>

                </div>
              </div>
            </div>

            <div className='w-max h-max fixed bottom-4 right-4 block md:hidden' onClick={() => setIsCartOpen(true)}>
              <button className={`cursor-pointer bg-[#FFFFFF] w-11 h-11 justify-center items-center rounded-full shrink-0 flex border-2 border-[#040404] relative`} type='button'>
                <div className='w-4 h-4'>
                  <CartIcon className={`w-full h-full fill-[#363636]`}>
                  </CartIcon>
                </div>
                <div className='bg-[#040404] w-5 h-5 absolute -top-1 -right-1 rounded-full flex justify-center items-center'>
                  <div className='text-[#FFFFFF]'>
                    {carts.length}
                  </div>
                </div>
              </button>
            </div>



            {
              isOrderSuccess && <div className='pl-2 md:pl-30 pr-2 fixed bg-[rgba(255,255,255,0.50)] backdrop-blur-sm z-101 top-0 left-0 w-full h-full flex justify-center items-center'>
                <div className='bg-[#FFFFFF] w-100 h-auto border border-[#040404] rounded-md py-3 px-3'>
                  <div className='flex flex-col items-center gap-2'>
                    <div className='font-semibold'>
                      Completed
                    </div>
                    <button className={`cursor-pointer bg-[#FFFFFF] w-11 h-11 justify-center items-center rounded-full shrink-0 flex border-2 border-[#040404] relative`} type='button' disabled>
                      <div className='w-4 h-4'>
                        <DoneIcon className={`w-full h-full fill-[#363636]`}>
                        </DoneIcon>
                      </div>
                    </button>
                  </div>

                  {
                    orderRecipt?.createPayway &&
                    <div className='flex justify-center mt-3'>
                      <div className='w-50 h-50'>
                        <img src={orderRecipt?.createPayway?.qrImage} alt="" className='w-full h-full object-contain' />
                      </div>
                    </div>
                  }


                  {
                    orderRecipt?.createPayway ? <div className='font-semibold text-center text-xl mt-4'>
                      ${orderRecipt?.payment?.total.toFixed(2)}
                    </div> :

                      <div className='font-semibold text-center text-xl mt-4'>
                        ${orderRecipt?.total.toFixed(2)}
                      </div>
                  }


                  <div className='mt-5'>
                    <button className='cursor-pointer bg-[#040404]   w-full h-11 justify-center items-center rounded-full px-5 shrink-0 flex text-[#FFFFFF] font-semibold' type='submit' onClick={() => setIsOrderSuccess(false)}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            }

          </>
      }
    </>



  )
}

export default QuickOrder