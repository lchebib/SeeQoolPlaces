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
							title={"Choose one."}
							description={"Your dream trip starts here."}
							byline={true}
							autoScroll={true}
							onRestart={() => alert("This alert was triggered by the onRestart prop!")}
							onResult={() => alert("The onResult prop triggered this alert!")}
							questions={[
								{
									question: "Here's a default question",
									answers: [
										{
											answer: "Answer one",
											resultID: 0,
										},
										{
											answer: "Answer two",
											resultID: 1,
										},
										{
											answer: "Answer three",
											resultID: 2,
										},
									],
								}
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

