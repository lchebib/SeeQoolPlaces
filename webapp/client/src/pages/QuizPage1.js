import React from 'react';
import { Layout, Row, Col, Card, Button, Divider } from 'antd';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BuzzFeedQuiz } from "react-buzzfeed-quiz";
import "react-buzzfeed-quiz/lib/styles.css";

const { Content } = Layout;

class QuizPage1 extends React.Component {



  render() {
    return (
      <Layout>
        <SideBar />
        <Layout className='layout' style={{ background: 'white', marginLeft: 200 }}>
          <Header />

          <Content style={{ margin: '24px 24px 0', overflow: 'initial' }}>

            <BuzzFeedQuiz
              title={"What Qool place will you see? What Qool things will you do?"}
              description={"select a city size. then, select the Qoolness of each activity."}
              byline={true}
              autoScroll={true}
              onRestart={() => alert("This alert was triggered by the onRestart prop!")}
              onResult={() => alert("The onResult prop triggered this alert!")}
              questions={[
                {
                  question: "I want to visit a ________ city.",
                  answers: [
                    {
                      answer: "teeny tiny",
                      resultID: 3,
                    },
                    {
                      answer: "normal sized",
                      resultID: 2,
                    },
                    {
                      answer: "very big",
                      resultID: 1,
                    }
                  ],
                },
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
                  question: "Shop for vintage clothing or visit record shops.",
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
                  question: "Enjoy nature and go on hikes.",
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
                  question: "Day drink on the beach or by a fancy hotel pool.",
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
                  question: "Make memories with my children.",
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
                  question: "Find activities the whole family will enjoy.",
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
                  question: "Going with the flow and finding the best local spots.",
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
                  question: "Steep in the history and culture of the city by visiting museums and landmarks",
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
            );


          </Content>

          <Footer />
        </Layout>
      </Layout >
    );
  }
}

export default QuizPage1

