/* eslint-disable indent */
import { TextField } from '@material-ui/core';
import React, { useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { EmptyInfoText } from '../style';
import { Container, Form, PaymentContainer, ThirdLine } from './style';
import InputMask from 'react-input-mask';
import { SubmitContainer } from '../../../../components/PersonalInformationForm';
import Button from '../../../../components/Form/Button';
import { updatePayment } from '../../../../services/ticketApi';
import { toast } from 'react-toastify';

export default class PaymentForm extends React.Component {
    state = {
        cvc: '',
        expiry: '',
        focus: '',
        name: '',
        number: '',
    };

    handleInputFocus = (e) => {
        this.setState({ focus: e.target.name });
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;

        this.setState({ [name]: value });
    }

    render() {
        async function handleSubmit() {
            try {
                const response = await updatePayment();
                console.log(response);
                toast('Pagamento feito com sucesso!');
            } catch (error) {
                console.log(error);
                toast('Algo deu errado, tente novamente.');
            }
        }

        return (
            <Container>
                <EmptyInfoText>Pagamento</EmptyInfoText>
                <PaymentContainer id="PaymentForm">
                    <Cards
                        cvc={this.state.cvc}
                        expiry={this.state.expiry}
                        focused={this.state.focus}
                        name={this.state.name}
                        number={this.state.number}
                    />
                    <Form onSubmit={handleSubmit}>
                        <InputMask
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}
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
                                />
                            }
                        </InputMask>
                        <TextField
                            type="text"
                            name="name"
                            placeholder="Name"
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}
                            variant="outlined"
                            size="small"
                            autoComplete="off"
                        />
                        <ThirdLine>
                            <InputMask
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus}
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
                                    />
                                }
                            </InputMask>
                            <InputMask
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus}
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
                                    />
                                }
                            </InputMask>
                        </ThirdLine>
                        <SubmitContainer>
                            <Button type="submit">
                                Finalizar Pagamento
                            </Button>
                        </SubmitContainer>
                    </Form>
                </PaymentContainer>
            </Container >
        );
    }
}
