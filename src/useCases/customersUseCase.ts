import ICustomer from "../entities/customer";
import IRepository from "../entities/iRepository";
import IUseCases from "../entities/iUseCases";

class customerInteractor implements IUseCases {
  constructor(private readonly Repository:IRepository) {}
async fetchCustomers({ page, limit, search,filterField,filterValue }: { page: number; limit: number; search: string; filterField: string; filterValue: string; }): Promise<{customers:ICustomer[],totalPage:number}>{

    try{
        const response=await this.Repository.fetchCustomers({page,limit,search,filterField,filterValue})
        return {customers:response.customers,totalPage:response.totalPage}

    }
    catch(error){
        throw error
    }
    
}
}
export default customerInteractor