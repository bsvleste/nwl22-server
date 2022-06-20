import { SubmitFeedbackUseCase } from "./submit-feedbacks-use-case"

const createFeedbackSpy = jest.fn();
const sendMailSpy =  jest.fn();

const submitFeddback = new SubmitFeedbackUseCase(
  {create:createFeedbackSpy},
  {sendMail:sendMailSpy}
)
describe('Submit feedback',()=>{
  it('should be able to submit a feedback',async ()=>{
       await expect(submitFeddback.execute({
      type:"Bug",
      comment:"example comment",
      screenshot:'data:image/png;base64,test.jpg'
    })).resolves.not.toThrow();
    expect(createFeedbackSpy).toHaveBeenCalled();  
    expect(sendMailSpy).toHaveBeenCalled();  
  })
  it('should not be able to submit a feedback without a type',async ()=>{
       await expect(submitFeddback.execute({
      type:"",
      comment:"example comment",
      screenshot:'data:image/png;base64,test.jpg'
    })).rejects.toThrow()  
  })
  it('should not be able to submit a feedback without a comment',async ()=>{
       await expect(submitFeddback.execute({
      type:"Bug",
      comment:"",
      screenshot:'data:image/png;base64,test.jpg'
    })).rejects.toThrow()  
  })
  it('should not be able to submit a feedback whit a screenshot invalid',async ()=>{
       await expect(submitFeddback.execute({
      type:"Bug",
      comment:"",
      screenshot:'test'
    })).rejects.toThrow()  
  })
})