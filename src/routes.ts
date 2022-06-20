import express from 'express';
import { NodemailerMailAdapater } from './adapters/nodemailter/nodemailer-mail-adapter';

import { PrismaFeedbacksRespository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedbacks-use-case';

export const routes = express.Router();

routes.post('/feedbacks',async (req,res)=>{
  const {type, comment,screenshot} = req.body;
  const prismaFeedbacksRespository = new PrismaFeedbacksRespository();
  const nodemailerMailAdapater = new NodemailerMailAdapater();
  
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbacksRespository,nodemailerMailAdapater)
  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot
  })
  
  
  return res.status(201).send()
})