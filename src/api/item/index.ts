import request from "../request";
// @ts-ignore
import {HttpResponse,PageInput} from "@/types";
// @ts-ignore
import {CashItem,CashItemInput} from "@/types/item";


export const page = (page:PageInput) => request.post<any,HttpResponse<CashItem[]>>('/api/item/page',page)
export const create = (input:CashItemInput) => request.post<any,HttpResponse<string>>('/api/item/create',input)
export const update = (input:CashItemInput) => request.post<any,HttpResponse<boolean>>('/api/item/update',input)
export const removeById = (id:string) => request.get<any,HttpResponse<boolean>>('/api/item/delete?id=' + id)