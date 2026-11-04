import React, { useState } from 'react'
import preProfile from '../../assets/images/preProfile.png'
import { useDispatch, useSelector } from 'react-redux'
import { currentUser, setSetting, signout } from '../../services/system/setting';
import LogoutIcon from '../../components/ui/LogoutIcon';
import { clearUser, setUser } from '../../store/userSlice';
import { clearToken } from '../../store/tokenSlice';

function Setting() {
  const user = useSelector((state) => state.user)
  const token = useSelector((state) => state.token)
  const [isEdit, setIsEdit] = useState(false);
  const [isloading, setIsLoading] = useState(false)
  const [imageInput, setImageInput] = useState(null);
  const [previewImage, setPreviewImage] = useState(user?.settting?.image !== '' ? `${import.meta.env.VITE_IMAGE_URL}/${user?.setting?.image}` : preProfile)
  const dispatch = useDispatch()

  const [form, setForm] = useState({
    phone_number: user?.setting?.phone_number,
    address: user?.setting?.address,
    date_birth: user?.setting?.date_birth,
  })

  const handleInput = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form, [name]: value
    })
  }

  const handleImageInput = (e) => {
    const file = e.target.files[0] ?? null;
    setImageInput(file)
    setPreviewImage(file ? URL.createObjectURL(file) : '')
  }

  const onUpdate = async () => {
    try {
      setIsLoading(true)

      const formData = new FormData();
      formData.append("phone_number", form.phone_number)
      formData.append("address", form.address)
      formData.append("date_birth", form.date_birth)

      if (imageInput) {
        formData.append("image", imageInput)
      }

      const response = await setSetting(formData)

      if (response.status === 200 || response.status === 201) {
        const response = await currentUser();
        const data = response.data.data;

        if (response.status === 200) {
          dispatch(setUser({
            name: data.name,
            email: data.email,
            role: data.role,
            setting: data.setting
          }))
        }
      }
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
        setIsEdit(false)
      }
    }

  const onSignout = async () => {
      try {
        setIsLoading(true)
        const response = await signout(token.token)
        if (response.status === 204) {
          dispatch(clearUser())
          dispatch(clearToken());
          navigate('/')
        }
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }

    return (
      <>
        <div className='font-semibold'>
          Setting
        </div>

        <div className="mt-5 flex justify-center items-center flex-col">
          <div className='w-40 h-40 rounded-full relative flex justify-center items-center'>
            <input type="file" onChange={handleImageInput} className={`absolute w-full h-full rounded-full opacity-0 ${isEdit ? 'block' : 'hidden'} z-10`} />
            <div className={`w-max h-max absolute  ${isEdit ? 'block' : 'hidden'}`}>Select Image*</div>
            <img src={isEdit ? previewImage : user?.settting?.image !== '' ? `${import.meta.env.VITE_IMAGE_URL}/${user?.setting?.image}` : preProfile} alt="" className='w-full h-full object-cover object-top rounded-full' />
          </div>
          <div className='mt-2'>
            {user.name}
          </div>

          <div className='w-full mt-5'>

            <div className='flex items-center justify-between w-full'>
              <div>
                Personal Infomation
              </div>
              {
                isEdit ?
                  <div className='flex gap-3'>
                    <button className='cursor-pointer border border-[#040404] bg-transparent w-max h-11 justify-center items-center rounded-full px-5 shrink-0 flex text-[#363636] font-semibold' type='button' onClick={() => setIsEdit(false)}>
                      Cancel
                    </button>
                    <button className='cursor-pointer bg-[#040404] w-max h-11 justify-center items-center rounded-full px-5 shrink-0 flex text-[#FFFFFF] font-semibold' type='button' onClick={() => onUpdate()}>
                      {
                        isloading ?
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
                  <div className='flex gap-4'>
                    <button className='cursor-pointer bg-[#040404] w-max h-11 justify-center items-center rounded-full px-5 shrink-0 flex text-[#FFFFFF] font-semibold' type='button' onClick={() => setIsEdit(true)}>
                      Edit
                    </button>
                  </div>
              }
            </div>


            <div className='flex gap-1 mt-5 flex-col'>
              <label htmlFor="">Name* </label>
              <input readOnly type="text" className='placeholder:text-[#363636] h-11 border-2  outline-0 pl-5 rounded-full border-[#040404]' value={user.name} />
            </div>

            <div className='flex gap-1 mt-2 flex-col'>
              <label htmlFor="">Email* </label>
              <input readOnly type="text" className='placeholder:text-[#363636] h-11 border-2  outline-0 pl-5 rounded-full border-[#040404]' value={user.email} />
            </div>

            <div className='flex gap-1 mt-2 flex-col'>
              <label htmlFor="">Role* </label>
              <input readOnly type="text" className='placeholder:text-[#363636] h-11 border-2  outline-0 pl-5 rounded-full border-[#040404]' value={user.role} />
            </div>


            <div className='flex gap-1 mt-2 flex-col'>
              <label htmlFor="">Date birth* </label>
              <input readOnly={isEdit === false} type="date" className='placeholder:text-[#363636] h-11 border-2 pr-3 outline-0 pl-5 rounded-full border-[#040404]' onChange={handleInput} name="date_birth" value={isEdit ? form.date_birth : new Date(user?.setting?.date_birth).toISOString().split('T')[0]} />
            </div>

            <div className='flex gap-1 mt-2 flex-col'>
              <label htmlFor="">Phone*</label>
              <input readOnly={isEdit === false} type="text" onChange={handleInput} name="phone_number" className='placeholder:text-[#363636] h-11 border-2  outline-0 pl-5 rounded-full border-[#040404]' value={isEdit ? form.phone_number : user?.setting?.phone_number} />
            </div>

            <div className='flex gap-1 mt-2 flex-col'>
              <label htmlFor="">Address* </label>
              <textarea readOnly={isEdit === false} onChange={handleInput} name="address" value={isEdit ? form.address : user?.setting?.address} type="text" className='placeholder:text-[#363636] h-21 border-2  outline-0 pl-5 rounded-xl border-[#040404]' />
            </div>

            <div className='mt-5 flex justify-end'>
              <button className='cursor-pointer bg-[#040404] w-max h-11 justify-center gap-4 items-center rounded-full px-5 shrink-0 flex text-[#FFFFFF] font-semibold' type='button' onClick={() => onSignout()}>
                {
                  isloading ?
                    <div className='h-7 w-7 rounded-full relative'>
                      <div className='h-full w-full border-3 border-[rgba(255,255,255,0.50)] rounded-full absolute top-0 left-0 z-1'></div>
                      <div className='h-full w-full border-l-3 border-t-3  border-[rgba(255,255,255,100)] rounded-full absolute top-0 left-0 animate-spin z-2 '></div>
                    </div>
                    :
                    <>
                      <div>
                        Logout
                      </div>
                      <div className='w-4 h-4'>
                        <LogoutIcon className={"fill-[#FFFFFF] w-full h-full"}>
                        </LogoutIcon>
                      </div>
                    </>
                }
              </button>
            </div>

          </div>
        </div>
      </>
    )
  }

  export default Setting