import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { resolve } from 'path';
import { SurveysRepository } from "../repositories/SurveysRepository";
import { UsersRepository } from "../repositories/UsersRespository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import SendMailService from "../services/SendMailService";


class SendMailController {
    async execute(request: Request, response: Response) {
        const { email, surveys_id } = request.body;

        const userRepository = getCustomRepository(UsersRepository);
        const surveysRepository = getCustomRepository(SurveysRepository);
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const user = await userRepository.findOne({ email });

        if(!user) {
            return response.status(400).json({ error: "User does not exists!" });
        }

        const survey = await surveysRepository.findOne({ id: surveys_id })

        if(!survey) {
            return response.status(400).json({ error: "Survey does not exists!" });
        }

        const npsPath = resolve(__dirname, '..', "views", "emails", "npsMail.hbs");

        const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
            where: {users_id : user.id, value : null},
            relations: ["user", "survey"]
        });

        const variables ={
            name: user.name,
            title: survey.title,
            description: survey.description,
            id: "",
            link: process.env.URL_MAIL
        }

        if(surveyUserAlreadyExists) {
            variables.id = surveyUserAlreadyExists.id;
            await SendMailService.execute(email, survey.title, variables, npsPath);
            return response.json(surveyUserAlreadyExists);
        }

        //salvar as informaçoes na tabela surveyUser
        const surveyUser = surveysUsersRepository.create({ 
            users_id: user.id,
            surveys_id
        });
        await surveysUsersRepository.save(surveyUser);

        //enviar email  para o usuario
        variables.id = surveyUser.id
        await SendMailService.execute(email, survey.title, variables, npsPath);


        return response.json(surveyUser);
    }
}

export{ SendMailController }