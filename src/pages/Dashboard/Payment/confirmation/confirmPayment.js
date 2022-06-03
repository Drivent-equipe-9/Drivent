import { toast } from 'react-toastify';
import Button from '../../../../components/Form/Button';
import { SubmitContainer } from '../../../../components/PersonalInformationForm';
import useToken from '../../../../hooks/useToken';
import { updatePayment } from '../../../../services/ticketApi';

export function ConfirmPayment({ formData }) {
  const token = useToken();

  async function handleSubmit() {
    try {
      const response = updatePayment(token, formData);
      console.log(response);
      toast('Pagamento feito com sucesso!');
    } catch (error) {
      console.log(error);
      toast('Algo deu errado, tente novamente.');
    }
  }

  return (
    <SubmitContainer>
      <Button onClick={() => handleSubmit}>
        Finalizar Pagamento
      </Button>
    </SubmitContainer>
  );
}
