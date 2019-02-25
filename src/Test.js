import React, { Component } from 'react';

class App extends Component {
  shuffle(array) {
    if(!array) return []
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
  key = ['A','B','C','D']
  mathFormula =  '$$A.\\ \\ \\  x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}$$' ;
  test = [
    {
      text:"Hàm số nào sau đây là hàm số đồng biến trên \\(\\mathbb{R}\\) ?",
      subject:"hamso",
      choices:[
        "\\(\\quad y=x\\sqrt{x^2+1}\\)",
        "\\(\\quad y=(x^2+1)^2-3x\\)",
        "\\(\\quad y=x-{1\\over x}\\)",
        "\\(\\quad y = -\\cot x\\)"
      ],
      answer:"\\(\\quad y=x\\sqrt{x^2+1}\\)"
    },
    {
      text:"Cho hàm số \\(y = ax-x^3\\). Hàm số nghịch biến trên \\(\\mathbb{R}\\) khi:",
      subject:"hamso",
      choices:["\\(a\\le0\\)","\\(a\\ge1\\)","\\(a\\le2\\)","\\(0\\le a\\le2\\)"],
      answer: "\\(a\\le0\\)"
    }
  ]
  answerKey = []
  answered = new Array(this.test.length).fill(-1)
  componentWillMount() {
    this.test.map((q,i)=>this.answerKey[i] = this.shuffle(q.choices).indexOf(q.answer))
    this.answerKey = this.answerKey.map(a=>a>-1?this.key[a]:-1)
     console.log(this.answerKey);
  }
  handleAnswer = (e,i,j)=>{
    this.answered[j] = this.key[i]
    console.log(this.answered);
    
  }
  render() {
    
    return (
      <div className="App">
        {this.test.map((q,j)=>
          <div>
            <p>{q.text}</p>
            <form action="">
              {q.choices.map((a,i)=>
              <div>
                <input type="radio" name={'answer'+ j} onChange={(e)=>this.handleAnswer(e,i,j)}/>
                {this.key[i] + '.' + a}
              </div>
                )}
            </form>
          </div>
          
        )}
      </div>
    );
  }
}

export default App;
