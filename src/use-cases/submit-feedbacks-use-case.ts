import { MailAdapter } from "../adapters/mail-adatpter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest{
  type:string
  comment:string
  screenshot?:string
}

export class SubmitFeedbackUseCase{
  constructor(
   private feedbacksRepository:FeedbacksRepository,
   private mailAdapter: MailAdapter
  ){

  }
  async execute(request:SubmitFeedbackUseCaseRequest){
    const {type, comment,screenshot} = request;
    if(!type){
      throw new Error("type is required")
    }
    if(!comment){
      throw new Error("Comment is required")
    }
    if(screenshot && !screenshot.startsWith('data:image/png;base64')){
      throw new Error("Invalid screenshot format")
    }
    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot
    })
    await this.mailAdapter.sendMail({
      subject:`${type}`,
      body:[
        `<div style="font-family:sans-seriif; font-size:16px; color:#333">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Cometario: ${comment}</p>`,
        screenshot? `<img src="${screenshot}"/>` : '',
        `</div>`
      ].join('\n')
    }) 
  }
}