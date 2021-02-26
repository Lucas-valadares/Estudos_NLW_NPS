import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRespository";
import * as yup from 'yup';
import { AppError } from "../errors/AppError";

 class UserController {
     async create(request: Request, response: Response){
         const{ name, email } = request.body;

         const schema = yup.object().shape({
             name: yup.string().required(),
             email: yup.string().email().required(),
         });

//      Para mais tratamentos de erro podemos usar o try/catch
/*          try {
             await schema.validate(request.body, { abortEarly: false });
         }catch(err){
             throw new AppError(err);
         } */

         if(!(await schema.isValid(request.body))){
             throw new AppError("Validation Failed!")
         }

         const userRepository = getCustomRepository(UsersRepository);

         const userAlreadyExists = await userRepository.findOne({ email }); 

         if (userAlreadyExists){
            throw new AppError("User already exists")
         };

         const user = userRepository.create({ name, email });

         await userRepository.save(user);

         return response.status(201).json(user);
     }

     async show(request: Request, response: Response){
        const usersRepository = getCustomRepository(UsersRepository);

        const all = await usersRepository.find();

        return response.json(all);
    }

/*     async delete(request: Request, response: Response){
        const { email } = request.body;

        const usersRepository = getCustomRepository(UsersRepository);

        const remove = await usersRepository.softRemove({ email });

        return response.json(remove);
    }
 */
 }


 export{ UserController };