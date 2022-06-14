import { Container, Loading } from './style';
import Puff from '../../assets/images/puff_loading.svg';

export default function PuffLoading() {
  return (
    <Container>
      <Loading src={Puff} />
    </Container>
  );
};
