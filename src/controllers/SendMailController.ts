import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { UsersRepository } from "../repositories/UsersRespository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";


class SendMailController {
    async execute(request: Request, response: Response) {
        const { email, surveys_id } = request.body;

        const userRepository = getCustomRepository(UsersRepository);
        const surveysRepository = getCustomRepository(SurveysRepository);
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const userAlreadyExists = await userRepository.findOne({ email });

        if(!userAlreadyExists) {
            return response.status(400).json({ error: "User does not exists!" });
        }

        const surveyAlreadyExists = await surveysRepository.findOne({ id: surveys_id })

        if(!surveyAlreadyExists) {
            return response.status(400).json({ error: "Survey does not exists!" });
        }

        //salvar as informaçoes na tabela surveyUser
        const surveyUser = surveysUsersRepository.create({ 
            users_id: userAlreadyExists.id,
            surveys_id
        });
        await surveysUsersRepository.save(surveyUser);

        //enviar email  para o usuario
        
        return response.json(surveyUser);
    }
}

export{ SendMailController }