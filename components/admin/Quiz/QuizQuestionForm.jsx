import React, { useState } from 'react';

import style from "./QuizQuestionsForm.module.scss";

const QuizQuestionsForm = (props) => {
    let { qNo, question, chapter, syllabus, firstOption, secondOption, thirdOptipon, fourthOption, correctAnswer, removeQuestion, handleChange } = props;

  return (

              <div id={style.questionBox}>

                <div className={style.metaData}>
                  <h3>Q{qNo}</h3>
                  <input
                    type="text"
                    id="chapter"
                    name="chapter"
                    defaultValue={chapter}
                    placeholder="chapter"
                    className="textBox"
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    id="section"
                    name="section"
                    placeholder="section"
                    className="textBox"
                    onChange={handleChange}
                  />
                </div>

                <textarea
                  id="question"
                  name="question"
                  placeholder="Type Question here"
                  defaultValue={question}
                  className="textBox"
                  onChange={handleChange}
                ></textarea>

                <div id={style.options}>
                  <div className={style.optionHeading}>
                    <p>Correct Answer</p>
                    <p>Options</p>
                  </div>
                  
                <div id={style.option}>
                    <label className="radio">
                      <input 
                        type="radio" 
                        name="type" 
                        id="correctAnswer"
                        value="firstOption"
                        defaultChecked={correctAnswer === firstOption ? true: false}
                        onChange={handleChange}
                      />
                      <span className="inputControl"></span>
                    </label>
                    <input
                      type="text"
                      id="firstOption"
                      name="firstOption"
                      defaultValue={firstOption}
                      placeholder="First Option"
                      className="textBox"
                      onChange={handleChange}
                    />
                    <button className="redRoundBtn">
                     
                      <img src="/imgs/svgs/OptionMinus.svg" alt="-" />
                    </button>
                </div>

                  <div id={style.option}>
                    <label className="radio">
                      <input 
                        type="radio" 
                        name="type" 
                        id="correctAnswer"
                        value="secondOption" 
                        defaultChecked={correctAnswer === secondOption ? true: false}
                        onChange={handleChange}
                      />
                      <span className="inputControl"></span>
                    </label>
                    <input
                      type="text"
                      id="secondOption"
                      name="secondOption"
                      defaultValue={secondOption}
                      placeholder="Second Option"
                      className="textBox"
                      onChange={handleChange}
                    />
                    <button className="redRoundBtn">
                      <img src="/imgs/svgs/OptionMinus.svg" alt="-" />
                    </button>
                  </div>
                  <div id={style.option}>
                    <label className="radio">
                      <input
                        id="correctAnswer"
                        value="thirdOptipon" 
                        type="radio" 
                        name="type"  
                        defaultChecked={correctAnswer === thirdOptipon ? true: false} 
                        onChange={handleChange}
                      />
                      <span className="inputControl"></span>
                    </label>
                    <input
                      type="text"
                      id="thirdOptipon"
                      name="thirdOptipon"
                      defaultValue={thirdOptipon}
                      placeholder="Third Option"
                      className="textBox"
                      onChange={handleChange}
                    />
                    <button className="redRoundBtn">
                      <img src="/imgs/svgs/OptionMinus.svg" alt="-" />
                    </button>
                  </div>
                  <div id={style.option}>
                    <label className="radio">
                      <input 
                        id="correctAnswer"
                        value="fourthOption" 
                        type="radio" 
                        name="type"  
                        defaultChecked={correctAnswer === fourthOption ? true: false} 
                      />
                      <span className="inputControl"></span>
                    </label>
                    <input
                      type="text"
                      id="fourthOption"
                      name="fourthOption"
                      defaultValue={fourthOption}
                      placeholder="Fourth Option"
                      className="textBox"
                      onChange={handleChange}
                    />
                    <button className="redRoundBtn">
                      <img src="/imgs/svgs/OptionMinus.svg" alt="-" />
                    </button>
                  </div>
                <input
                  type="text"
                  id="syllabus"
                  name="syllabus"
                  defaultValue={syllabus}
                  placeholder="Add syllabus"
                  className="textBox"
                />
              </div>
            </div>

  );
};

export default QuizQuestionsForm;