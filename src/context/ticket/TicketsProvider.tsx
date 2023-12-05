import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react";
import { branchOfficeAPI, followUpAPI, ticketAPI, ticketDepartmentAPI, TicketS3API } from "../../server";
import { IBranchOffice, IDeparmentFK, IDepartament, IMessageFollowUp, IMessages, IResponseFollowUp, IResponseS3, IResponseTicket, IResponseTicketFullData } from "../../interfaces";
import { getTicketByFkUser } from "../../server/endpoints";
import { useAuth } from "../../hooks";

type ContextProps = {
    branchOffices: IBranchOffice[],
    departaments:  IDepartament[],
    tickets: IResponseTicketFullData[],
    setTickets: Dispatch<SetStateAction<IResponseTicketFullData[]>>;
    getTicket: (id: number) => void 
    ticket: IResponseTicket
    getInfoS3: (idS3 : string) => void
    infoS3?: string
    setInfoS3: (infoS3: string) => void,
    handleSubmitReply: (data: IResponseFollowUp) => void,
    reply: IResponseFollowUp[],
    loadingData: boolean,
    followUps?: IResponseFollowUp,
    commentaryS3?:IMessageFollowUp[]

}

interface props {
    children: JSX.Element | JSX.Element[]
}

const TicketsContext = createContext<ContextProps>({} as ContextProps);

const TicketsProvider = ({ children } : props) => {

    const { user } = useAuth();

    const [branchOffices, setBranchOffices] = useState<IBranchOffice[]>([])
    const [deparmentsState, setDeparmentsState] = useState<IDepartament[]>([])
    const [ticketState, setTicketState] = useState<IResponseTicketFullData[]>([])
    const [ticket, setTicket] = useState<IResponseTicket>({
        pkTicket: 0,
        name: '',
        fkBranch: 0,
        fkCntcCode: 0,
        fkSLA: 0,
        title: '',
        description: '',
        files: '',
        status: '',
        origin: '',
        priority: '',
        create: '',
        update: '',
        dueDate: '',
        firstResponse: '',
        closeDate: '',
        isFirstResponseExpired: false,
        isSLAExpired: false,
        fkUser: 0,
        fkAgent: 0
    })
    const [reply, setReply] = useState<IResponseFollowUp[]>([])

    const [infoS3, setInfoS3] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false)
    // const [followUps,setFollowUps] = useState();
    const [followUps, setFollowUps] = useState<IResponseFollowUp>();
    const [commentaryS3, setCommentaryS3] = useState<IMessageFollowUp[]>([
       /* {
            idMessage: '',
            ticketFK: 0,
            message: '',
            date: '',
            user: '',
            type: '',
        }*/
    ]);

    useEffect(() => {
        const getDepartments = async () => {
            try {
                const res = await ticketDepartmentAPI.getDepartaments()
                setDeparmentsState(res);
            } catch (error) {
                console.log(`ex: ${error}`)
            }
        };
        getDepartments() 
    }, [user])

    // useEffect(() => {
    //     const getTickets = async () => {
    //         setLoading(true)
    //         try {
    //             const res = await ticketAPI.getTickets();
    //             // setTicketState([...ticketState, res]);
    //             setTicketState(res);
    //         }  catch (error) {
    //             console.log(`ex: ${error}`)
    //         }
    //         setLoading(false)
    //     }
    //     getTickets()
    // }, [])

    // const getTicketsByFkUser = async (id : number) => {
    //     try {
    //         const res = await ticketAPI.getTicketByFkUser(id);
    //         setTicketState(res)
    //     } catch (error) {
    //         console.log(`ex: ${error}`)
    //     }
    // }

    useEffect(()=>{ 
        const getTicketsByFkUser = async () => {
            try {
                if(user && user.id) {
                    const res = await ticketAPI.getTicketByFkUser(user?.id);
                    setTicketState(res)
                }
            } catch (error) {
                console.log(`ex: ${error}`)
            }
        }
        getTicketsByFkUser();
    },[user])

    useEffect(() => {
        const getBranchOffice = async () => {
            try {
                const res = await branchOfficeAPI.getBranchOffices();
                setBranchOffices(res);
            } catch (error) {
                console.log(`ex: ${error}`)
            }
        }
        getBranchOffice();
    }, [user])

    const getTicket = async (id :number)  => {
        setLoading(true)
        try {
            const res = await ticketAPI.getTicketById(id)
            setTicket(res);
        } catch (error) {
            console.log(`ex: ${error}`) 
        }
        setLoading(false)
    }

    const getInfoS3 = async(idS3 : string) => {
        try {
            const res = await TicketS3API.getTicketS3ById(idS3);
            setInfoS3(res);

        } catch (error) {
            console.log(`ex: ${error}`) 
        }
    }

    // const handleSubmitReply = async (dataResponse: IResponseFollowUp) => {
    //     console.log(dataResponse);
    //     try {
    //         const jsonString = JSON.stringify(dataResponse);
    //         const { data } = await followUpAPI.createFollowUp(jsonString);
    //         setReply([...reply, data]);
    //         console.log('registro creadoo...')

    //     } catch (error) {
    //         console.log(`ex: ${error}`) 
    //     }
    // }

    const handleSubmitReply = async (dataResponse: IResponseFollowUp) => {
        try {
            const { data } = await followUpAPI.createFollowUp(dataResponse);
            // setReply([...reply, dataResponse]);
            // const a = JSON.parse(dataResponse.message)
            // console.log(a);
            // console.log(dataResponse);
            // setCommentaryS3([...commentaryS3, a[0]]);
        } catch (error) {
            console.log(`Excepción: ${error}`);
        }
    };

    // const getFollowUpByTicket = async (idTicket: number) => {
    //     try {
    //         setLoading(true)
    //         if (idTicket) {
    //             const followUpResponse = await followUpAPI.getFollowUpByTicket(idTicket);
    //             setFollowUps(followUpResponse);
        
    //             if (followUpResponse.message !== undefined) {
    //               const s3Response = await TicketS3API.getTicketS3ById(followUpResponse.message.split("FollowUp/")[1]);
    //               setCommentaryS3(JSON.parse(s3Response));
    //             } else {
    //               // Manejar el caso en el que no se encuentra ningún seguimiento
    //               console.error(`Error: ${followUpResponse.message}`);
    //             }
    //           }
    //     } catch (error) {
    //         console.error(`Error in fetching data:`, error);
    //     }
    //     setLoading(false)
    // }
    return (
        <TicketsContext.Provider
            value={{
                branchOffices,
                departaments: deparmentsState,
                tickets: ticketState,
                setTickets: setTicketState,
                getTicket,
                ticket,
                getInfoS3,
                infoS3,
                setInfoS3,
                handleSubmitReply,
                reply,
                loadingData: loading,
                // getFollowUpByTicket,
                followUps,
                commentaryS3
            }}
        >
            {children}
        </TicketsContext.Provider>
    )
}

export {
    TicketsProvider,
    TicketsContext,
}
