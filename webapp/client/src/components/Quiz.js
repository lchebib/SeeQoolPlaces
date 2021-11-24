import React from 'react';
import { Layout, Row, Col, Card, Button, Radio, Space } from 'antd';
import { animateScroll as scroll } from 'react-scroll';
import { LeftSquareOutlined } from '@ant-design/icons';
import { getQuizCities } from '../fetcher';


const options = [
  {
    text: "very Qool",
    value: 3
  },
  {
    text: "Qool",
    value: 2
  },
  {
    text: "a little Qool",
    value: 1
  },
  {
    text: "unQool",
    value: 0
  }
];

const questions = [
  {
    text: "Check out local breweries or drink the best coffee the city has to offer.",
    id: "coolCat",
    options: options,
    answer: 0
  },
  {
    text: "Enjoy being in nature and going on hikes.",
    id: "adventurer",
    options: options,
    answer: 0
  },
  {
    text: "Sip on a tasty drink beachside, or by a fancy hotel pool.",
    id: "entertainer",
    options: options,
    answer: 0
  },
  {
    text: "Steep in the history and culture of the city by visiting museums and landmarks.",
    id: "investigator",
    options: options,
    answer: 0
  },
  {
    text: "Do fun activities that the whole family can enjoy.",
    id: "family",
    options: options,
    answer: 0
  },
  {
    text: "Go with the flow and find the best local spots.",
    id: "enthusiast",
    options: options,
    answer: 0
  },
  {
    text: "Do outdoor sports, like skiing, surfing, or boating.",
    id: "adventurer",
    options: options,
    answer: 0
  },
  {
    text: "Do a little bit of everything.",
    id: "enthusiast",
    options: options,
    answer: 0
  },
  {
    text: "Shop for vintage clothing or visit cool record stores.",
    id: "coolCat",
    options: options,
    answer: 0
  },
  {
    text: "Get dressed up and go out on the town.",
    id: "entertainer",
    options: options,
    answer: 0
  },
  {
    text: "Make lasting memories with my children.",
    id: "family",
    options: options,
    answer: 0
  },
  {
    text: "Occupy a cozy corner of a quiet cafe or bar with a good book.",
    id: "investigator",
    options: options,
    answer: 0
  },
  {
    text: "How ready are you to go on this trip?!",
    id: "result",
    options: [
      {
        text: "VERY READY",
        value: 0
      },
      {
        text: "A LITTLE READY",
        value: 0
      }
    ],
    answer: 0
  },
]


const descriptions = {
  coolCat: "Your ideal night involves seeing your favorite band perform live or hitting up some local breweries. Also, you've probably worked as a barista at some point in life.",
  adventurer: "You have an adventurous spirit, and love to get lost and explore whether its a bustling city or the middle of the woods. ",
  entertainer: "You enjoy the finer things in life and your bucket-list includes a 3 Michelin star restaurant.",
  family: "You want to spend quality time with loved ones. ",
  enthusiast: "You tend to go with the flow and you're up for anything that sounds fun.",
  investigator: "You get to know a city by the stories of it's past. You're just happy when you're learning. "
};

const initialState = {
  personalityScore: {
    coolCat: 0,
    adventurer: 0,
    entertainer: 0,
    family: 0,
    enthusiast: 0,
    investigator: 0
  },
  quizResults: {
    population: 0,
    coolCat: false,
    adventurer: false,
    entertainer: false,
    family: false,
    enthusiast: false,
    investigator: false
  },
  description: "",
  renderResults: false,
  destResults: [],
  selectedDest: [],
  enableButton: false,
};

function scrollToBottom() {
  scroll.scrollToBottom();
}

function scrollToTop() {
  scroll.scrollToTop();
}

function scrollTo() {
  scroll.scrollTo();
}

