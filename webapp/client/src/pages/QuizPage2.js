import React from 'react';
import { Layout, Row, Col, Card, Button } from 'antd';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BuzzFeedQuiz } from "react-buzzfeed-quiz";
import "react-buzzfeed-quiz/lib/styles.css";
import { animateScroll as scroll } from 'react-scroll'
import { LeftSquareOutlined } from '@ant-design/icons';

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


class QuizPage2 extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      personalityScore: { coolCat: 0, adventurer: 0, entertainer: 0, family: 0, enthusiast: 0, investigator: 0 },
      quizResults: { coolCat: 0, adventurer: 0, entertainer: 0, family: 0, enthusiast: 0, investigator: 0 },
      description: "",
      renderResults: false,
      // destResults: [{ 'city': 'Los Angeles', 'state': 'CA' }, { 'city': 'San Diego', 'state': 'CA' }, { 'city': 'Vancouver', 'state': 'BC' }],
      destResults: [],
      selectedDest: JSON.parse(localStorage.getItem('selectedDest')),
      buttonStatus: false
    }

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
  }


  retakeQuiz() {
    scrollToTop()
    setTimeout(() => {
      window.location.reload()
    }, 1000);
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
    console.log("Pressed Last Quiz Button")
    this.state.quizResults = { coolCat: 0, adventurer: 0, entertainer: 0, family: 0, enthusiast: 0, investigator: 0 };
    this.state.description = ""
    var numPersonalities = 0

    for (const key in this.state.personalityScore) {
      if (this.state.personalityScore[key] >= 5) {
        this.state.quizResults[key] = 1
        this.state.description += descriptions[key]
        numPersonalities += 1;
      }
    }

    if (numPersonalities === 0 || numPersonalities === 6) {
      this.state.quizResults = { coolCat: 0, adventurer: 0, entertainer: 0, family: 0, enthusiast: 1, investigator: 0 }
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
              }}>
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
                <Button onClick={this.clickNextPage} type='primary' shape='round' size='large' style={{ margin: '20px', border: 'none', background: 'black', color: 'white', width: '12vw', height: '4vw', fontSize: '2vw' }}>Next</Button>
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
                <div style={{ fontSize: '5vw', }}>When I visit {this.state.selectedDest[1]}, I want to... </div>
              </Col>
            </Row>

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
