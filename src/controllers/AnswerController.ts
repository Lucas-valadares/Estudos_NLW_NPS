import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";


class AnswerController{
// http://localhost:7777/answers/8?u=039ffecd-ebb4-46f4-a5ec-7c5cb46d189b

    async execute (request: Request, response: Response){
        const{ value } = request.params;
        const{ u } = request.query;
        
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u),
        });

        if(!surveyUser){
            throw new AppError("Survey User does not exists!");
        }

        surveyUser.value = Number(value);

        await surveysUsersRepository.save(surveyUser);

        return response.json(surveyUser);
    }
}

export{ AnswerController }