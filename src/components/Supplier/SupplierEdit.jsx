import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { supplierEditStyles } from './styles';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import Input from '@mui/material/Input';
import { Edit, Delete } from '@mui/icons-material';
import Pagination from '@mui/material/Pagination';

const SupplierEdit = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentEditIndex, setCurrentEditIndex] = useState(null);
    const [editData, setEditData] = useState({
        name: '',
        phone: '',
        email: '',
        company: '',
    });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const savedSuppliers = JSON.parse(localStorage.getItem('suppliers')) || [];
        setSuppliers(savedSuppliers);
    }, []);

    const handleEditSupplier = (index) => {
        setCurrentEditIndex(index);
        setEditData(suppliers[index]);
        setIsEditing(true);
    };

    const handleDeleteSupplier = (index) => {
        const updatedSuppliers = [...suppliers];
        updatedSuppliers.splice(index, 1);
        setSuppliers(updatedSuppliers);
        localStorage.setItem('suppliers', JSON.stringify(updatedSuppliers));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData({
            ...editData,
            [name]: value
        });
    };

    const handleSave = () => {
        const updatedSuppliers = [...suppliers];
        updatedSuppliers[currentEditIndex] = editData;
        setSuppliers(updatedSuppliers);
        localStorage.setItem('suppliers', JSON.stringify(updatedSuppliers));
        setIsEditing(false);
        setCurrentEditIndex(null);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setCurrentEditIndex(null);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentSuppliers = suppliers.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <Box style={supplierEditStyles.container}>
            <Box style={supplierEditStyles.card}>
                <Box>
                    <Box
                        style={{
                            display: 'flex', marginBottom: '20px', width: '100%', justifyContent: 'space-between'
                        }}
                    >
                        <h1 style={{ fontSize: '25px' }}>Fornecedores</h1>
                        <Link to="/">
                            <Button variant='contained'>
                                + Adicionar novo fornecedor
                            </Button>
                        </Link>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nome</TableCell>
                                    <TableCell>Telefone</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Empresa</TableCell>
                                    <TableCell>Ações</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentSuppliers.map((supplier, index) => (
                                    <TableRow key={index}>
                                        {isEditing && currentEditIndex === index ? (
                                            <>
                                                <TableCell>
                                                    <Input
                                                        placeholder="Nome"
                                                        name="name"
                                                        value={editData.name}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        type="number"
                                                        placeholder="Telefone"
                                                        name="phone"
                                                        value={editData.phone}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        placeholder="Email"
                                                        name="email"
                                                        value={editData.email}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        placeholder="Nome da Empresa"
                                                        name="company"
                                                        value={editData.company}
                                                        onChange={handleChange}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Button variant="contained" onClick={handleSave}>Salvar</Button>
                                                    <Button style={supplierEditStyles.cancelButton} onClick={handleCancel}>Cancelar</Button>
                                                </TableCell>
                                            </>
                                        ) : (
                                            <>
                                                <TableCell>{supplier.name}</TableCell>
                                                <TableCell>{supplier.phone}</TableCell>
                                                <TableCell>{supplier.email}</TableCell>
                                                <TableCell>{supplier.company}</TableCell>
                                                <TableCell>
                                                    <IconButton onClick={() => handleEditSupplier(index + indexOfFirstItem)} style={supplierEditStyles.editButtons}>
                                                        <Edit />
                                                    </IconButton>
                                                    <IconButton onClick={() => handleDeleteSupplier(index + indexOfFirstItem)} style={supplierEditStyles.editButtons}>
                                                        <Delete />
                                                    </IconButton>
                                                </TableCell>
                                            </>
                                        )}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Pagination
                        count={Math.ceil(suppliers.length / itemsPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
                    />
                </Box>
            </Box>
        </Box>
    );
}

export default SupplierEdit;

