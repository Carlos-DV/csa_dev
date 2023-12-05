import { FC, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { AdminDetailsC } from '../../../components/admin';
import { AdminLayout } from '../../../components/layouts';

interface TicketDetailProps {
    id: string | string[] | undefined;
}

const AdminDetail : FC<TicketDetailProps> = () => {
    let convertId = 0;
    const Router = useRouter();
    if(Router.isReady) {
        const id = Router.query.id;
        if (typeof id === 'string') {
            convertId = parseInt(id, 10);
        }
    }
    return (
        <AdminLayout>
        <AdminDetailsC
            convertId={convertId}
        />
        </AdminLayout>
    )
}

export default AdminDetail