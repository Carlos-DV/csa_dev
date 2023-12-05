import React from 'react'
import { AdminLayout, MainLayout } from '../../components/layouts'
import { AdminMainPage } from '../../components/admin'
import { AdminProvider } from '../../context/admin'

const AdminPage = () => {
    return (
        <AdminProvider>
            <AdminLayout>
                <AdminMainPage/>
            </AdminLayout>
        </AdminProvider>
    )
}

export default AdminPage