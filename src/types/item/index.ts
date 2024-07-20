


export interface CashItem {

    id: string,
    projectId: string,
    projectName: string,
    projectDate: string,
    cashUserName: string,
    amount: number,
    createdDateTime: string,
    remark: string
    
}

export interface CashItemInput {
    id?:string,
    projectId: string,
    cashUserName: string,
    amount: number,
    remark?: string
}
