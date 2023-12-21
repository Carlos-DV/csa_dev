import React, { FC } from 'react'
import { useRouter } from 'next/router';
import { UIProvider } from '../../../context/ui';
import { MainLayout, Ticket } from '../../../components';

const TicketPk = () => {
    let convertId = 0;
    const Router = useRouter();

    if(Router.isReady) {
        const id = Router.query.id;
        if (typeof id === 'string') {
            convertId = Number(id);
        }
    }
    return (
        <UIProvider>
            <MainLayout>
                <Ticket
                    convertId={convertId}
                />
            </MainLayout>
        </UIProvider>
    )
}

export default TicketPk
