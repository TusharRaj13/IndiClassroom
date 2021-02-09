export class OptionsModel {
  constructor(public option: string,
  public is_answer: boolean){};
}

export class QuestionModel {
  constructor(public question: string,
  public options: OptionsModel[]){};
}

export class QuizModel {
  constructor(public name: string,
  public startdate: Date,
  public duration: number,
  public buffertime: number,
  public questions: QuestionModel[]){};
}

export class MainQuizModel {
  constructor(public quiz_id: string,
    public quiz_name: string,
    public quiz_classid:string,
    public quiz_start_datetime:Date,
    public quiz_duration: number,
    public quiz_buffer_time: number,
    public quiz_questions: MainQuestionModel[]){};
}

export class MainQuestionModel{
  constructor(public question_id:string,
    public question_text:string,
    public question_options:MainOptionsModel[],
    public question_answers:MainOptionsModel[]) {}
}

export class MainOptionsModel{
  constructor(public option_id:string,
    public option_text:string){};
}

export class AnswerModel{
  constructor(public question_id:string,
    public answer_ids:string[]){}
}

