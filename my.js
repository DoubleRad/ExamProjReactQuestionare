const e = React.createElement ;

class Questionnaire extends React.Component{
    constructor( props ){
        super( props ) ;
        this.state = { questions: [ ] } ;
        this.mark = this.mark.bind( this ) ;
    }

    componentDidMount( ) {
        fetch( '/questions' )
        .then( resp => resp.json() )
        .then( arr => { this.setState( { questions: arr } ) }/* console.log */)
    }

    mark( e ){
        const button = e.target ; //кнопка
        const parrent = e.target.parentNode ; //Родитель кнопки
        const chilrens = parrent.childNodes ; //Дети родителя

        for(let c of chilrens){
            if(c !== button){
                c.classList.remove('goodMark');
                c.classList.remove('normalMark');
                c.classList.remove('badMark');
            }
        }

        for(let x of button.classList){
            switch( x ) {
                case 'goodAnsw' :  button.classList.add('goodMark'); break;
                case 'normAnsw' :  button.classList.add('normalMark'); break;
                case 'badAnsw'  :  button.classList.add('badMark');  break;
            }
        }
    }

    render( ){
        return <div className='questionnaire_container_obj'>
            <form method="POST" action="upload" enctype="multipart/form-data">    
                <table>
                    <tbody>
                        <tr>
                            <th className='section'>Вопросы</th>
                            <th className='section'>Варианты ответов</th>
                        </tr>

                        { this.state.questions.map( q => <tr>

                                <input type='radio' value={ 'Bad' }    name={q.id + 'qst'}  id={q.id + 'qst' + 'BadId'}    hidden ></input>
                                <input type='radio' value={ 'Normal' } name={q.id + 'qst'}  id={q.id + 'qst' + 'NormalId'} hidden ></input>
                                <input type='radio' value={ 'Good' }   name={q.id + 'qst'}  id={q.id + 'qst' + 'GoodId'}   hidden ></input>

                            
                                <td className='question_text'>{q.txt}</td>
                                <td className='label_container'>    
                                    <label for={q.id + 'qst' + 'BadId'}     className="radio_label label_1 badAnsw" onClick={this.mark}  >   </label>
                                    <label for={q.id + 'qst' + 'NormalId'}  className="radio_label label_2 normAnsw" onClick={this.mark} >   </label>
                                    <label for={q.id + 'qst' + 'GoodId'}    className="radio_label label_3 goodAnsw" onClick={this.mark} >   </label>
                                </td>
                            </tr>
                        ) }
                            

                            <input type='submit' id='submitButton' hidden></input>
                            <label className='sbmtBtn' for='submitButton'></label>
                    </tbody>
                </table>
            </form>
        </div>
    }


}

ReactDOM.render( 

    e ( Questionnaire , {} , null ) ,
    document.getElementById( 'questionnaire_container' ) 

)