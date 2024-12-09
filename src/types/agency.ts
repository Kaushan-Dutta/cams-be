import { ApplicationStatus } from "@prisma/client"

export interface ApplicationForm{
    id: string,
    email: string,
    name: string,
    phone: string,
    document: string,
    locationId:string
    status:ApplicationStatus
}