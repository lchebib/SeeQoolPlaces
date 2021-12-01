import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { signUp, login } from '../fetcher';


const Login = () => {
	const [form] = Form.useForm();
	const [, forceUpdate] = useState({}); // To disable submit button at the beginning.
	const [submitType, setSubmitType] = useState(0);

	useEffect(() => {
		forceUpdate({});
	}, []);

	const onFinish = (values) => {
		console.log('Finish:', values);
		if (submitType === 0) {
			onLogin(values.username, values.password)

		} else {
			signUp(values.username, values.password).then(res => {
				console.log(res)
				console.log(res.results)
				if (res.results === true) {
					onLogin(values.username, values.password)
				}
			})
			console.log("Sign up")

		}

	};

	const onLogin = (username, password) => {
		login(username, password).then(res => {
			console.log(res)
			if (res.results === true) {
				authSuccess(username)
			}
		})
		console.log("Log in")
	}


	const authSuccess = (username) => {
		localStorage.setItem("User", username)
		window.location = '/home';

	};

	return (
		<Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
			<Form.Item
				name="username"
				rules={[
					{
						required: true,
						message: 'Please input your username!',
					},
				]}
			>
				<Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
			</Form.Item>
			<Form.Item
				name="password"
				rules={[
					{
						required: true,
						message: 'Please input your password!',
					},
				]}
			>
				<Input
					prefix={<LockOutlined className="site-form-item-icon" />}
					type="password"
					placeholder="Password"
				/>
			</Form.Item>
			<Form.Item
				shouldUpdate
				validateStatus={"Error"}
			>
				{() => (
					<Button
						onClick={() => { setSubmitType(0) }}
						type="primary"
						htmlType="submit"
						disabled={
							!form.isFieldsTouched(true) ||
							!!form.getFieldsError().filter(({ errors }) => errors.length).length
						}
					>
						Log in
					</Button>
				)}
			</Form.Item>
			<Form.Item
				shouldUpdate
				validateStatus={"Error"}
			>
				{() => (
					<Button
						onClick={() => { setSubmitType(1) }}
						type="primary"
						htmlType="submit"
						disabled={
							!form.isFieldsTouched(true) ||
							!!form.getFieldsError().filter(({ errors }) => errors.length).length
						}
					>
						Sign up
					</Button>
				)}
			</Form.Item>
		</Form>
	);
};

export default Login