import React from 'react';
import { Layout, Row, Col, Card, Button, Divider } from 'antd';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BuzzFeedQuiz } from "react-buzzfeed-quiz";
import "react-buzzfeed-quiz/lib/styles.css";

const { Content } = Layout;

class QuizPage2 extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      score: { coolCat: 0, adventurer: 0, entertainer: 0, family: 0, enthusiast: 0, investigator: 0 },
      result: { city: false, coolCat: false, adventurer: false, entertainer: false, family: false, enthusiast: false, investigator: false },
      description: "",
      renderResult: false,
      cities: [{ 'city': 'Los Angeles', 'state': 'CA' }, { 'city': 'San Diego', 'state': 'CA' }, { 'city': 'Vancouver', 'state': 'BC' }],
      selectedCity: ""
    }

    this.onCityQuestion = this.onCityQuestion.bind(this)
    this.onCoolCatQuestion = this.onCoolCatQuestion.bind(this)
    this.onAdventurerQuestion = this.onAdventurerQuestion.bind(this)
    this.onEntertainerQuestion = this.onEntertainerQuestion.bind(this)
    this.onFamilyQuestion = this.onFamilyQuestion.bind(this)
    this.onEnthusiastQuestion = this.onEnthusiastQuestion.bind(this)
    this.onInvestiagtorQuestion = this.onInvestiagtorQuestion.bind(this)
    this.onResult = this.onResult.bind(this)
    this.scrollToBottom = this.scrollToBottom.bind(this)
  }

  componentDidMount() {
    const selectedCity = localStorage.getItem('selectedCity');
    this.setState({ selectedCity });
  }



  render() {
    return (
      <Layout>
        <SideBar />
        <Layout className='layout' style={{ background: 'white', marginLeft: 200 }}>
          <Header />

          <Content style={{ margin: '24px 24px 0', overflow: 'initial', textAlign: 'center', fontFamily: 'Work Sans' }}>

            <div style={{ fontSize: '4vh' }}>On this trip, I want to... </div>
            {/* <br /> */}
            {/* <div style={{ fontSize: '2vh' }}>For each of the below questions, select an answer <br /> that best describes how you feel. </div> */}

            <BuzzFeedQuiz
              // title={"On this trip, I want to..."}
              // description={"For each of the below questions, select an answer that you relate with the most."}
              byline={true}
              autoScroll={true}
              // onRestart={() => alert("This alert was triggered by the onRestart prop!")}
              // onResult={() => alert("The onResult prop triggered this alert!")}
              questions={[
                {
                  question: "Check out local breweries or drink the best coffee the city has to offer.",
                  answers: [
                    {
                      answer: "very Qool",
                      resultID: 3,
                    },
                    {
                      answer: "a little Qool",
                      resultID: 2,
                    },
                    {
                      answer: "unQool",
                      resultID: 1,
                    },
                    {
                      answer: "VERY unQool",
                      resultID: 0,
                    }
                  ],
                },
                {
                  question: "Shop for vintage clothing or visit cool record stores.",
                  answers: [
                    {
                      answer: "very Qool",
                      resultID: 3,
                    },
                    {
                      answer: "a little Qool",
                      resultID: 2,
                    },
                    {
                      answer: "unQool",
                      resultID: 1,
                    },
                    {
                      answer: "VERY unQool",
                      resultID: 0,
                    }
                  ],
                },
                {
                  question: "Enjoy being in nature and going on hikes.",
                  answers: [
                    {
                      answer: "very Qool",
                      resultID: 3,
                    },
                    {
                      answer: "a little Qool",
                      resultID: 2,
                    },
                    {
                      answer: "unQool",
                      resultID: 1,
                    },
                    {
                      answer: "VERY unQool",
                      resultID: 0,
                    }
                  ],
                },
                {
                  question: "Get dressed up and go out on the town.",
                  answers: [
                    {
                      answer: "very Qool",
                      resultID: 3,
                    },
                    {
                      answer: "a little Qool",
                      resultID: 2,
                    },
                    {
                      answer: "unQool",
                      resultID: 1,
                    },
                    {
                      answer: "VERY unQool",
                      resultID: 0,
                    }
                  ],
                },
                {
                  question: "Sip on a tasty drink beachside, or by a fancy hotel pool.",
                  answers: [
                    {
                      answer: "very Qool",
                      resultID: 3,
                    },
                    {
                      answer: "a little Qool",
                      resultID: 2,
                    },
                    {
                      answer: "unQool",
                      resultID: 1,
                    },
                    {
                      answer: "VERY unQool",
                      resultID: 0,
                    }
                  ],
                },
                {
                  question: "Make lasting memories with my children.",
                  answers: [
                    {
                      answer: "very Qool",
                      resultID: 3,
                    },
                    {
                      answer: "a little Qool",
                      resultID: 2,
                    },
                    {
                      answer: "unQool",
                      resultID: 1,
                    },
                    {
                      answer: "VERY unQool",
                      resultID: 0,
                    }
                  ],
                },
                {
                  question: "Do fun activities that the whole family can enjoy.",
                  answers: [
                    {
                      answer: "very Qool",
                      resultID: 3,
                    },
                    {
                      answer: "a little Qool",
                      resultID: 2,
                    },
                    {
                      answer: "unQool",
                      resultID: 1,
                    },
                    {
                      answer: "VERY unQool",
                      resultID: 0,
                    }
                  ],
                },
                {
                  question: "Go with the flow and find the best local spots.",
                  answers: [
                    {
                      answer: "very Qool",
                      resultID: 3,
                    },
                    {
                      answer: "a little Qool",
                      resultID: 2,
                    },
                    {
                      answer: "unQool",
                      resultID: 1,
                    },
                    {
                      answer: "VERY unQool",
                      resultID: 0,
                    }
                  ],
                },
                {
                  question: "Steep in the history and culture of the city by visiting museums and landmarks.",
                  answers: [
                    {
                      answer: "very Qool",
                      resultID: 3,
                    },
                    {
                      answer: "a little Qool",
                      resultID: 2,
                    },
                    {
                      answer: "unQool",
                      resultID: 1,
                    },
                    {
                      answer: "VERY unQool",
                      resultID: 0,
                    }
                  ],
                },
                {
                  question: "Occupy a cozy corner of a quiet cafe or bar with a good book.",
                  answers: [
                    {
                      answer: "very Qool",
                      resultID: 3,
                    },
                    {
                      answer: "a little Qool",
                      resultID: 2,
                    },
                    {
                      answer: "unQool",
                      resultID: 1,
                    },
                    {
                      answer: "VERY unQool",
                      resultID: 0,
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

export default QuizPage2

