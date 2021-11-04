import React from 'react';
import { Layout, Row, Col, Card, Button, Divider } from 'antd';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BuzzFeedQuiz } from "react-buzzfeed-quiz";
import "react-buzzfeed-quiz/lib/styles.css";

const { Content } = Layout;


const results = [
  {
    title: "Your first result title goes here",
    description: "Your first result description goes here",
    // resultImageSrc: FirstResultImage,
    imageAttribution: "Your photo attribution text goes here",
    resultID: 0,
  },
  {
    title: "Your second result title goes here",
    description: "Your second result description goes here",
    // resultImageSrc: SecondResultImage,
    resultID: 1,
  },
  {
    title: "Your third result title goes here",
    description: "Result images and attributions are optional!",
    resultID: 2,
  },
]

class QuizPage1 extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      // score: { city: 0, hipster: 0, adventurer: 0, yuppie: 0, family: 0, enthusiast: 0, nerd: 0 },
      // personality: { city: false, hipster: false, adventurer: false, yuppie: false, family: false, enthusiast: false, nerd: false },


      cityScore: 0,
      hipsterScore: 0,
      adventurerScore: 0,
      yuppieScore: 0,
      familyScore: 0,
      enthusiastScore: 0,
      nerdScore: 0
    }

    this.onCityQuestion = this.onCityQuestion.bind(this)
    this.onHipsterQuestion = this.onHipsterQuestion.bind(this)
    this.onAdventurerQuestion = this.onAdventurerQuestion.bind(this)
    this.onYuppieQuestion = this.onYuppieQuestion.bind(this)
    this.onFamilyQuestion = this.onFamilyQuestion.bind(this)
    this.onEnthusiastQuestion = this.onEnthusiastQuestion.bind(this)
    this.onNerdQuestion = this.onNerdQuestion.bind(this)
  }

  onCityQuestion(answerScore) {
    var score = this.state.cityScore
    this.setState({ cityScore: score + answerScore })
  }

  onHipsterQuestion(answerScore) {
    var score = this.state.hipsterScore
    this.setState({ hipsterScore: score + answerScore })
  }

  onAdventurerQuestion(answerScore) {
    var score = this.state.adventurerScore
    this.setState({ adventurerScore: score + answerScore })
  }

  onYuppieQuestion(answerScore) {
    var score = this.state.yuppieScore
    this.setState({ yuppieScore: score + answerScore })
  }

  onFamilyQuestion(answerScore) {
    var score = this.state.familyScore
    this.setState({ familyScore: score + answerScore })
  }

  onEnthusiastQuestion(answerScore) {
    var score = this.state.enthusiastScore
    this.setState({ enthusiastScore: score + answerScore })
  }

  onNerdQuestion(answerScore) {
    var score = this.state.nerdScore
    this.setState({ nerdScore: score + answerScore })
  }


  // onResult() {



  //   this.state.myTrips.map((trip) =>
  //     <Menu.Item key={trip.id}>{trip.name}</Menu.Item>
  //   )

  // }





  render() {


    return (
      <Layout>
        <SideBar />
        <Layout className='layout' style={{ background: 'white', marginLeft: 200 }}>
          <Header />

          <Content style={{ margin: '24px 24px 0', overflow: 'initial', textAlign: 'center', fontFamily: 'Work Sans' }}>

            <div style={{ fontSize: '4vh', }}>On this trip, I want to... </div>

            <BuzzFeedQuiz
              // title={"On this trip, I want to..."}
              // description={"For each of the below questions, select an answer that you relate with the most."}
              byline={true}
              autoScroll={true}
              // onRestart={() => alert("This alert was triggered by the onRestart prop!")}
              onResult={() => alert("The onResult prop triggered this alert!")}
              questions={[
                {
                  question: "Visit a _______ city.",
                  questionID: 0,
                  answers: [
                    {
                      answer: "small but quaint",
                      onAnswerSelection: () => this.onCityQuestion(3),
                    },
                    {
                      answer: "normal sized",
                      onAnswerSelection: () => this.onCityQuestion(2),
                    },
                    {
                      answer: "very big",
                      onAnswerSelection: () => this.onCityQuestion(1),
                    }
                  ],
                },
                {
                  question: "Check out local breweries or drink the best coffee the city has to offer.",
                  answers: [
                    {
                      answer: "very Qool",
                      onAnswerSelection: () => this.onHipsterQuestion(3)
                    },
                    {
                      answer: "a little Qool",
                      onAnswerSelection: () => this.onHipsterQuestion(2)
                    },
                    {
                      answer: "unQool",
                      onAnswerSelection: () => this.onHipsterQuestion(1)
                    },
                    {
                      answer: "VERY unQool",
                      onAnswerSelection: () => this.onHipsterQuestion(0)
                    }
                  ],
                },
                {
                  question: "Shop for vintage clothing or visit cool record stores.",
                  answers: [
                    {
                      answer: "very Qool",
                      onAnswerSelection: () => this.onHipsterQuestion(3)
                    },
                    {
                      answer: "a little Qool",
                      onAnswerSelection: () => this.onHipsterQuestion(2)
                    },
                    {
                      answer: "unQool",
                      onAnswerSelection: () => this.onHipsterQuestion(1)
                    },
                    {
                      answer: "VERY unQool",
                      onAnswerSelection: () => this.onHipsterQuestion(0)
                    }
                  ],
                },
                {
                  question: "Enjoy being in nature and going on hikes.",
                  answers: [
                    {
                      answer: "very Qool",
                      onAnswerSelection: () => this.onAdventurerQuestion(3)
                    },
                    {
                      answer: "a little Qool",
                      onAnswerSelection: () => this.onAdventurerQuestion(2)
                    },
                    {
                      answer: "unQool",
                      onAnswerSelection: () => this.onAdventurerQuestion(1)
                    },
                    {
                      answer: "VERY unQool",
                      onAnswerSelection: () => this.onAdventurerQuestion(0)
                    }
                  ],
                },
                {
                  question: "Get dressed up and go out on the town.",
                  answers: [
                    {
                      answer: "very Qool",
                      onAnswerSelection: () => this.onYuppieQuestion(3)
                    },
                    {
                      answer: "a little Qool",
                      onAnswerSelection: () => this.onYuppieQuestion(2)
                    },
                    {
                      answer: "unQool",
                      onAnswerSelection: () => this.onYuppieQuestion(1)
                    },
                    {
                      answer: "VERY unQool",
                      onAnswerSelection: () => this.onYuppieQuestion(0)
                    }
                  ],
                },
                {
                  question: "Sip on a tasty drink beachside, or by a fancy hotel pool.",
                  answers: [
                    {
                      answer: "very Qool",
                      onAnswerSelection: () => this.onYuppieQuestion(3)
                    },
                    {
                      answer: "a little Qool",
                      onAnswerSelection: () => this.onYuppieQuestion(2)
                    },
                    {
                      answer: "unQool",
                      onAnswerSelection: () => this.onYuppieQuestion(1)
                    },
                    {
                      answer: "VERY unQool",
                      onAnswerSelection: () => this.onYuppieQuestion(0)
                    }
                  ],
                },
                {
                  question: "Make lasting memories with my children.",
                  answers: [
                    {
                      answer: "very Qool",
                      onAnswerSelection: () => this.onFamilyQuestion(3)
                    },
                    {
                      answer: "a little Qool",
                      onAnswerSelection: () => this.onFamilyQuestion(2)
                    },
                    {
                      answer: "unQool",
                      onAnswerSelection: () => this.onFamilyQuestion(1)
                    },
                    {
                      answer: "VERY unQool",
                      onAnswerSelection: () => this.onFamilyQuestion(0)
                    }
                  ],
                },
                {
                  question: "Do fun activities that the whole family can enjoy.",
                  answers: [
                    {
                      answer: "very Qool",
                      onAnswerSelection: () => this.onFamilyQuestion(3)
                    },
                    {
                      answer: "a little Qool",
                      onAnswerSelection: () => this.onFamilyQuestion(2)
                    },
                    {
                      answer: "unQool",
                      onAnswerSelection: () => this.onFamilyQuestion(1)
                    },
                    {
                      answer: "VERY unQool",
                      onAnswerSelection: () => this.onFamilyQuestion(0)
                    }
                  ],
                },
                {
                  question: "Go with the flow and find the best local spots.",
                  answers: [
                    {
                      answer: "very Qool",
                      onAnswerSelection: () => this.onEnthusiastQuestion(3)
                    },
                    {
                      answer: "a little Qool",
                      onAnswerSelection: () => this.onEnthusiastQuestion(2)
                    },
                    {
                      answer: "unQool",
                      onAnswerSelection: () => this.onEnthusiastQuestion(1)
                    },
                    {
                      answer: "VERY unQool",
                      onAnswerSelection: () => this.onEnthusiastQuestion(0)
                    }
                  ],
                },
                {
                  question: "Steep in the history and culture of the city by visiting museums and landmarks.",
                  answers: [
                    {
                      answer: "very Qool",
                      onAnswerSelection: () => this.onNerdQuestion(3)
                    },
                    {
                      answer: "a little Qool",
                      onAnswerSelection: () => this.onNerdQuestion(2)
                    },
                    {
                      answer: "unQool",
                      onAnswerSelection: () => this.onNerdQuestion(1)
                    },
                    {
                      answer: "VERY unQool",
                      onAnswerSelection: () => this.onNerdQuestion(0)
                    }
                  ],
                },
                {
                  question: "Occupy a cozy corner of a quiet cafe or bar with a good book.",
                  answers: [
                    {
                      answer: "very Qool",
                      onAnswerSelection: () => this.onNerdQuestion(3)
                    },
                    {
                      answer: "a little Qool",
                      onAnswerSelection: () => this.onNerdQuestion(2)
                    },
                    {
                      answer: "unQool",
                      onAnswerSelection: () => this.onNerdQuestion(1)
                    },
                    {
                      answer: "VERY unQool",
                      onAnswerSelection: () => this.onNerdQuestion(0),
                    }
                  ],
                },
              ]}
              results={[
                {
                  title: "Your first result title goes here",
                  description: "Your first result description goes here",
                  // resultImageSrc: FirstResultImage,
                  imageAttribution: "Your photo attribution text goes here",
                  resultID: 0,
                },
                {
                  title: "Your second result title goes here",
                  description: "Your second result description goes here",
                  // resultImageSrc: SecondResultImage,
                  resultID: 1,
                },
                {
                  title: "Your third result title goes here",
                  description: "Result images and attributions are optional!",
                  resultID: 2,
                },
              ]}
            />



          </Content>

          <Footer />
        </Layout>
      </Layout >
    );
  }
}

export default QuizPage1

