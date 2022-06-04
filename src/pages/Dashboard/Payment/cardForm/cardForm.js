/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
import { TextField } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { Container, Form, PaymentContainer, SubmitContainer, ThirdLine } from './style';
import InputMask from 'react-input-mask';
import Button from '../../../../components/Form/Button';
import { updatePayment } from '../../../../services/ticketApi';
import { toast } from 'react-toastify';
import useToken from '../../../../hooks/useToken';
import UserContext from '../../../../contexts/UserContext';

export default function PaymentForm({ paymentConfirm, SetPaymentConfirm }) {
    const token = useToken();
    const { userData } = useContext(UserContext);
    const [state, setState] = useState({
        cvc: '',
        expiry: '',
        focus: '',
        name: '',
        number: '',
    });

    const [error, setError] = useState({
        cvc: false,
        expiry: false,
        name: false,
        number: false,
    });

    //+ state.cvc + ' + ' + state.expiry + ' + ' + state.name + ' + ' + state.number
    //let { user } = JSON.parse(localStorage.getItem('userData'));

    async function submit(e) {
        e.preventDefault();

        try {
            await updatePayment(token, userData.user.id);
            SetPaymentConfirm(true);
            toast('Pagamento feito com sucesso!');
        } catch (error) {
            SetPaymentConfirm(false);
            toast('Algo deu errado, tente novamente.');
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
                                helperText="E.g.: 49..., 51..., 36..., 37..."
                                size="small"
                                required
                                error={error.number}
                            />
                        }
                    </InputMask>
                    <TextField
                        type="text"
                        name="name"
                        placeholder="Name"
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        variant="outlined"
                        size="small"
                        autoComplete="off"
                        required
                        error={error.name}
                    />
                    <ThirdLine>
                        <InputMask
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            mask="99/99"
                            maskChar=''
                        >
                            {() =>
                                <TextField
                                    type="expiry"
                                    name="expiry"
                                    placeholder="Valid Tru"
                                    maxLength="5"
                                    variant="outlined"
                                    size="small"
                                    required
                                    error={error.expiry}
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
                                    size="small"
                                    required
                                    error={error.cvc}
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
