import React,{useEffect,useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {UserList} from '../Store/userListSlice'
import SideDrawer from './sideDrawer';
import Modal from './AddUser'
import EditDarkIcon from '../assets/images/edit.svg'
import DeleteDarkIcon from '../assets/images/delete.svg'
import DeleteModal from './DeleteDialog'
import { uploadFile ,uploadFileReset} from '../Store/fileUploadSlice';
import { toast } from 'react-toastify';

const Home = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => {
  return state.userList.user} ); // Assuming 'user' is the slice name

  const data = useSelector((state)=>{
    return state.user.user;
  })
   useEffect(() => {
    // Dispatch your Redux action to fetch user list when the component mounts
    dispatch(UserList());
  }, [dispatch]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userDetails, setUserDetails] = useState("")
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUserDetails("")
  };

  const handleEdit = (user) => {
    setIsModalOpen(true);
    setUserDetails(user)
  }

  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const openDeleteModal = () => {
    setIsModalDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalDeleteOpen(false);
    setUserDetails("")
  };

  const[deleteuserId, setDeleteUserId] = useState('')
  const handleDelete = (user) => {
    openDeleteModal()
    console.log(user.userId)
    setDeleteUserId(user.userId)
  }

  //File Upload
  const [file, setFile] = useState(null);
  console.log(file)
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleUpload = () => {
    if (file) {
      dispatch(uploadFile(file))
      .then(() => {
        // Dispatch the resetUploadedFile action after successful upload
        dispatch(uploadFileReset());
      })
      .catch((error) => {
        // Handle any upload errors
        console.log(error)
      });
    }
  };
  const { loading, error, uploadedFile } = useSelector((state) => state.file);

  //console.log("Upload File Data="+JSON.stringify(uploadedFile))

  useEffect(()=>{
   
    if(uploadedFile?.status == 200){
      setFile(null)
      toast.success('File uploaded successfully')
      //console.log(uploadedFile?.payload?.baseUrl+uploadedFile?.payload?.filesPath[0].filePath)
    }
  },[uploadedFile])

  return (
    <>
    <div className='flex justify-center w-full'>
   <div className='w-[60%]'>
    <div className='flex' >
      <div className='flex justify-between w-full px-2 py-7'>
      <p className="text-xl text-black font-bold">Hello, {data}<br></br></p>
      <p><span className='text-md text-blue-700 underline font-bold'><a href="/login">Logout</a></span></p>
      </div>
    </div>
    <div className='flex' >
    <div className='flex justify-between w-full px-2 py-2' >
    <p className="text-xl text-black font-bold mt-2">User Management<br></br></p>
    <button className="btn glass  text-accent border-[2px] border-solid border-accent-500  hover:bg-accent hover:border-none hover:text-white mb-4" onClick={openModal}>Add User</button>
    </div>
  </div>
      
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light text-black">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">Id</th>
                  <th scope="col" className="px-6 py-4">Name</th>
                  <th scope="col" className="px-6 py-4">Email</th>
                  <th scope="col" className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody>
              {userState != null && userState.length > 0 ?userState.map((user) => (
              <tr className="border-b dark:border-neutral-500 " key={user.userId}>
                  <td className="whitespace-nowrap px-6 py-4 font-medium">{user.userId}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-black-900">{user.fname+" "+user.lname}</td>
                  <td className="whitespace-nowrap px-6 py-4">{user.email}</td>
                  <td className="whitespace-nowrap px-6 py-4 cursor-pointer">
                    <div className='flex'>
                    <img alt="icon" src={EditDarkIcon} width='18px' height='18px' onClick={()=>handleEdit(user)}/>
                    <img alt="icon" src={DeleteDarkIcon} width='20px' height='20px' className='ml-2' onClick={()=>handleDelete(user)}/>
                    </div>
                  </td>
                </tr>
                  
              )):""}
               
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    

    <h2>File Upload</h2>
      <input type="file"  onChange={handleFileChange} />
      <button  onClick={handleUpload} >Upload</button>
     {loading && <p>Uploading...</p>}
      {error && <p>Error: {error.message}</p>}
      {uploadedFile && <p>File uploaded: {uploadedFile.filename}</p>} 
      <div className='flex items-center justify-center '>
      <Modal isOpen={isModalOpen} closeModal={closeModal} userDetails={userDetails}/>
      <DeleteModal isOpen={isModalDeleteOpen} closeModal={closeDeleteModal} deleteUserId={deleteuserId}/>
    </div>
  </div> 
  </div>

  </>
      
      


  );
}

export default Home
