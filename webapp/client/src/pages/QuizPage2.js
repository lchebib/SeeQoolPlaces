import React from 'react';
import { Layout, Row, Col, Card, Button, Divider, Radio } from 'antd';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BuzzFeedQuiz } from "react-buzzfeed-quiz";
import "react-buzzfeed-quiz/lib/styles.css";
import * as Scroll from 'react-scroll';
import { animateScroll as scroll } from 'react-scroll'
import {
  LeftSquareOutlined
} from '@ant-design/icons';

const { Content } = Layout;

const answers = [
  {
    text: "very Qool",
    score: 3
  },
  {
    text: "Qool",
    score: 2
  },
  {
    text: "a little Qool",
    score: 1
  },
  {
    text: "unQool",
    score: 0
  },
]

const questions = [
  {
    text: "Check out local breweries or drink the best coffee the city has to offer.",
    personality: "coolCat",
    key: 0
  },
  {
    text: "Enjoy being in nature and going on hikes.",
    personality: "adventurer",
    key: 1
  },
  {
    text: "Sip on a tasty drink beachside, or by a fancy hotel pool.",
    personality: "entertainer",
    key: 2

  },
  {
    text: "Steep in the history and culture of the city by visiting museums and landmarks.",
    personality: "investigator",
    key: 3

  },
  {
    text: "Do fun activities that the whole family can enjoy.",
    personality: "family",
    key: 4

  },
  {
    text: "Go with the flow and find the best local spots.",
    personality: "enthusiast",
    key: 5

  },
  {
    text: "Do outdoor sports, like skiing, surfing, or boating.",
    personality: "adventurer",
    key: 6

  },
  {
    text: "Do a little bit of everything.",
    personality: "enthusiast",
    key: 7

  },
  {
    text: "Shop for vintage clothing or visit cool record stores.",
    personality: "coolCat",
    key: 8

  },
  {
    text: "Get dressed up and go out on the town.",
    personality: "entertainer",
    key: 9

  },
  {
    text: "Make lasting memories with my children.",
    personality: "family",
    key: 10

  },
  {
    text: "Occupy a cozy corner of a quiet cafe or bar with a good book.",
    personality: "investigator",
    key: 11
  },
]

// const descriptions =
// {
//   coolCat: "You're a cool cat. ",
//   adventurer: "You have an adventurous spirit. ",
//   entertainer: "You enjoy the finer things in life. ",
//   family: "You want to spend quality time with loved ones. ",
//   enthusiast: "You go with the flow, and are up for anything. ",
//   investigator: "You're happy when you're learning. "
// }


const descriptions =
{
  coolCat: "Your ideal night involves seeing your favorite band perform live or hitting up some local breweries. Also, you've probably worked as a barista at some point in life.",
  adventurer: "You have an adventurous spirit, and love to get lost and explore whether its a bustling city or the middle of the woods. ",
  entertainer: "You enjoy the finer things in life and your bucket-list includes a 3 Michelin star restaurant.",
  family: "You want to spend quality time with loved ones. ",
  enthusiast: "You tend to go with the flow and you're up for anything that sounds fun.",
  investigator: "You get to know a city by the stories of it's past. You're just happy when you're learning. "
}

function scrollToBottom() {
  scroll.scrollToBottom();
}

function scrollToTop() {
  scroll.scrollToTop();
}

function scrollTo() {
  scroll.scrollTo();
}


