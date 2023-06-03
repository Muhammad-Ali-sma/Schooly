import { ErrorHandler } from '@angular/core';
let ids: any[] = [];
export class MyErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    let currentQuestion = null;
    let easyQuestions: any = localStorage.getItem('easyQuestionListObj');
    let medQuestions: any = localStorage.getItem('medQuestionListObj');
    let hardQuestions: any = localStorage.getItem('hardQuestionListObj');
    let currentQuestionIndex = localStorage.getItem('currentQuestionIndex');
    let userData: any = localStorage.getItem('userData');
console.log(error)

    let question = [...JSON.parse(easyQuestions), ...JSON.parse(medQuestions), ...JSON.parse(hardQuestions)];
    if (currentQuestionIndex) {
      currentQuestion = question[JSON.parse(currentQuestionIndex)];
    }
    var raw = JSON.stringify({
      "to": 'angel.morales.rod@gmail.com',
      "subject": "Question Error",
      "content": `<div style="max-width:600px;padding:100px;background-color:#ccc;margin:0 auto;">
                    <pre>${error.toString()}</pre>
                    <pre>${JSON.stringify(question)}</pre>
                </div>`
    });
    if(!currentQuestion){
      currentQuestion = question[0];
    }
    if (JSON.parse(userData) && !ids.includes(currentQuestion.id)) {
      ids.push(currentQuestion.id);
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + JSON.parse(userData).jwtToken);
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Cookie", "null");

      fetch(location.origin + '/wp-json/mayo/v1/sendMail', {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: "follow",
        credentials: 'omit'
      }).then((res) => res.json())
        .then((data) => console.log("EMAIL RESPONSE", data));
    }
  }
}
