import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Alert, Space, Row, Col } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { signUp, login } from '../fetcher'

// const layout = {
//   labelCol: {
//     span: 8,
//   },
//   wrapperCol: {
//     span: 36,
//   },
// };

// const tailLayout = {
//   wrapperCol: {
//     offset: 12,
//     span: 24,
//   },
// };

/**
 * @name Login
 * @description Login form
 * 
 * APPEARS IN
 * LandingPage
 */
const Login = () => {
  const [form] = Form.useForm()
  const [, forceUpdate] = useState({}) // To disable submit button at the beginning.
  const [submitType, setSubmitType] = useState(0)
  const [loginState, setLoginState] = useState(0)
  const [signUpState, setSignUpState] = useState(0)

  useEffect(() => {
    forceUpdate({})
  }, [])


  /**
   * @description Callback function when form submitted.
   * Based on submit type, either calls onLogin() and updates database,
   * or signs user up by updating database and then calling onLogin()
   * @param {Object} values Contains form fields as strings {username: "username", password: "password"}
   */
  const onFinish = values => {
    console.log('Finish:', values)
    if (submitType === 0) {
      onLogin(values.username, values.password)
    } else {
      signUp(values.username, values.password).then(res => {
        console.log(res)
        console.log(res.results)
        if (res.results === true) {
          onLogin(values.username, values.password)
        } else {
          setSignUpState(signUpState + 1)
          // window.location = '/failed'
        }
      })
      console.log('Sign up')
    }
  }


  /**
 * @description Logs in user and if successful calls authSuccess().
 * Otherwise redirects back to landing page.
 * @param {String} username
 * @param {String} password
 */
  const onLogin = (username, password) => {
    login(username, password).then(res => {
      console.log(res)
      if (res.results === true) {
        localStorage.setItem('username', username)
        window.location = '/home'
      } else {
        setLoginState(loginState + 1)
        // window.location = '/failed'
        // invalidLogin('login error');
      }
    })
  }

  /**
  * @description detects if there was an error by checking loginState and signUpState
  * @return alert message with instructions for user on how to fix error
  */
  const invalidLogin = (submitType) => {

    var errorMessage;
    if (submitType === 0 && loginState > 0) {
      errorMessage = 'The username or password you entered is incorrect. Try entering the correct credentials!';
      // setLoginState(0);
    } else if (submitType === 1 && signUpState > 0) {
      errorMessage = 'The username you chose is already taken. Try something more unique!';
      // setSignUpState(0);
    } else {
      return;
    }
    form.resetFields();
    console.log(errorMessage);
    var invalidUserMsg =
      <>
        <p>{errorMessage}</p>
      </>

    return (
      <div>
        <Alert
          message="There's a problem with your login credentials:"
          description={errorMessage}
          type="error"
          showIcon
        />
      </div>

    )
  }


  return (
    <>
      <Space direction='vertical'>
        <Row>
          <Col span={24}>
            <Form

              form={form}
              name='horizontal-login'
              layout='inline'
              onFinish={onFinish}
            >
              <Form.Item
                name='username'
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!'
                  }
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder='Username'
                  style={{ borderRadius: '25px' }}

                />
              </Form.Item>
              <Form.Item
                name='password'
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!'
                  }
                ]}
              >
                <Input
                  prefix={<LockOutlined />}
                  type='password'
                  placeholder='Password'
                  style={{ borderRadius: '25px' }}
                />
              </Form.Item>
              <Form.Item shouldUpdate validateStatus={'Error'}>
                {() => (
                  <Button
                    onClick={() => { setSubmitType(0) }}
                    type='primary'
                    htmlType='submit'
                    disabled={
                      !form.isFieldsTouched(true) ||
                      !!form.getFieldsError().filter(({ errors }) => errors.length)
                        .length
                    }
                    shape='round'
                  >
                    Log in
                  </Button>
                )}

              </Form.Item>
              <Form.Item shouldUpdate validateStatus={'Error'}>

                {() => (
                  <Button
                    onClick={() => { setSubmitType(1) }}
                    type='primary'
                    danger
                    htmlType='submit'
                    disabled={
                      !form.isFieldsTouched(true) ||
                      !!form.getFieldsError().filter(({ errors }) => errors.length)
                        .length
                    }
                    shape='round'
                  >
                    Sign up
                  </Button>
                )}
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col span={24} >
            {invalidLogin(submitType)}
          </Col>
        </Row>
      </Space>
    </>

  )
}


export default Login