class QuizPage2 extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      personalityScore: { coolCat: 0, adventurer: 0, entertainer: 0, family: 0, enthusiast: 0, investigator: 0 },
      quizResults: {
        population: 0, coolCat: false, adventurer: false, entertainer: false, family: false, enthusiast: false, investigator: false
      },
      description: "",
      renderResults: false,
      destResults: [{ 'city': 'Los Angeles', 'state': 'CA' }, { 'city': 'San Diego', 'state': 'CA' }, { 'city': 'Vancouver', 'state': 'BC' }],
      selectedDest: JSON.parse(localStorage.getItem('selectedDest')),
      buttonStatus: false
    }
    // preserve the initial state in a new object
    this.baseState = this.state

    this.onCityQuestion = this.onCityQuestion.bind(this)
    this.onCoolCatQuestion = this.onCoolCatQuestion.bind(this)
    this.onAdventurerQuestion = this.onAdventurerQuestion.bind(this)
    this.onEntertainerQuestion = this.onEntertainerQuestion.bind(this)
    this.onFamilyQuestion = this.onFamilyQuestion.bind(this)
    this.onEnthusiastQuestion = this.onEnthusiastQuestion.bind(this)
    this.onInvestiagtorQuestion = this.onInvestiagtorQuestion.bind(this)
    this.onResult = this.onResult.bind(this)
    this.retakeQuiz = this.retakeQuiz.bind(this)
    this.clickNextPage = this.clickNextPage.bind(this)
    this.pushQuizResults = this.pushQuizResults.bind(this)
    this.onAnswerSelect = this.onAnswerSelect.bind(this)
  }


  retakeQuiz() {
    this.setState(this.baseState)
    this.forceUpdate()

    scrollToTop()
  }

  onAnswerSelect(e) {
    this.state.personalityScore[e.target.name] = e.target.value
    // scrollTo()
  }


  // retakeQuiz() {

  //   scrollToTop()

  //   // this.state = {
  //   //   score: { coolCat: 0, adventurer: 0, entertainer: 0, family: 0, enthusiast: 0, investigator: 0 },
  //   //   personalityResults: {
  //   //     population: 0, coolCat: false, adventurer: false, entertainer: false, family: false, enthusiast: false, investigator: false
  //   //   },
  //   //   description: "",
  //   //   renderResults: false,
  //   //   destResults: [{ 'city': 'Los Angeles', 'state': 'CA' }, { 'city': 'San Diego', 'state': 'CA' }, { 'city': 'Vancouver', 'state': 'BC' }],
  //   //   selectedDest: [],
  //   //   buttonStatus: false
  //   // }

  //   // window.location.reload();

  // }

  onCityQuestion(answerScore) {
    var newResult = this.state.quizResults
    newResult.population = newResult.population + answerScore
    this.setState({ personalityResults: newResult })
  }

  onCoolCatQuestion(answerScore) {
    var newScore = this.state.personalityScore
    newScore.coolCat = newScore.coolCat + answerScore
    this.setState({ personalityScore: newScore })
  }

  onAdventurerQuestion(answerScore) {
    var newScore = this.state.personalityScore
    newScore.adventurer = newScore.adventurer + answerScore
    this.setState({ personalityScore: newScore })
  }

  onEntertainerQuestion(answerScore) {
    var newScore = this.state.personalityScore
    newScore.entertainer = newScore.entertainer + answerScore
    this.setState({ personalityScore: newScore })
  }

  onFamilyQuestion(answerScore) {
    var newScore = this.state.personalityScore
    newScore.family = newScore.family + answerScore
    this.setState({ personalityScore: newScore })
  }

  onEnthusiastQuestion(answerScore) {
    var newScore = this.state.personalityScore
    newScore.enthusiast = newScore.enthusiast + answerScore
    this.setState({ personalityScore: newScore })
  }

  onInvestiagtorQuestion(answerScore) {
    var newScore = this.state.personalityScore
    newScore.investigator = newScore.investigator + answerScore
    this.setState({ personalityScore: newScore })
  }


  onResult() {

    this.state.quizResults = { city: false, coolCat: false, adventurer: false, entertainer: false, family: false, enthusiast: false, investigator: false }
    this.state.description = ""

    var numPersonalities = 0

    for (const key in this.state.personalityScore) {
      if (this.state.personalityScore[key] >= 5) {
        this.state.quizResults[key] = true
        this.state.description += descriptions[key]
        numPersonalities += 1;
      }
    }

    if (numPersonalities == 0 || numPersonalities == 6) {
      this.setState({ quizResults: { city: false, coolCat: false, adventurer: false, entertainer: false, family: false, enthusiast: true, investigator: false } })
      this.setState({ description: descriptions.enthusiast })
    }


    this.state.personalityScore = { coolCat: 0, adventurer: 0, entertainer: 0, family: 0, enthusiast: 0, investigator: 0 }
    this.setState({ renderResults: true })

    scrollToBottom()

  }

  clickNextPage() {
    this.pushQuizResults()
    window.location = '/createtrip'
  }

  pushQuizResults() {

    var selectedPersonalities = { ...this.state.quizResults }
    localStorage.setItem('selectedPersonalities', JSON.stringify(selectedPersonalities));

  }


  render() {

    const renderResults = () => {
      if (this.state.renderResults === true) {
        return (
          <Row type="flex" style={{ justifyContent: 'center' }}>
            <Col>

              <Card ref='res' style={{
                backgroundImage: 'linear-gradient(#ff0080, #ff4000, #ff0080)',
                padding: '10px',
                borderRadius: '3px',
                maxWidth: '52vw',
              }
              }>
                <div style={{ fontSize: '4vw', color: 'white' }}>Your results are in! </div>
                <br />
                <div style={{ fontSize: '3vw', }}> From what we've gathered, we think... </div>
                <br />
                <br />
                <div style={{ fontSize: '2vw', fontFamily: 'sans-serif bold' }}> {this.state.description} </div>
                <br />
                <br />
                <div style={{ fontSize: '3vw', color: 'white' }}>Ready to create your trip to {this.state.selectedDest[1]}? </div>
                <br />

                <Button onClick={this.clickNextPage} type='primary' shape='round' size='large' style={{ margin: '20px', border: 'none', background: 'black', color: 'white', width: '15vw', height: '5vw', fontSize: '2vw' }}>Create Trip</Button>
                <br />
                <Button onClick={this.retakeQuiz} type='primary' shape='round' size='large' style={{ margin: '20px', border: 'none', background: '#5c1b4d' }}>Retake Quiz</Button>

              </Card >
            </Col>
          </Row>

        )
      }
    }


    return (
      <Layout>
        <SideBar />
        <Layout className='layout' style={{ background: 'white', marginLeft: 200 }}>
          <Header />
          <Content style={{ margin: '24px 24px 0', overflow: 'initial', textAlign: 'center', fontFamily: 'Work Sans', alignItems: 'center' }}>

            <Row align='middle' justify='center' style={{ marginBottom: '100px' }}>
              <Col>

                <div style={{ fontSize: '6vw', }}>On this trip, I want to... </div>

              </Col>
            </Row>

            {/* <Row align='middle' justify='center'>
              <Col span={14} >

                {questions.map((question) =>
                  <>
                    <Card
                      style={{ marginBottom: '20px', background: 'black', width: '100%', height: '12vh', padding: '10px', borderRadius: '4px', color: 'white', fontSize: '2vw', textAlign: 'center' }}>
                      {question.text}
                    </Card >



                    <Radio.Group
                      buttonStyle="solid"
                      name={question.personality}
                      onChange={this.onAnswerSelect}
                      style={{ marginBottom: '200px' }}
                    >
                      <Row align='middle' justify='center' gutter={[26, 16]} >

                        {answers.map((answer) =>
                          <Col span={12} >

                            <Radio.Button
                              value={answer.score}
                              style={{ borderRadius: '3px', width: '100%', height: '100%', fontSize: '2vw', fontFamily: 'sans-serif bold' }}>

                              {answer.text}
                            </Radio.Button>
                          </Col>
                        )}

                      </Row>

                    </Radio.Group>


                  </>

                )}

                <Card
                  style={{ marginBottom: '20px', background: 'black', width: '100%', height: '12vh', padding: '10px', borderRadius: '4px', color: 'white', fontSize: '2vw', textAlign: 'center' }}>
                  How ready are you to go on this trip?!
                </Card >
                <Radio.Group
                  buttonStyle="solid"
                  name={-1}
                  onChange={this.onResult}
                  style={{ marginBottom: '200px' }}
                >
                  <Row align='middle' justify='center' gutter={[26, 16]} >
                    <Col span={12} >
                      <Radio.Button
                        value='0'
                        style={{ borderRadius: '3px', width: '100%', height: '100%', fontSize: '2vw', fontFamily: 'sans-serif bold' }}>
                        VERY READY
                      </Radio.Button>
                    </Col>
                    <Col span={12} >
                      <Radio.Button
                        value='1'
                        style={{ borderRadius: '3px', width: '100%', height: '100%', fontSize: '2vw', fontFamily: 'sans-serif bold' }}>
                        A LITTLE READY
                      </Radio.Button>
                    </Col>
                  </Row>
                </Radio.Group>

              </Col>

            </Row> */}


            <BuzzFeedQuiz
              byline={true}
              autoScroll={true}
              style={{ className: 'rbq_question_inner_container' }}
              questions={[
                {
                  question: "Check out local breweries or drink the best coffee the city has to offer.",
                  // backgroundColor: "rgb(208, 87, 130)",
                  answers: [
                    {
                      answer: answers[0].text,
                      // backgroundColor: "rgb(24, 82, 24)",
                      onAnswerSelection: () => this.onCoolCatQuestion(answers[0].score)
                    },
                    {
                      answer: answers[1].text,
                      // backgroundColor: "rgb(50, 118, 11)",
                      onAnswerSelection: () => this.onCoolCatQuestion(answers[1].score)
                    },
                    {
                      answer: answers[2].text,
                      // backgroundColor: "rgb(133, 187, 104)",
                      onAnswerSelection: () => this.onCoolCatQuestion(answers[2].score)
                    },
                    {
                      answer: answers[3].text,
                      // backgroundColor: "rgb(193, 221, 135)",
                      onAnswerSelection: () => this.onCoolCatQuestion(answers[3].text)
                    }
                  ],
                },
                {
                  question: "Enjoy being in nature and going on hikes.",
                  // backgroundColor: "rgb(182, 0, 0)",
                  answers: [
                    {
                      answer: answers[0].text,
                      // backgroundColor: "rgb(24, 82, 24)",
                      onAnswerSelection: () => this.onAdventurerQuestion(answers[0].score)
                    },
                    {
                      answer: answers[1].text,
                      // backgroundColor: "rgb(50, 118, 11)",
                      onAnswerSelection: () => this.onAdventurerQuestion(answers[1].score)
                    },
                    {
                      answer: answers[2].text,
                      // backgroundColor: "rgb(133, 187, 104)",
                      onAnswerSelection: () => this.onAdventurerQuestion(answers[2].score)
                    },
                    {
                      answer: answers[3].text,
                      // backgroundColor: "rgb(193, 221, 135)",
                      onAnswerSelection: () => this.onAdventurerQuestion(answers[3].score)
                    }
                  ],
                },
                {
                  question: "Sip on a tasty drink beachside, or by a fancy hotel pool.",
                  // backgroundColor: "rgb(219, 124, 0)",
                  answers: [
                    {
                      answer: answers[0].text,
                      // backgroundColor: "rgb(24, 82, 24)",
                      onAnswerSelection: () => this.onEntertainerQuestion(answers[0].score)
                    },
                    {
                      answer: answers[1].text,
                      // backgroundColor: "rgb(50, 118, 11)",
                      onAnswerSelection: () => this.onEntertainerQuestion(answers[1].score)
                    },
                    {
                      answer: answers[2].text,
                      // backgroundColor: "rgb(133, 187, 104)",
                      onAnswerSelection: () => this.onEntertainerQuestion(answers[2].score)
                    },
                    {
                      answer: answers[3].text,
                      // backgroundColor: "rgb(193, 221, 135)",
                      onAnswerSelection: () => this.onEntertainerQuestion(answers[3].score)
                    }
                  ],
                },
                {
                  question: "Steep in the history and culture of the city by visiting museums and landmarks.",
                  // backgroundColor: "rgb(238, 184, 34)",
                  answers: [
                    {
                      answer: answers[0].text,
                      // backgroundColor: "rgb(24, 82, 24)",
                      onAnswerSelection: () => this.onInvestiagtorQuestion(answers[0].score)
                    },
                    {
                      answer: answers[1].text,
                      // backgroundColor: "rgb(50, 118, 11)",
                      onAnswerSelection: () => this.onInvestiagtorQuestion(answers[1].score)
                    },
                    {
                      answer: answers[2].text,
                      // backgroundColor: "rgb(133, 187, 104)",
                      onAnswerSelection: () => this.onInvestiagtorQuestion(answers[2].score)
                    },
                    {
                      answer: answers[3].text,
                      // backgroundColor: "rgb(193, 221, 135)",
                      onAnswerSelection: () => this.onInvestiagtorQuestion(answers[3].score)
                    }
                  ],
                },
                {
                  question: "Do fun activities that the whole family can enjoy.",
                  // backgroundColor: "rgb(20, 41, 133)",
                  answers: [
                    {
                      answer: answers[0].text,
                      // backgroundColor: "rgb(24, 82, 24)",
                      onAnswerSelection: () => this.onFamilyQuestion(answers[0].score)
                    },
                    {
                      answer: answers[1].text,
                      // backgroundColor: "rgb(50, 118, 11)",
                      onAnswerSelection: () => this.onFamilyQuestion(answers[1].score)
                    },
                    {
                      answer: answers[2].text,
                      // backgroundColor: "rgb(133, 187, 104)",
                      onAnswerSelection: () => this.onFamilyQuestion(answers[2].score)
                    },
                    {
                      answer: answers[3].text,
                      // backgroundColor: "rgb(193, 221, 135)",
                      onAnswerSelection: () => this.onFamilyQuestion(answers[3].score)
                    }
                  ],
                },
                {
                  question: "Go with the flow and find the best local spots.",
                  // backgroundColor: "rgb(208, 87, 130)",
                  answers: [
                    {
                      answer: answers[0].text,
                      // backgroundColor: "rgb(24, 82, 24)",
                      onAnswerSelection: () => this.onEnthusiastQuestion(answers[0].score)
                    },
                    {
                      answer: answers[1].text,
                      // backgroundColor: "rgb(50, 118, 11)",
                      onAnswerSelection: () => this.onEnthusiastQuestion(answers[1].score)
                    },
                    {
                      answer: answers[2].text,
                      // backgroundColor: "rgb(133, 187, 104)",
                      onAnswerSelection: () => this.onEnthusiastQuestion(answers[2].score)
                    },
                    {
                      answer: answers[3].text,
                      // backgroundColor: "rgb(193, 221, 135)",
                      onAnswerSelection: () => this.onEnthusiastQuestion(answers[3].score)
                    }
                  ],
                },
                {
                  question: "Do outdoor sports, like skiing, surfing, or boating.",
                  // backgroundColor: "rgb(182, 0, 0)",
                  answers: [
                    {
                      answer: answers[0].text,
                      // backgroundColor: "rgb(24, 82, 24)",
                      onAnswerSelection: () => this.onAdventurerQuestion(answers[0].score)
                    },
                    {
                      answer: answers[1].text,
                      // backgroundColor: "rgb(50, 118, 11)",
                      onAnswerSelection: () => this.onAdventurerQuestion(answers[1].score)
                    },
                    {
                      answer: answers[2].text,
                      // backgroundColor: "rgb(133, 187, 104)",

                      onAnswerSelection: () => this.onAdventurerQuestion(answers[2].score)
                    },
                    {
                      answer: answers[3].text,
                      // backgroundColor: "rgb(193, 221, 135)",
                      onAnswerSelection: () => this.onAdventurerQuestion(answers[3].score)
                    }
                  ],
                },
                {
                  question: "Do a little bit of everything.",
                  // backgroundColor: "rgb(219, 124, 0)",
                  answers: [
                    {
                      answer: answers[0].text,
                      // backgroundColor: "rgb(24, 82, 24)",
                      onAnswerSelection: () => this.onEnthusiastQuestion(answers[0].score)
                    },
                    {
                      answer: answers[1].text,
                      // backgroundColor: "rgb(50, 118, 11)",
                      onAnswerSelection: () => this.onEnthusiastQuestion(answers[1].score)
                    },
                    {
                      answer: answers[2].text,
                      // backgroundColor: "rgb(133, 187, 104)",
                      onAnswerSelection: () => this.onEnthusiastQuestion(answers[2].score)
                    },
                    {
                      answer: answers[3].text,
                      // backgroundColor: "rgb(193, 221, 135)",
                      onAnswerSelection: () => this.onEnthusiastQuestion(answers[3].score)
                    }
                  ],
                },
                {
                  question: "Shop for vintage clothing or visit cool record stores.",
                  // backgroundColor: "rgb(238, 184, 34)",
                  answers: [
                    {
                      answer: answers[0].text,
                      // backgroundColor: "rgb(24, 82, 24)",
                      onAnswerSelection: () => this.onCoolCatQuestion(answers[0].score)
                    },
                    {
                      answer: answers[1].text,
                      // backgroundColor: "rgb(50, 118, 11)",
                      onAnswerSelection: () => this.onCoolCatQuestion(answers[1].score)
                    },
                    {
                      answer: answers[2].text,
                      // backgroundColor: "rgb(133, 187, 104)",
                      onAnswerSelection: () => this.onCoolCatQuestion(answers[2].score)
                    },
                    {
                      answer: answers[3].text,
                      // backgroundColor: "rgb(193, 221, 135)",
                      onAnswerSelection: () => this.onCoolCatQuestion(answers[3].text)
                    }
                  ],
                },
                {
                  question: "Get dressed up and go out on the town.",
                  // backgroundColor: "rgb(20, 41, 133)",
                  answers: [
                    {
                      answer: answers[0].text,
                      // backgroundColor: "rgb(24, 82, 24)",
                      onAnswerSelection: () => this.onEntertainerQuestion(answers[0].score)
                    },
                    {
                      answer: answers[1].text,
                      // backgroundColor: "rgb(50, 118, 11)",
                      onAnswerSelection: () => this.onEntertainerQuestion(answers[1].score)
                    },
                    {
                      answer: answers[2].text,
                      // backgroundColor: "rgb(133, 187, 104)",
                      onAnswerSelection: () => this.onEntertainerQuestion(answers[2].score)
                    },
                    {
                      answer: answers[3].text,
                      // backgroundColor: "rgb(193, 221, 135)",
                      onAnswerSelection: () => this.onEntertainerQuestion(answers[3].score)
                    }
                  ],
                },
                {
                  question: "Make lasting memories with my children.",
                  // backgroundColor: "rgb(208, 87, 130)",
                  answers: [
                    {
                      answer: answers[0].text,
                      // backgroundColor: "rgb(24, 82, 24)",
                      onAnswerSelection: () => this.onFamilyQuestion(answers[0].score)
                    },
                    {
                      answer: answers[1].text,
                      // backgroundColor: "rgb(50, 118, 11)",
                      onAnswerSelection: () => this.onFamilyQuestion(answers[1].score)
                    },
                    {
                      answer: answers[2].text,
                      // backgroundColor: "rgb(133, 187, 104)",
                      onAnswerSelection: () => this.onFamilyQuestion(answers[2].score)
                    },
                    {
                      answer: answers[3].text,
                      // backgroundColor: "rgb(193, 221, 135)",
                      onAnswerSelection: () => this.onFamilyQuestion(answers[3].score)
                    }
                  ],
                },
                {
                  question: "Occupy a cozy corner of a quiet cafe or bar with a good book.",
                  // backgroundColor: "rgb(182, 0, 0)",
                  answers: [
                    {
                      answer: answers[0].text,
                      // backgroundColor: "rgb(24, 82, 24)",
                      onAnswerSelection: () => this.onInvestiagtorQuestion(answers[0].score)
                    },
                    {
                      answer: answers[1].text,
                      // backgroundColor: "rgb(50, 118, 11)",
                      onAnswerSelection: () => this.onInvestiagtorQuestion(answers[1].score)
                    },
                    {
                      answer: answers[2].text,
                      // backgroundColor: "rgb(133, 187, 104)",
                      onAnswerSelection: () => this.onInvestiagtorQuestion(answers[2].score)
                    },
                    {
                      answer: answers[3].text,
                      // backgroundColor: "rgb(193, 221, 135)",
                      onAnswerSelection: () => this.onInvestiagtorQuestion(answers[3].score)
                    }
                  ],
                },
                {

                  question: "How ready are you to go on this trip?!",
                  answerArrangement: "tile",
                  class: "rbq_question_inner_container",
                  // backgroundColor: "#90A3E8",
                  // fontColor: "#020D4A",
                  // backgroundColor: "rgb(211, 211, 211)",

                  answers: [
                    {
                      answer: "VERY READY",
                      // backgroundColor: "rgb(50, 118, 11)",
                      // backgroundColor: "#869df2",
                      fontColor: "white",
                      onAnswerSelection: () => this.onResult()
                    },
                    {
                      answer: "A LITTLE READY",
                      // backgroundColor: "rgb(133, 187, 104)",
                      // backgroundColor: "#6680df",
                      fontColor: "white",
                      onAnswerSelection: () => this.onResult()
                    },
                  ],
                },
              ]}

            />
            <Row align='middle' justify='center' gutter={[26, 16]} >
              {/* <Row> */}
              {renderResults()}
              <br />
            </Row>

            <Row align='middle' justify='center' gutter={[26, 16]} style={{ marginTop: '50px' }}>
              <a href="./quiz" style={{ color: "black" }}>
                <LeftSquareOutlined /> Go Back
              </a>
            </Row>

          </Content>
          <Footer />
        </Layout>
      </Layout >
    );
  }
}

export default QuizPage2
