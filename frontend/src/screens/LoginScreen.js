import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { login } from '../redux/authentication/authenticationAction'
import { toastNotification } from '../components/ToastNotif'

const LoginScreen = ({ location, history }) => {
  const [rollNumber, setRollNumber] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  let redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
      toastNotification('Successfully Logged')
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(rollNumber, password))
    if (error) {
      toastNotification(error, 'error')
    }
  }

  return (
    <div>
      <Alert className='heading-button text-center font-weight-bolder'>
        Login
      </Alert>
      <FormContainer>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='email'>
            <Form.Label>Roll Number</Form.Label>
            <Form.Control
              type='string'
              placeholder='Enter University Roll Number'
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            {loading ? (
              <Spinner
                as='span'
                animation='border'
                size='sm'
                role='status'
                aria-hidden='true'
              />
            ) : (
              <>Sign In</>
            )}
          </Button>
        </Form>

        <Row className='py-3'>
          <Col>
            New Student?{' '}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : '/register'}>
              Register
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </div>
  )
}

export default LoginScreen
