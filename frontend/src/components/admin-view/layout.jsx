import { Outlet } from 'react-router-dom'
import AdminHeader from './header'
import AdminSidebar from './sidebar'
import { useState } from 'react'

const AdminLayout = () => {
  const[openSidebar, setOpenSidebar]= useState(false);
  return (
    <div className="flex min-h-screen w-full">
      {/* admin sidebar open={openSidebar} setOpen={setOpenSidebar} */}
      <AdminSidebar open={openSidebar} setOpen={setOpenSidebar}  />
      <div className="flex flex-1 flex-col">
        {/* admin header  setOpen={setOpenSidebar}*/}
        <AdminHeader setOpen={setOpenSidebar}  />
        <main className="flex-1 flex-col flex bg-gray-100 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout