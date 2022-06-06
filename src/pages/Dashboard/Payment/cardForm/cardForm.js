/* eslint-disable quotes */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
import { TextField } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { Container, Form, PaymentContainer, SubmitContainer, ThirdLine } from './style';
import InputMask from 'react-input-mask';
import Button from '../../../../components/Form/Button';
import { updatePayment } from '../../../../services/ticketApi';
import { toast } from 'react-toastify';
import useToken from '../../../../hooks/useToken';
import UserContext from '../../../../contexts/UserContext';
import dayjs from 'dayjs';

export default function PaymentForm({ setConfirmPayment }) {
    const token = useToken();
    const { userData } = useContext(UserContext);
    const [state, setState] = useState({
        cvc: '',
        expiry: '',
        focus: '',
        name: '',
        number: '',
    });

    const [cardNumberError, setCardNumberError] = useState(false);
    const [cardCVCError, setCardCVCError] = useState(false);
    const [cardNameError, setCardNameError] = useState(false);
    const [cardExpiryError, setCardExpiryError] = useState(false);
    const [cardMonthExpiryError, setCardMonthExpiryError] = useState(false);

    async function submit(e) {
        e.preventDefault();

        const isValid = isInputValid();

        if (!isValid) {
            //throw (toast.error('Verifique as informações inseridas!'));
            return;
        }

        try {
            await updatePayment(token, userData.user.id);
            setConfirmPayment(true);
            toast('Pagamento feito com sucesso!');
        } catch (error) {
            toast.error('Algo deu errado, tente novamente.');
        }
    }

    function isInputValid() {
        let dateNow = dayjs();

        let message = '';

        if (state.number.length < 19) {
            setCardNumberError(true);
            message = 'Número do cartão precisa ter 16 digitos!';
        } else {
            setCardNumberError(false);
        }

        if (state.cvc.length < 3) {
            setCardCVCError(true);
            message = 'CVC precisa ter 3 digitos!';
        } else {
            setCardCVCError(false);
        }

        if (state.name.length < 5 || typeof state.name === 'number') {
            setCardNameError(true);
            message = 'Nome precisa ter mais que 5 letras!';
        } else {
            setCardNameError(false);
        }

        if (dayjs(state.expiry.replace('/', '-'), 'MM/YY').isBefore(dateNow, 'MM/YY')) {
            setCardExpiryError(true);
            message = 'Data de expiração precisa ser válida!';
        } else {
            setCardExpiryError(false);
        }

        if (state.expiry.split('/')[0] > 12) {
            setCardMonthExpiryError(true);
            message = 'Insira um mês válido entre 1 e 12!';
        } else {
            setCardMonthExpiryError(false);
        }

        if (message.length > 0) {
            return false;
        } else {
            return true;
        }
    }

    function handleInputFocus(e) {
        setState({ ...state, focus: e.target.name });
    }

    function handleInputChange(e) {
        const { name, value } = e.target;

        setState({ ...state, [name]: value });
    }

    return (
        <Container>
            <PaymentContainer id="PaymentForm">
                <Cards
                    cvc={state.cvc}
                    expiry={state.expiry}
                    focused={state.focus}
                    name={state.name}
                    number={state.number}
                />
                <Form onSubmit={submit}>
                    <InputMask
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        mask="9999 9999 9999 9999"
                        maskChar=''

                    >
                        {() =>
                            <TextField
                                className='cardNumber'
                                type="tel"
                                name="number"
                                placeholder="Card Number"
                                variant="outlined"
                                helperText={cardNumberError
                                    ? 'Número do cartão precisa ter 16 digitos!'
                                    : 'E.g.: 49..., 51..., 36..., 37...'
                                }
                                size="small"
                                required
                                error={cardNumberError}
                            />
                        }
                    </InputMask>
                    <InputMask
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        maskChar=''
                    >
                        {() =>
                            <TextField
                                type="text"
                                name="name"
                                placeholder="Name"
                                onChange={handleInputChange}
                                onFocus={handleInputFocus}
                                variant="outlined"
                                helperText={cardNameError
                                    ? 'Nome precisa ter mais que 5 letras!'
                                    : ' '
                                }
                                size="small"
                                autoComplete="off"
                                required
                                error={cardNameError}
                            />
                        }
                    </InputMask>
                    <ThirdLine>
                        <InputMask
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            mask='99/99'
                            maskChar=''
                        >
                            {() =>
                                <TextField
                                    type="expiry"
                                    name="expiry"
                                    placeholder="Valid Tru"
                                    maxLength="5"
                                    variant="outlined"
                                    helperText={cardMonthExpiryError
                                        ? 'Insira um mês válido entre 1 e 12!'
                                        : cardExpiryError
                                            ? 'Data de expiração precisa ser válida!'
                                            : ' '
                                    }
                                    size="small"
                                    required
                                    error={cardExpiryError || cardMonthExpiryError}
                                />
                            }
                        </InputMask>
                        <InputMask
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            mask="999"
                            maskChar=''
                        >
                            {() =>
                                <TextField
                                    type="cvc"
                                    name="cvc"
                                    placeholder="CVC"
                                    variant="outlined"
                                    helperText={cardCVCError
                                        ? 'Mínimo 3 digitos!'
                                        : ' '
                                    }
                                    size="small"
                                    required
                                    error={cardCVCError}
                                />
                            }
                        </InputMask>
                    </ThirdLine>
                    <SubmitContainer>
                        <Button sx={{ pt: 10 }} type="submit">
                            Finalizar Pagamento
                        </Button>
                    </SubmitContainer>
                </Form>
            </PaymentContainer>
        </Container >
    );
}
