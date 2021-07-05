import React from 'react'
import { Form, Input, Button, Checkbox, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Redirect } from 'react-router-dom'
import './login.css'

import { useDispatch, useSelector } from 'react-redux'
import { changeAuth, changeUserInfo } from '../../Redux/CommonSlice'

import firebaseDB from '../../firebase/firebase'

const Login = () => {
  const dispatch = useDispatch()
  const auth = useSelector(s => s.common.auth)

  const onFinish = values => {
    console.log('Received values of form: ', values)

    firebaseDB
      .child('users')
      .get()
      .then(snapshot => {
        var flg = 0;
        if (snapshot.exists()) {
          snapshot.forEach(child => {
            if (
              child.val().user_info.email === values.email &&
              child.val().user_info.password === values.password
            ) {
              message.config({ top: 60 })
              message.success('Login Successful!')
              flg =1;
              dispatch(
                changeUserInfo({
                  id: child.key,
                  full_name: child.val().user_info.full_name
                })
              )
              dispatch(changeAuth())
            }
            
          })
        } else {
          message.error('No data available')
        }
        if(!flg) message.warning('Incorrect Username or Password!');
      })
      .catch(error => {
        message.error(error.message)
      })
  }

  if (auth) return <Redirect to={'/'} />

  return (
    <div className='div'>
      <Form
        name='normal_login'
        className='login-form shadow-sm bg-body rounded'
        initialValues={{
          remember: true
        }}
        onFinish={onFinish}
        style={{ height: '450px' }}
      >
        <h3 className='title mt-5'>Hide Your Message</h3>
        <Form.Item
          name='email'
          rules={[
            {
              required: true,
              message: 'Please input your Email!'
            }
          ]}
          style={{ padding: '0px 20px' }}
        >
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='Email'
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your Password!'
            }
          ]}
          style={{ padding: '0px 20px' }}
        >
          <Input
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Password'
          />
        </Form.Item>
        <Form.Item style={{ padding: '0px 20px' }}>
          <Form.Item name='remember' valuePropName='unchecked' noStyle>
            <Checkbox style={{ color: 'white' }}>Remember me</Checkbox>
          </Form.Item>
          <a className='login-form-forgot' href='#' style={{ padding: '0px 20px', color : 'white' }}>
            Forgot password ? 
          </a>
        </Form.Item>

        <Form.Item style={{ padding: '0px 20px', color : 'grey', textAlign : 'center'}}>
          <Button htmlType='submit' className='login-form-button'>
            Log in
          </Button>
          OR
          <Button  className='login-form-button mt-2.5'>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
