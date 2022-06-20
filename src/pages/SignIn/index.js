import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import AuthLayout from '../../layouts/Auth';

import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import Link from '../../components/Link';
import { Row, Title, Label } from '../../components/Auth';
import PuffLoading from '../../components/PuffLoading';

import EventInfoContext from '../../contexts/EventInfoContext';
import UserContext from '../../contexts/UserContext';

import useSignIn from '../../hooks/api/useSignIn';

import axios from 'axios';
import { useEffect } from 'react';
import { Oauth } from './style';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { loadingSignIn, signIn } = useSignIn();

  const { eventInfo } = useContext(EventInfoContext);
  const { setUserData } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    const code = urlParams.get('code');
    if (code) {
      setIsLoading(true);
      axios.post('http://localhost:4000/oauth/github/login', { code })
        .then((res) => {
          setUserData(res.data);
          toast('Login realizado com sucesso!');
          navigate('/dashboard');
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e);
          toast.error('Por favor, deixe seu e-mail do GitHub público!');
          navigate('/sign-in');
          setIsLoading(false);
        });
    }
  }, []);

  async function submit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const userData = await signIn(email, password);
      setUserData(userData);
      toast('Login realizado com sucesso!');
      setIsLoading(false);
      navigate('/dashboard');
    } catch (err) {
      setIsLoading(false);
      toast('Não foi possível fazer o login!');
    }
  }

  return (
    <AuthLayout background={eventInfo.backgroundImageUrl}>
      <Row>
        <img src={eventInfo.logoImageUrl} alt="Event Logo" width="60px" />
        <Title>{eventInfo.title}</Title>
      </Row>
      <Row>
        {isLoading ?
          <PuffLoading />
          :
          <>
            <Label>Entrar</Label><form onSubmit={submit}>
              <Input label="E-mail" type="text" fullWidth value={email} onChange={e => setEmail(e.target.value)} />
              <Input label="Senha" type="password" fullWidth value={password} onChange={e => setPassword(e.target.value)} />
              <Button type="submit" color="primary" fullWidth disabled={loadingSignIn}>Entrar</Button>
            </form><Oauth>
              <a href='https://github.com/login/oauth/authorize?client_id=061456318093ba2b5e24'>
                Entrar com gitHub
              </a>
            </Oauth>
          </>
        }
      </Row>
      <Row>
        <Link to="/enroll">Não possui login? Inscreva-se</Link>
      </Row>
    </AuthLayout>
  );
}