class Quiz extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      personalityScore: {
        coolCat: 0,
        adventurer: 0,
        entertainer: 0,
        family: 0,
        enthusiast: 0,
        investigator: 0
      },
      quizResults: {
        population: 0,
        coolCat: false,
        adventurer: false,
        entertainer: false,
        family: false,
        enthusiast: false,
        investigator: false
      },
      description: "",
      renderResults: false,
      destResults: [],
      selectedDest: [],
      enableButton: false,
    };
    this.onCityQuestion = this.onCityQuestion.bind(this);
    this.onCoolCatQuestion = this.onCoolCatQuestion.bind(this);
    this.onAdventurerQuestion = this.onAdventurerQuestion.bind(this);
    this.onEntertainerQuestion = this.onEntertainerQuestion.bind(this);
    this.onFamilyQuestion = this.onFamilyQuestion.bind(this);
    this.onEnthusiastQuestion = this.onEnthusiastQuestion.bind(this);
    this.onInvestiagtorQuestion = this.onInvestiagtorQuestion.bind(this);
    this.onAnswer = this.onAnswer.bind(this);
    this.onResult = this.onResult.bind(this);
    this.onSelectDest = this.onSelectDest.bind(this);
    this.retakeQuiz = this.retakeQuiz.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onCityQuestion(answerScore) {
    var newResult = this.state.quizResults;
    newResult.population = newResult.population + answerScore;
    this.setState({ quizResults: newResult });
  }

  onCoolCatQuestion(answerScore) {
    var newScore = this.state.personalityScore;
    newScore.coolCat = newScore.coolCat + answerScore;
    this.setState({ personalityScore: newScore });
  }

  onAdventurerQuestion(answerScore) {
    var newScore = this.state.personalityScore;
    newScore.adventurer = newScore.adventurer + answerScore;
    this.setState({ personalityScore: newScore });
  }

  onEntertainerQuestion(answerScore) {
    var newScore = this.state.personalityScore;
    newScore.entertainer = newScore.entertainer + answerScore;
    this.setState({ personalityScore: newScore });
  }

  onFamilyQuestion(answerScore) {
    var newScore = this.state.personalityScore;
    newScore.family = newScore.family + answerScore;
    this.setState({ personalityScore: newScore });
  }

  onEnthusiastQuestion(answerScore) {
    var newScore = this.state.personalityScore;
    newScore.enthusiast = newScore.enthusiast + answerScore;
    this.setState({ personalityScore: newScore });
  }

  onInvestiagtorQuestion(answerScore) {
    var newScore = this.state.personalityScore;
    newScore.investigator = newScore.investigator + answerScore;
    this.setState({ personalityScore: newScore });
  }

  onAnswer(id, score) {
    console.log("ANSWERED")
    console.log(id)
    switch (id) {
      case "city":
        this.onCityQuestion(score);
        break;
      case "coolCat":
        this.onCoolCatQuestion(score);
        break;
      case "adventurer":
        this.onAdventurerQuestion(score);
        break;
      case "entertainer":
        this.onEntertainerQuestion(score);
        break;
      case "family":
        this.onFamilyQuestion(score);
        break;
      case "enthusiast":
        this.onEnthusiastQuestion(score);
        break;
      case "investigator":
        this.onInvestiagtorQuestion(score);
        break;
      case "result":
        this.onResult();
        break;
    }

    scrollTo();
  }

  onResult() {
    // this.state.quizResults = { city: false, coolCat: false, adventurer: false, entertainer: false, family: false, enthusiast: false, investigator: false }
    // this.state.description = ""

    getQuizCities(this.state.quizResults);

    var numPersonalities = 0;

    for (const key in this.state.personalityScore) {
      if (this.state.personalityScore[key] >= 5) {
        this.state.quizResults[key] = true;
        this.state.description += descriptions[key];
        if (key != "enthusiast") {
          numPersonalities += 1;
        }
      }
    }

    if (numPersonalities === 0 || numPersonalities === 5 || this.state.quizResults.enthusiast === true) {
      this.setState({ quizResults: { coolCat: false, adventurer: false, entertainer: false, family: false, enthusiast: true, investigator: false } });
      this.setState({ description: descriptions.enthusiast });
    }

    this.setState({ personalityScore: { coolCat: 0, adventurer: 0, entertainer: 0, family: 0, enthusiast: 0, investigator: 0 } });
    this.setState({ renderResults: true });

    scrollToBottom();
  }

  onSelectDest(e) {
    var index = parseInt(e.target.value);
    var destObj = this.state.destResults[index];
    this.state.selectedDest = [destObj.state, destObj.city];
    this.setState({ buttonStatus: true });
  }

  retakeQuiz() {
    this.setState({ initialState });
    // window.location.reload()
    scrollToTop();
  }

  onSubmit() {
    localStorage.setItem('selectedDest', JSON.stringify(this.state.selectedDest));
    var selectedPersonalities = { ...this.state.quizResults };
    delete selectedPersonalities.population;
    localStorage.setItem('selectedPersonalities', JSON.stringify(selectedPersonalities));

    window.location = '/createtrip';
  }


  render() {

    const enableButton = () => {
      if (this.state.enableButton === true) {
        return <Button onClick={this.onSubmit} type='primary' shape='round' size='large' style={{ margin: '20px', border: 'none', background: 'black', color: 'white', width: '12vw', height: '4vw', fontSize: '2vw' }}>Next</Button>
      }
      return <Button disabled type='primary' shape='round' size='large' style={{ margin: '20px', border: 'none', width: '12vw', height: '4vw', fontSize: '2vw' }}>Next</Button>
    };

    const renderResults = () => {
      if (this.state.renderResults === true) {
        return (
          <Row type="flex" style={{ alignItems: 'center', justifyContent: 'center' }}>
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
                <div style={{ fontSize: '3vw', }}> Your perfect cities are... </div>
                <br />
                <Radio.Group buttonStyle="solid" onChange={(e) => this.onSelectDest(e)}>
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
                {/* <Space direction='vertical'> */}
                <br />
                {enableButton()}
                <br />
                {/* </Space> */}
                <Button onClick={this.retakeQuiz} type='primary' shape='round' size='large' style={{ margin: '20px', border: 'none', background: '#5c1b4d' }}>Retake Quiz</Button>
              </Card >
            </Col>
          </Row>
        )
      }
    };

    return (
      <>
        <Row type="flex" style={{ alignItems: "center", justifyContent: 'center' }}>
          <Col>
            {questions.map((question) =>
              <div style={{ width: '54vw', marginBottom: '20vw' }}>
                <Card
                  style={{ margin: '1vw', marginBottom: '10px', background: 'black', width: '52vw', padding: '10px', borderRadius: '4px', color: 'white', fontSize: '3vmin' }}>
                  {question.text}
                </Card >
                <div style={{ width: '54vw' }}>
                  {question.options.map((option) =>
                    <Button
                      type='ghost'
                      style={{ margin: '1vw', marginTop: '5px', borderRadius: '4px', marginBottom: '5px', width: '25vw', height: '18vw', fontSize: '2vw', fontFamily: 'sans-serif bold' }}
                      onclick={() => this.onAnswer(question.id, option.value)}>
                      {option.text}
                    </Button>
                  )}
                </div>
              </div>
            )}
          </Col>
        </Row>
        {renderResults()}
      </>
    );
  };
}
export default Quiz;
