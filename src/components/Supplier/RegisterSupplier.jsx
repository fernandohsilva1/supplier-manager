import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Box, Button } from '@mui/material';
import Input from '@mui/material/Input';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const RegisterSupplier = () => {
    const [supplier, setSupplier] = useState({
        id: Date.now(),
        name: '',
        phone: '',
        email: '',
        company: '',
    });
    const [success, setSuccess] = useState(false);
    const [emailUsed, setEmailUsed] = useState(false);
    const [phoneUsed, setPhoneUsed] = useState(false)

    const ariaLabel = { 'aria-label': 'description' };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSupplier(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const savedSuppliers = JSON.parse(localStorage.getItem('suppliers')) || [];

        let isEmailUsed = false;
        let isPhoneUsed = false;

        savedSuppliers.forEach((savedSupplier) => {
            if (savedSupplier.email === supplier.email) {
                isEmailUsed = true;
            }
            if (savedSupplier.phone === supplier.phone) {
                isPhoneUsed = true;
            }
        });

        if (isEmailUsed) {
            setEmailUsed(true);
            setSuccess(false);
            return;
        } else {
            setEmailUsed(false);
        }

        if (isPhoneUsed) {
            setPhoneUsed(true);
            setSuccess(false);
            return;
        } else {
            setPhoneUsed(false);
        }

        const newSuppliers = [...savedSuppliers, supplier];
        localStorage.setItem('suppliers', JSON.stringify(newSuppliers));

        setSupplier({
            id: Date.now(),
            name: '',
            phone: '',
            email: '',
            company: ''
        });
        setSuccess(true);
        setEmailUsed(false);
        setPhoneUsed(false);
    };

    return (
        <Box style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
            padding: '20px',
            boxSizing: 'border-box',
            backgroundColor: '#00FFCD'
        }}>
            <Box
                style={{
                    width: '500px',
                    height: '500px',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
                    backgroundColor: '#00AFEF',
                }}
            >
                <Box style={{
                    height: '100%',
                    marginLeft: '30px',
                    marginBottom: '20px',
                    marginTop: '40px',
                }}>
                    <Box style={{
                        marginBottom: '30px',
                        color: 'white',
                    }}>
                        <h2>Olá, Cliente!</h2>
                        <p style={{ fontSize: '20px' }}>
                            Cadastre seu fornecedor ao lado, podendo ou não conter o nome da empresa. Caso precise de alguma ajuda, não hesite em nos contatar! :)
                        </p>
                    </Box>
                    <Button style={{ backgroundColor: 'white', padding: '12px' }} variant='outlined'>
                        <Link to="/edicao">
                            <strong style={{ color: 'black', textTransform: 'capitalize' }}>
                                Visualizar Fornecedores
                            </strong>
                        </Link>
                    </Button>
                </Box>
            </Box>
            <Box
                style={{
                    width: '500px',
                    height: '500px',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
                    backgroundColor: 'white',
                }}
            >
                <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Link to="/edicao">
                        <ArrowForwardIcon />
                    </Link>
                </Box>
                <Box style={{ marginTop: '20px' }}>
                    <h2 style={{ textAlign: 'center', fontSize: '18px', color: '#00AFEF', textTransform: 'uppercase' }}>Cadastro de Fornecedor</h2>
                    <form onSubmit={handleSubmit}>
                        <Box style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '30px',
                            width: '100%'
                        }}>
                            <Input
                                placeholder="Nome"
                                name="name" value={supplier.name}
                                onChange={handleInputChange}
                                inputProps={ariaLabel}
                                required
                            />
                            <Input
                                placeholder="Telefone"
                                name="phone"
                                value={supplier.phone}
                                onChange={handleInputChange}
                                inputProps={ariaLabel}
                                required
                            />
                            <Input
                                placeholder="E-mail"
                                name="email"
                                value={supplier.email}
                                onChange={handleInputChange}
                                inputProps={ariaLabel}
                                required
                            />
                            <Input
                                placeholder="Nome da Empresa"
                                name="company"
                                value={supplier.company}
                                onChange={handleInputChange}
                                inputProps={ariaLabel}
                            />
                            <Button
                                style={{ width: '250px', margin: '0 auto' }}
                                variant="contained"
                                type='submit'
                            >
                                Cadastrar
                            </Button>
                        </Box>
                        {(phoneUsed || emailUsed) && (
                            <Box
                                marginTop="50px"
                                color="red"
                            >
                                {phoneUsed ? 'Telefone' : 'Email'} já usado!
                            </Box>
                        )}
                        {success && (
                            <Box
                                marginTop='50px'
                                color='#00AFEF'
                            >
                                Fornecedor cadastrado com sucesso!
                            </Box>
                        )}
                    </form>
                </Box>
            </Box>
        </Box>
    );
}

export default RegisterSupplier;
