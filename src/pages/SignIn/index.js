import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

import AuthLayout from '../../layouts/Auth';

import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import Link from '../../components/Link';
import { Row, Title, Label } from '../../components/Auth';

import EventInfoContext from '../../contexts/EventInfoContext';
import UserContext from '../../contexts/UserContext';

import useSignIn from '../../hooks/api/useSignIn';

import styled from 'styled-components';
import axios from 'axios';
import { useEffect } from 'react';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loadingSignIn, signIn } = useSignIn();

  const { eventInfo } = useContext(EventInfoContext);
  const { setUserData } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);
    
    const code = urlParams.get('code');
    console.log(code);
    if( code ) {
      axios.post('http://localhost:4000/oauth/github/login', { code })
        .then((res) => {
          console.log(res);
          localStorage.setItem('token', res.data.token);
          navigate('/dashboard');
        })
        .catch((e) => {
          console.log(e);
          toast('Por favor, deixe seu e-mail do GitHub público!');
          navigate('/sign-in');
        });
    }
  }, []);
  
  async function submit(event) {
    event.preventDefault();

    try {
      const userData = await signIn(email, password);
      setUserData(userData);
      toast('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (err) {
      toast('Não foi possível fazer o login!');
    }
  } 

  async function test() {
    /* const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);
    const code = urlParams.get('code');
    console.log(code);
    //const clientId = '061456318093ba2b5e24';
    axios.post('/oauth/github/login', { code })
      .then((res) => {
        console.log(res);
	      localStorage.setItem('token', res.data.token);
      }); */
  }

  return (
    <AuthLayout background={eventInfo.backgroundImageUrl}>
      <Row>
        <img src={eventInfo.logoImageUrl} alt="Event Logo" width="60px" />
        <Title>{eventInfo.title}</Title>
      </Row>
      <Row>
        <Label>Entrar</Label>
        <form onSubmit={submit}>
          <Input label="E-mail" type="text" fullWidth value={email} onChange={e => setEmail(e.target.value)} />
          <Input label="Senha" type="password" fullWidth value={password} onChange={e => setPassword(e.target.value)} />
          <Button type="submit" color="primary" fullWidth disabled={loadingSignIn}>Entrar</Button>
        </form>
        <Teste onClick={test}>
          <a href='https://github.com/login/oauth/authorize?client_id=061456318093ba2b5e24'>
            Entrar com gitHub
          </a>
        </Teste>
      </Row>
      <Row>
        <Link to="/enroll">Não possui login? Inscreva-se</Link>
      </Row>
    </AuthLayout>
  );
}

const Teste = styled.button`
  width: 100%;
  height: 35px;

  margin-top: 10px;

  border-radius: 5px;
  border: none;

  color: white;
  background-color: black;

  font-family: 'Roboto', sans-serif;
  font-style: normal;
  //font-weight: 400;
  font-size: 16px;
  //line-height: 23px;
  text-align: center;
  text-transform: uppercase;

`;
