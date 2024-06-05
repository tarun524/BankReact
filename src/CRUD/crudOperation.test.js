import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import BankingCrudOperation from './crudOperation';
 
// Mock axios
jest.mock('axios');
 
describe('BankingCrudOperation', () => {
    beforeEach(() => {
        axios.get.mockResolvedValue({
            data: [
                {
                    id: 1,
                    name: 'John Doe',
                    balance: 1000,
                    email: 'john@example.com',
                    aadharcardnumber: '123456789012',
                    accoutnumber: '9876543210',
                    phonenumber: '1234567890'
                }
            ]
        });
    });
 
    it('renders without crashing', async () => {
        render(<BankingCrudOperation />);
        await waitFor(() => {
            expect(screen.getByText('Banking CRUD Example')).toBeInTheDocument();
        });
    });
 
    it('fetches and displays customers', async () => {
        render(<BankingCrudOperation />);
        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeInTheDocument();
        });
    });
 
    it('adds a new customer', async () => {
        axios.post.mockResolvedValue({
            data: {
                id: 2,
                name: 'Jane Doe',
                balance: 5000,
                email: 'jane@example.com',
                aadharcardnumber: '210987654321',
                accoutnumber: '0123456789',
                phonenumber: '0987654321'
            }
        });
 
        render(<BankingCrudOperation />);
 
        fireEvent.change(screen.getByPlaceholderText('Customer Name'), { target: { value: 'Jane Doe' } });
        fireEvent.change(screen.getByPlaceholderText('Balance'), { target: { value: '5000' } });
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'jane@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Aadhar Card Number'), { target: { value: '210987654321' } });
        fireEvent.change(screen.getByPlaceholderText('Account Number'), { target: { value: '0123456789' } });
        fireEvent.change(screen.getByPlaceholderText('Phone Number'), { target: { value: '0987654321' } });
 
        fireEvent.click(screen.getByText('Add Customer'));
 
        await waitFor(() => {
            expect(screen.getByText('Jane Doe')).toBeInTheDocument();
        });
    });
 
    it('updates an existing customer', async () => {
        axios.put.mockResolvedValue({
            data: {
                id: 1,
                name: 'John Updated',
                balance: 1500,
                email: 'johnupdated@example.com',
                aadharcardnumber: '123456789012',
                accoutnumber: '9876543210',
                phonenumber: '1234567890'
            }
        });
 
        render(<BankingCrudOperation />);
 
        fireEvent.click(screen.getByText('Edit'));
 
        fireEvent.change(screen.getByPlaceholderText('Customer Name'), { target: { value: 'John Updated' } });
        fireEvent.change(screen.getByPlaceholderText('Balance'), { target: { value: '1500' } });
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'johnupdated@example.com' } });
 
        fireEvent.click(screen.getByText('Update Customer'));
 
        await waitFor(() => {
            expect(screen.getByText('John Updated')).toBeInTheDocument();
        });
    });
 
    it('deletes a customer', async () => {
        axios.delete.mockResolvedValue({});
 
        render(<BankingCrudOperation />);
 
        fireEvent.click(screen.getByText('Delete'));
 
        await waitFor(() => {
            expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
        });
    });
});
 
