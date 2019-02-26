import React, { Component } from 'react';
import MathJax from 'react-mathjax'

class App extends Component {
  state = {
    questions : [
      {
        text:"\\text{Hàm số nào sau đây là hàm số đồng biến trên } \\mathbb{R} ?",
        subject:"hamso",
        choices:[
          "y=(x^2+1)^2-3x",
          "y=x-{1\\over x}",
          "y = -\\cot x",
          "y=x\\sqrt{x^2+1}",
        ],
        answer:"y=x\\sqrt{x^2+1}"
      },
      {
        text:"\\text{Cho hàm số } y = ax-x^3. \\text{Hàm số nghịch biến trên }\\mathbb{R}\\text{ khi:}",
        subject:"hamso",
        choices:["a\\le0","a\\ge1","a\\le2","0\\le a\\le2"],
        answer: "a\\le0"
      },
      {
        text:"\\text{Cho hàm số } y = x^3-3x^2-9x. \\text{Đường thẳng đi qua các điểm cực đại và cực tiểu của đồ thị hàm số phương trình: }",
        subject:"hamso",
        choices:["8x-y+3=0","x-8y+3=0","8x+y+3=0","-x+8y+3=0"],
        answer: "8x+y+3=0"
      },
      {
        text:"\\text{Cho hàm số } y = ax^3+bx^2+cx+d \\text{ có đồ thị như hình vẽ bên. Mệnh đề nào dưới đây đúng?}",
        subject:"hamso",
        choices:["a<0,b>0,c<0,d>0","a>0,b>0,c>0,d>0","a<0,b>0,c>0,d<0","a>0,b<0,c>0,d>0"],
        answer: "a<0,b>0,c<0,d>0"
      }
    ],
    showTest:false,
    showKey:false
  }

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
  
  answerKey = []
  answered = new Array(this.state.questions.length).fill(-1)
  componentWillMount() {
    
  }
  handleAnswer = (e,i,j)=>{
    this.answered[j] = this.key[i]
    console.log(this.answered);
  }
  newTestClick = ()=>{
    [...document.querySelectorAll('input[type=radio]')].map(e=>e.checked=false)
    this.setState({
      questions:this.shuffle(this.state.questions),
      showTest:true,
      showKey:false
    })
    this.state.questions.map(q=>{
      this.setState({
        choices:this.shuffle(q.choices)
      })
    })
  }
  toggleKey = ()=>{
    
    this.setState({
      showKey:!this.state.showKey
    });
    
    
  }

  componentDidUpdate(prevProps, prevState) {
    [...document.querySelectorAll('input[type=radio]')].map(e=>{
      e.disabled = this.state.showKey
      if(e.nextSibling.classList.contains('key'))
      if(e.checked)
        e.nextSibling.classList.toggle('right')
      else
      e.nextSibling.classList.toggle('wrong')
    })
  }
  
  render() {
    
    return (
      <MathJax.Provider>
      <div className="App">
        <button onClick={this.toggleKey}>Đáp Án</button>
        <button onClick={this.newTestClick}>NEW TEST</button>
        {this.state.showTest && <form>
          {
              this.state.questions.map((q,j)=>
                <div>
                  
                  <p>{j+1}. <MathJax.Node inline formula={"\\text{ }"+q.text}/></p>
                  {q.choices.map((a,i)=>
                    <div>
                      <input type="radio" name={'answer'+ j} onChange={(e)=>this.handleAnswer(e,i,j)}/>
                      <label className={this.state.showKey && a===q.answer && "key"}>{this.key[i] + '.'} <MathJax.Node inline formula={"\\quad "+a}/></label>
                    </div>
                    )}
                </div>
                )       
          }
        </form>}

      </div>
      </MathJax.Provider>
    );
  }
}

export default App;
