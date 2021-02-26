import { Request, Response } from "express";
import { getCustomRepository, Not, IsNull } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";


/*  detratores => 0 - 6
    passivos   => 7 - 8
    promotores => 9 - 10

    calculo de NPS
    (N_promotores - N_detratores) / (numero de respondentes ) x 100   */

class NpsController{

    async execute(request: Request, response: Response){
        const { surveys_id } = request.params;
        
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveysUsers =await surveysUsersRepository.find({ 
            surveys_id,
            value: Not(IsNull()),
        });
        
        const detractor = surveysUsers.filter(
            (survey) => survey.value >= 0 && survey.value <= 6
        ).length;

        const promoters = surveysUsers.filter(
            (survey) => survey.value >= 9 && survey.value <= 10 
        ).length;

        const passive = surveysUsers.filter(
            (survey) => survey.value >= 7 && survey.value <= 8
        ).length;
        
        const allAnswers = surveysUsers.length;

        const calculate = Number (
            (((promoters - detractor) / allAnswers) * 100).toFixed(2)
        );

        return response.json({
            detractor,
            promoters,
            passive,
            allAnswers,
            nps: calculate
        });
}
}
export { NpsController }