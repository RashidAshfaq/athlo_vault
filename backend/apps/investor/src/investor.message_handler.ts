import { Controller, Logger } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { InvestorService } from "./investor.service";
import { Response } from '@app/common';


@Controller()
export class InvestorMessageHandler {
  protected readonly logger = new Logger(InvestorMessageHandler.name);
  constructor(private readonly investorService: InvestorService) {}

 @MessagePattern('saved_investor_profile')
 async createInvestorProfile(data: any): Promise<Response> {
     const response: Response = {
       success: false,
       message: '',
       data: {},
     };
     try {
       const user = await this.investorService.createNewInvestor(data);
       response.success = true;
       response.data = user;
       response.message = 'Investor created successfully.';
     } catch (ex) {
       response.data.error = ex;
       response.message = ex.message;
     }
 
     return response;
   }

   @MessagePattern('get_total_investment')
   async getTotalInvestment(){
    const response: Response = {
       success: false,
       message: '',
       data: {},
     };
     try {
      //  const user = await this.investorService.createNewInvestor(data);
       response.success = true;
       response.data = '';
       response.message = 'Investor created successfully.';
     } catch (ex) {
       response.data.error = ex;
       response.message = ex.message;
     }
 
     return response;
   }

   @MessagePattern('update_investor_profile')
     async updateInvestorProfile(@Payload() data: any): Promise<Response> {
       const response: Response = {
         success: false,
         message: '',
         data: {},
       };
       try {
         const user = await this.investorService.updateUsingUserId(data);
         response.success = true;
         response.data = user;
         response.message = 'Investor updated successfully.';
       } catch (ex) {
         response.data.error = ex;
         response.message = ex.message;
       }
   
       return response;
     }
}