import React from 'react';
import { Layout, Row, Col, Card, Button, Radio } from 'antd';
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
    personality: "coolCat"
  },
  {
    text: "Enjoy being in nature and going on hikes.",
    personality: "adventurer"
  },
  {
    text: "Sip on a tasty drink beachside, or by a fancy hotel pool.",
    personality: "entertainer"
  },
  {
    text: "Steep in the history and culture of the city by visiting museums and landmarks.",
    personality: "investigator"
  },
  {
    text: "Do fun activities that the whole family can enjoy.",
    personality: "family"
  },
  {
    text: "Go with the flow and find the best local spots.",
    personality: "enthusiast"
  },
  {
    text: "Do outdoor sports, like skiing, surfing, or boating.",
    personality: "adventurer"
  },
  {
    text: "Do a little bit of everything.",
    personality: "enthusiast"
  },
  {
    text: "Shop for vintage clothing or visit cool record stores.",
    personality: "coolCat"
  },
  {
    text: "Get dressed up and go out on the town.",
    personality: "entertainer"
  },
  {
    text: "Make lasting memories with my children.",
    personality: "family"
  },
  {
    text: "Occupy a cozy corner of a quiet cafe or bar with a good book.",
    personality: "investigator"
  },
]

const descriptions =
{
  coolCat: "You're a cool cat. ",
  adventurer: "You have an adventurous spirit. ",
  entertainer: "You enjoy the finer things in life. ",
  family: "You want to spend quality time with loved ones. ",
  enthusiast: "You go with the flow, and are up for anything. ",
  investigator: "You're happy when you're learning. "
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


class QuizPage1 extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      score: { coolCat: 0, adventurer: 0, entertainer: 0, family: 0, enthusiast: 0, investigator: 0 },
      personalityResults: {
        population: 0, coolCat: false, adventurer: false, entertainer: false, family: false, enthusiast: false, investigator: false
      },
      description: "",
      renderResults: false,
      destResults: [{ 'city': 'Los Angeles', 'state': 'CA' }, { 'city': 'San Diego', 'state': 'CA' }, { 'city': 'Vancouver', 'state': 'BC' }],
      selectedDest: [],
      buttonStatus: false
    }
    // this.onButtonClick = this.onButtonClick.bind(this)
    this.onCityQuestion = this.onCityQuestion.bind(this)
    this.onCoolCatQuestion = this.onCoolCatQuestion.bind(this)
    this.onAdventurerQuestion = this.onAdventurerQuestion.bind(this)
    this.onEntertainerQuestion = this.onEntertainerQuestion.bind(this)
    this.onFamilyQuestion = this.onFamilyQuestion.bind(this)
    this.onEnthusiastQuestion = this.onEnthusiastQuestion.bind(this)
    this.onInvestiagtorQuestion = this.onInvestiagtorQuestion.bind(this)
    this.onResult = this.onResult.bind(this)
    this.setSelectedDest = this.setSelectedDest.bind(this)
    this.retakeQuiz = this.retakeQuiz.bind(this)
    this.clickNextPage = this.clickNextPage.bind(this)
    this.pushQuizResults = this.pushQuizResults.bind(this)
  }

  // onButtonClick(personality, score) {
  //   switch (personality) {
  //     case "coolCat":
  //       this.onCoolCatQuestion(score)
  //       break;
  //     case "adventurer":
  //       this.onAdventurerQuestion(score)
  //       break;
  //     case "entertainer":
  //       this.onEntertainerQuestion(score)
  //       break;
  //     case "family":
  //       this.onFamilyQuestion(score)
  //       break;
  //     case "enthusiast":
  //       this.onEnthusiastQuestion(score)
  //       break;
  //     case "investigator":
  //       this.onInvestiagtorQuestion(score)
  //       break;
  //   }

  //   this.scrollTo()

  // }

  retakeQuiz() {

    scrollToTop()

    // this.state = {
    //   score: { coolCat: 0, adventurer: 0, entertainer: 0, family: 0, enthusiast: 0, investigator: 0 },
    //   personalityResults: {
    //     population: 0, coolCat: false, adventurer: false, entertainer: false, family: false, enthusiast: false, investigator: false
    //   },
    //   description: "",
    //   renderResults: false,
    //   destResults: [{ 'city': 'Los Angeles', 'state': 'CA' }, { 'city': 'San Diego', 'state': 'CA' }, { 'city': 'Vancouver', 'state': 'BC' }],
    //   selectedDest: [],
    //   buttonStatus: false
    // }

    // window.location.reload();

  }


  onCityQuestion(answerScore) {
    var newResult = this.state.personalityResults
    newResult.city = newResult.city + answerScore
    this.setState({ personalityResults: newResult })
  }

  onCoolCatQuestion(answerScore) {
    var newScore = this.state.score
    newScore.coolCat = newScore.coolCat + answerScore
    this.setState({ score: newScore })
  }

  onAdventurerQuestion(answerScore) {
    var newScore = this.state.score
    newScore.adventurer = newScore.adventurer + answerScore
    this.setState({ score: newScore })
  }

  onEntertainerQuestion(answerScore) {
    var newScore = this.state.score
    newScore.entertainer = newScore.entertainer + answerScore
    this.setState({ score: newScore })
  }

  onFamilyQuestion(answerScore) {
    var newScore = this.state.score
    newScore.family = newScore.family + answerScore
    this.setState({ score: newScore })
  }

  onEnthusiastQuestion(answerScore) {
    var newScore = this.state.score
    newScore.enthusiast = newScore.enthusiast + answerScore
    this.setState({ score: newScore })
  }

  onInvestiagtorQuestion(answerScore) {
    var newScore = this.state.score
    newScore.investigator = newScore.investigator + answerScore
    this.setState({ score: newScore })
  }


  onResult() {


    this.state.personalityResults = { city: false, coolCat: false, adventurer: false, entertainer: false, family: false, enthusiast: false, investigator: false }
    this.state.description = ""

    var numPersonalities = 0

    for (const key in this.state.score) {
      if (this.state.score[key] >= 5) {
        this.state.personalityResults[key] = true
        this.state.description += descriptions[key]
        numPersonalities += 1;
      }
    }

    if (numPersonalities == 0 || numPersonalities == 6) {
      this.setState({ personalityResults: { city: false, coolCat: false, adventurer: false, entertainer: false, family: false, enthusiast: true, investigator: false } })
      this.setState({ description: descriptions.enthusiast })
    }


    this.state.score = { coolCat: 0, adventurer: 0, entertainer: 0, family: 0, enthusiast: 0, investigator: 0 }
    this.setState({ renderResults: true })

    scrollToBottom()

  }

  setSelectedDest(e) {

    var index = parseInt(e.target.value)
    var destObj = this.state.destResults[index];
    // console.log(e);
    // console.log(index);
    // console.log(this.state.destResults[index]);

    // this.setState({ selectedDest: [destObj.city, destObj.state] });
    this.state.selectedDest = [destObj.state, destObj.city]
    console.log(this.state.selectedDest);

    this.setState({ buttonStatus: true });


  }

  clickNextPage() {

    this.pushQuizResults()


    window.location = '/createtrip'
  }


  pushQuizResults() {
    // setting local storage for personality results and selected destination
    var coolCat = this.state.personalityResults.coolCat;
    localStorage.setItem('coolCat', coolCat);
    var adventurer = this.state.personalityResults.adventurer;
    localStorage.setItem('adventurer', adventurer);
    var entertainer = this.state.personalityResults.entertainer;
    localStorage.setItem('entertainer', entertainer);
    var family = this.state.personalityResults.family;
    localStorage.setItem('family', family);
    var enthusiast = this.state.personalityResults.enthusiast;
    localStorage.setItem('enthusiast', enthusiast);
    var investigator = this.state.personalityResults.investigator;
    localStorage.setItem('investigator', investigator);
    var selectedDest = this.state.selectedDest;
    localStorage.setItem('selectedDest', selectedDest);
  }



  render() {


    const enableButton = () => {
      if (this.state.buttonStatus === true) {
        const selectedDest = this.state.selectedDest;
        return <Button onClick={this.clickNextPage} type='primary' shape='round' size='large' style={{ margin: '50px', border: 'none', background: 'black', color: 'white', width: '20vw', height: '8vh', fontSize: '2vw' }}>Create Trip</Button>
      }
      return <Button disabled type='primary' shape='round' size='large' style={{ margin: '50px', border: 'none', width: '20vw', height: '8vh', fontSize: '2vw' }}>Create Trip</Button>
    }

    const renderResults = () => {
      if (this.state.renderResults === true) {
        return (
          <Row type="flex" style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Col>

              <Card ref='res' style={{
                backgroundImage: 'linear-gradient(#ff0080, #ff4000, #ff0080)',
                padding: '10px',
                borderRadius: '3px',
                maxWidth: '48vw',
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
                <div style={{ fontSize: '3vw', }}> Your perfect cities are... </div>
                <br />

                <Radio.Group buttonStyle="solid" onChange={(e) => this.setSelectedDest(e)}>
                  <Radio.Button value="0" style={{ padding: '2vh', borderRadius: '3px', marginTop: '20px', width: '80%', height: '8vh', fontSize: '2vw', fontFamily: 'sans-serif bold', border: 'none' }}>
                    {this.state.destResults[0].city}, {this.state.destResults[0].state}
                  </Radio.Button>
                  <Radio.Button value="1" style={{ padding: '2vh', borderRadius: '3px', marginTop: '20px', width: '80%', height: '8vh', fontSize: '2vw', fontFamily: 'sans-serif bold', border: 'none' }}>
                    {this.state.destResults[1].city}, {this.state.destResults[1].state}
                  </Radio.Button>
                  <Radio.Button value="2" style={{ padding: '2vh', borderRadius: '3px', marginTop: '20px', width: '80%', height: '8vh', fontSize: '2vw', fontFamily: 'sans-serif bold', border: 'none' }}>
                    {this.state.destResults[2].city}, {this.state.destResults[2].state}
                  </Radio.Button>
                </Radio.Group>

                {enableButton()}

                <Button onClick={this.retakeQuiz} type='primary' shape='round' size='large' style={{ margin: '50px', border: 'none', background: '#5c1b4d' }}>Retake Quiz</Button>

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

            <div style={{ fontSize: '8vh', }}>On this trip, I want to... </div>

            {/* <Row type="flex" style={{ alignItems: "center", justifyContent: 'center' }}>
              <Col>

                {questions.map((question) =>
                  <div style={{ width: '54vw', marginBottom: '20vw' }}>
                    <Card
                      style={{ margin: '1vw', marginBottom: '10px', background: 'black', width: '52vw', padding: '10px', borderRadius: '4px', color: 'white', fontSize: '3vmin' }}>
                      {question.text}
                    </Card >

                    <div style={{ width: '54vw' }}>
                      {answers.map((answer) =>
                        <Button
                          type='ghost'
                          style={{ margin: '1vw', marginTop: '5px', borderRadius: '4px', marginBottom: '5px', width: '25vw', height: '18vw', fontSize: '2vw', fontFamily: 'sans-serif bold' }}
                          onclick={() => this.onButtonClick(question.personality, answer.score)}>

                          {answer.text}
                        </Button>
                      )}
                    </div>

                  </div>
                )}

              </Col>
            </Row> */}

            <BuzzFeedQuiz
              byline={true}
              autoScroll={true}
              style={{ className: 'rbq_question_inner_container' }}
              questions={[
                {
                  question: "Visit a _______ city.",
                  questionID: 0,
                  // backgroundColor: "rgb(20, 41, 133)",
                  answers: [
                    {
                      answer: "small but quaint",
                      resultID: 0,
                      onAnswerSelection: () => this.onCityQuestion(3),
                      // backgroundColor: "rgb(24, 82, 24)",
                    },
                    {
                      answer: "normal sized",
                      resultID: 0,
                      // backgroundColor: "rgb(50, 118, 11)",
                      onAnswerSelection: () => this.onCityQuestion(2),
                    },
                    {
                      answer: "very big",
                      resultID: 0,
                      // backgroundColor: "rgb(133, 187, 104)",
                      onAnswerSelection: () => this.onCityQuestion(1),
                    },
                    {
                      answer: "...size doesn't matter",
                      resultID: 0,
                      // backgroundColor: "rgb(193, 221, 135)",
                      onAnswerSelection: () => this.onCityQuestion(0),
                    }
                  ],
                },
                {
                  question: "Check out local breweries or drink the best coffee the city has to offer.",
                  // backgroundColor: "rgb(208, 87, 130)",
                  answers: [
                    {
                      answer: "very Qool",
                      resultID: 0,
                      // backgroundColor: "rgb(24, 82, 24)",
                      onAnswerSelection: () => this.onCoolCatQuestion(3)
                    },
                    {
                      answer: "a little Qool",
                      resultID: 0,
                      // backgroundColor: "rgb(50, 118, 11)",
                      onAnswerSelection: () => this.onCoolCatQuestion(2)
                    },
                    {
                      answer: "unQool",
                      resultID: 0,
                      // backgroundColor: "rgb(133, 187, 104)",
                      onAnswerSelection: () => this.onCoolCatQuestion(1)
                    },
                    {
                      answer: "VERY unQool",
                      resultID: 0,
                      // backgroundColor: "rgb(193, 221, 135)",
                      onAnswerSelection: () => this.onCoolCatQuestion(0)
                    }
                  ],
                },
                {
                  question: "Enjoy being in nature and going on hikes.",
                  // backgroundColor: "rgb(182, 0, 0)",
                  answers: [
                    {
                      answer: "very Qool",
                      resultID: 0,
                      // backgroundColor: "rgb(24, 82, 24)",
                      onAnswerSelection: () => this.onAdventurerQuestion(3)
                    },
                    {
                      answer: "a little Qool",
                      resultID: 0,
                      // backgroundColor: "rgb(50, 118, 11)",
                      onAnswerSelection: () => this.onAdventurerQuestion(2)
                    },
                    {
                      answer: "unQool",
                      resultID: 0,
                      // backgroundColor: "rgb(133, 187, 104)",
                      onAnswerSelection: () => this.onAdventurerQuestion(1)
                    },
                    {
                      answer: "VERY unQool",
                      resultID: 0,
                      // backgroundColor: "rgb(193, 221, 135)",
                      onAnswerSelection: () => this.onAdventurerQuestion(0)
                    }
                  ],
                },
                {
                  question: "Sip on a tasty drink beachside, or by a fancy hotel pool.",
                  // backgroundColor: "rgb(219, 124, 0)",
                  answers: [
                    {
                      answer: "very Qool",
                      resultID: 0,
                      // backgroundColor: "rgb(24, 82, 24)",
                      onAnswerSelection: () => this.onEntertainerQuestion(3)
                    },
                    {
                      answer: "a little Qool",
                      resultID: 0,
                      // backgroundColor: "rgb(50, 118, 11)",
                      onAnswerSelection: () => this.onEntertainerQuestion(2)
                    },
                    {
                      answer: "unQool",
                      resultID: 0,
                      // backgroundColor: "rgb(133, 187, 104)",
                      onAnswerSelection: () => this.onEntertainerQuestion(1)
                    },
                    {
                      answer: "VERY unQool",
                      resultID: 0,
                      // backgroundColor: "rgb(193, 221, 135)",
                      onAnswerSelection: () => this.onEntertainerQuestion(0)
                    }
                  ],
                },
                {
                  question: "Steep in the history and culture of the city by visiting museums and landmarks.",
                  // backgroundColor: "rgb(238, 184, 34)",
                  answers: [
                    {
                      answer: "very Qool",
                      resultID: 0,
                      // backgroundColor: "rgb(24, 82, 24)",
                      onAnswerSelection: () => this.onInvestiagtorQuestion(3)
                    },
                    {
                      answer: "a little Qool",
                      resultID: 0,
                      // backgroundColor: "rgb(50, 118, 11)",
                      onAnswerSelection: () => this.onInvestiagtorQuestion(2)
                    },
                    {
                      answer: "unQool",
                      resultID: 0,
                      // backgroundColor: "rgb(133, 187, 104)",
                      onAnswerSelection: () => this.onInvestiagtorQuestion(1)
                    },
                    {
                      answer: "VERY unQool",
                      resultID: 0,
                      // backgroundColor: "rgb(193, 221, 135)",
                      onAnswerSelection: () => this.onInvestiagtorQuestion(0)
                    }
                  ],
                },
                {
                  question: "Do fun activities that the whole family can enjoy.",
                  // backgroundColor: "rgb(20, 41, 133)",
                  answers: [
                    {
                      answer: "very Qool",
                      resultID: 0,
                      // backgroundColor: "rgb(24, 82, 24)",
                      onAnswerSelection: () => this.onFamilyQuestion(3)
                    },
                    {
                      answer: "a little Qool",
                      resultID: 0,
                      // backgroundColor: "rgb(50, 118, 11)",
                      onAnswerSelection: () => this.onFamilyQuestion(2)
                    },
                    {
                      answer: "unQool",
                      resultID: 0,
                      // backgroundColor: "rgb(133, 187, 104)",
                      onAnswerSelection: () => this.onFamilyQuestion(1)
                    },
                    {
                      answer: "VERY unQool",
                      resultID: 0,
                      // backgroundColor: "rgb(193, 221, 135)",
                      onAnswerSelection: () => this.onFamilyQuestion(0)
                    }
                  ],
                },
                {
                  question: "Go with the flow and find the best local spots.",
                  // backgroundColor: "rgb(208, 87, 130)",
                  answers: [
                    {
                      answer: "very Qool",
                      resultID: 0,
                      // backgroundColor: "rgb(24, 82, 24)",
                      onAnswerSelection: () => this.onEnthusiastQuestion(3)
                    },
                    {
                      answer: "a little Qool",
                      resultID: 0,
                      // backgroundColor: "rgb(50, 118, 11)",
                      onAnswerSelection: () => this.onEnthusiastQuestion(2)
                    },
                    {
                      answer: "unQool",
                      resultID: 0,
                      // backgroundColor: "rgb(133, 187, 104)",
                      onAnswerSelection: () => this.onEnthusiastQuestion(1)
                    },
                    {
                      answer: "VERY unQool",
                      resultID: 0,
                      // backgroundColor: "rgb(193, 221, 135)",
                      onAnswerSelection: () => this.onEnthusiastQuestion(0)
                    }
                  ],
                },
                {
                  question: "Do outdoor sports, like skiing, surfing, or boating.",
                  // backgroundColor: "rgb(182, 0, 0)",
                  answers: [
                    {
                      answer: "very Qool",
                      resultID: 0,
                      // backgroundColor: "rgb(24, 82, 24)",
                      onAnswerSelection: () => this.onAdventurerQuestion(3)
                    },
                    {
                      answer: "Qool",
                      resultID: 0,
                      // backgroundColor: "rgb(50, 118, 11)",
                      onAnswerSelection: () => this.onAdventurerQuestion(2)
                    },
                    {
                      answer: "a little Qool",
                      resultID: 0,
                      // backgroundColor: "rgb(133, 187, 104)",

                      onAnswerSelection: () => this.onAdventurerQuestion(1)
                    },
                    {
                      answer: "unQool",
                      resultID: 0,
                      // backgroundColor: "rgb(193, 221, 135)",
                      onAnswerSelection: () => this.onAdventurerQuestion(0)
                    }
                  ],
                },
                {
                  question: "Do a little bit of everything.",
                  // backgroundColor: "rgb(219, 124, 0)",
                  answers: [
                    {
                      answer: "very Qool",
                      resultID: 0,
                      // backgroundColor: "rgb(24, 82, 24)",
                      onAnswerSelection: () => this.onEnthusiastQuestion(3)
                    },
                    {
                      answer: "a little Qool",
                      resultID: 0,
                      // backgroundColor: "rgb(50, 118, 11)",
                      onAnswerSelection: () => this.onEnthusiastQuestion(2)
                    },
                    {
                      answer: "unQool",
                      resultID: 0,
                      // backgroundColor: "rgb(133, 187, 104)",
                      onAnswerSelection: () => this.onEnthusiastQuestion(1)
                    },
                    {
                      answer: "VERY unQool",
                      resultID: 0,
                      // backgroundColor: "rgb(193, 221, 135)",
                      onAnswerSelection: () => this.onEnthusiastQuestion(0)
                    }
                  ],
                },
                {
                  question: "Shop for vintage clothing or visit cool record stores.",
                  // backgroundColor: "rgb(238, 184, 34)",
                  answers: [
                    {
                      answer: "very Qool",
                      resultID: 0,
                      // backgroundColor: "rgb(24, 82, 24)",
                      onAnswerSelection: () => this.onCoolCatQuestion(3)
                    },
                    {
                      answer: "a little Qool",
                      resultID: 0,
                      // backgroundColor: "rgb(50, 118, 11)",
                      onAnswerSelection: () => this.onCoolCatQuestion(2)
                    },
                    {
                      answer: "unQool",
                      resultID: 0,
                      // backgroundColor: "rgb(133, 187, 104)",
                      onAnswerSelection: () => this.onCoolCatQuestion(1)
                    },
                    {
                      answer: "VERY unQool",
                      resultID: 0,
                      // backgroundColor: "rgb(193, 221, 135)",
                      onAnswerSelection: () => this.onCoolCatQuestion(0)
                    }
                  ],
                },
                {
                  question: "Get dressed up and go out on the town.",
                  // backgroundColor: "rgb(20, 41, 133)",
                  answers: [
                    {
                      answer: "very Qool",
                      resultID: 0,
                      // backgroundColor: "rgb(24, 82, 24)",
                      onAnswerSelection: () => this.onEntertainerQuestion(3)
                    },
                    {
                      answer: "a little Qool",
                      resultID: 0,
                      // backgroundColor: "rgb(50, 118, 11)",
                      onAnswerSelection: () => this.onEntertainerQuestion(2)
                    },
                    {
                      answer: "unQool",
                      resultID: 0,
                      // backgroundColor: "rgb(133, 187, 104)",
                      onAnswerSelection: () => this.onEntertainerQuestion(1)
                    },
                    {
                      answer: "VERY unQool",
                      resultID: 0,
                      // backgroundColor: "rgb(193, 221, 135)",
                      onAnswerSelection: () => this.onEntertainerQuestion(0)
                    }
                  ],
                },
                {
                  question: "Make lasting memories with my children.",
                  // backgroundColor: "rgb(208, 87, 130)",
                  answers: [
                    {
                      answer: "very Qool",
                      resultID: 0,
                      // backgroundColor: "rgb(24, 82, 24)",
                      onAnswerSelection: () => this.onFamilyQuestion(3)
                    },
                    {
                      answer: "a little Qool",
                      resultID: 0,
                      // backgroundColor: "rgb(50, 118, 11)",
                      onAnswerSelection: () => this.onFamilyQuestion(2)
                    },
                    {
                      answer: "unQool",
                      resultID: 0,
                      // backgroundColor: "rgb(133, 187, 104)",
                      onAnswerSelection: () => this.onFamilyQuestion(1)
                    },
                    {
                      answer: "VERY unQool",
                      resultID: 0,
                      // backgroundColor: "rgb(193, 221, 135)",
                      onAnswerSelection: () => this.onFamilyQuestion(0)
                    }
                  ],
                },
                {
                  question: "Occupy a cozy corner of a quiet cafe or bar with a good book.",
                  // backgroundColor: "rgb(182, 0, 0)",
                  answers: [
                    {
                      answer: "very Qool",
                      resultID: 0,
                      // backgroundColor: "rgb(24, 82, 24)",
                      onAnswerSelection: () => this.onInvestiagtorQuestion(3)
                    },
                    {
                      answer: "a little Qool",
                      resultID: 0,
                      // backgroundColor: "rgb(50, 118, 11)",
                      onAnswerSelection: () => this.onInvestiagtorQuestion(2)
                    },
                    {
                      answer: "unQool",
                      resultID: 0,
                      // backgroundColor: "rgb(133, 187, 104)",
                      onAnswerSelection: () => this.onInvestiagtorQuestion(1)
                    },
                    {
                      answer: "VERY unQool",
                      resultID: 0,
                      // backgroundColor: "rgb(193, 221, 135)",
                      onAnswerSelection: () => this.onInvestiagtorQuestion(0),
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
            {renderResults()}
            <br />
            <a href="./quiz" style={{ color: "black" }}>
              <LeftSquareOutlined /> Go Back
            </a>

          </Content>
          <Footer />
        </Layout>
      </Layout >
    );
  }
}

export default QuizPage1
