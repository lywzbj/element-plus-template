import request from "../request";
// @ts-ignore
import {HttpResponse,PageInput,SelectDTO} from "@/types";
// @ts-ignore
import {CashProject,ProjectInput} from "@/types/project";


export const page = (page:PageInput) => request.post<any,HttpResponse<CashProject[]>>('/api/project/page',page)
export const create = (input:ProjectInput) => request.post<any,HttpResponse<string>>('/api/project/create',input)
export const update = (input:ProjectInput) => request.post<any,HttpResponse<boolean>>('/api/project/update',input)
export const removeById = (id:string) => request.get<any,HttpResponse<boolean>>('/api/project/delete?id=' + id)

export const selectList = () => request.get<any,HttpResponse<SelectDTO[]>>('/api/project/selectData')
