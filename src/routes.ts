import { Router } from 'express';
import { AnswerController } from './controllers/AnswerController';
import { NpsController } from './controllers/NpsController';
import { SendMailController } from './controllers/SendMailController';
import { SurveysController } from './controllers/SurveysController';
import { UserController } from './controllers/UserController';

const router = Router();

const userController = new UserController();
const surveysController = new SurveysController();
const sendMailController = new SendMailController();
const answersController = new AnswerController();
const npsControler = new NpsController();

router.post("/users", userController.create);
router.get("/users", userController.show); 
// router.delete("/users/:email", userController.show);

router.post("/surveys", surveysController.create);
router.get("/surveys", surveysController.show); 

router.post("/sendMail", sendMailController.execute);

router.get("/answers/:value", answersController.execute);

router.get("/nps/:surveys_id", npsControler.execute);

export{ router };