import Customer from "../../database/models/customer";
import { ICustomer } from "../../database/models/customer/types";
// import Rider from "../../../database/models/rider";
import { ErrEmailAlreadyExists } from "../../errors";
import { AuthService } from "../../services/app/auth.service";



describe("Customer authentication tests", ()=>{
    beforeEach(async ()=>{
        Customer.create = jest.fn().mockReturnValue({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@doe.com',
            phoneNumber: 1234567890,
            password: "someHashedPassword",
            isVerified: false,
            publicId : "c54a6788-67fd-98uf-c30e-88dd671cdada",
        });
        Customer.findOne = jest.fn().mockReturnValue({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@doe.com',
            phoneNumber: 1234567890,
            password: "someHashedPassword",
            isVerified: true,
            publicId : "c54a6788-67fd-98uf-c30e-88dd671cdada",
        });

        
    })

    afterEach(()=>{
        jest.clearAllMocks();
    });

    describe("Create customer account", ()=>{
        it("should do create a user account", async()=>{

            (Customer.findOne as jest.Mock).mockReturnValue(null);

            const userReq = {
                firstName: "John",
                lastName : "Doe",
                email: "john@doe.com",
                password : "someHashedPassword",
                phoneNumber: "+123456789176",

            }
            const result = await AuthService.createUserAccountService(userReq as ICustomer);
            expect(Customer.findOne).toHaveBeenCalledWith({email : userReq.email});
            expect(result).toHaveProperty("email");


        });

        it("should throw an error if email already exists", async()=>{
            const userReq = {
                firstName: "John",
                lastName : "Doe",
                email: "john@doe.com",
                password : "someHashedPassword",
                phoneNumber: "+123456789176",

            }
            const result =  AuthService.createUserAccountService(userReq as ICustomer);
            expect(Customer.findOne).toHaveBeenCalledWith({email : userReq.email});
            await expect(result).rejects.toThrowError(ErrEmailAlreadyExists);
        })
    })

});