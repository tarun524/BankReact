
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// import './BankingCrudOperation.css'; // Import custom CSS for additional styling

// function BankingCrudOperation() {
//     const [customers, setCustomers] = useState([]);
//     const [name, setName] = useState('');
//     const [balance, setBalance] = useState(0);
//     const [email, setEmail] = useState('');
//     const [aadharcardnumber, setAadharCardNumber] = useState('');
//     const [accoutnumber, setAccountNumber] = useState('');
//     const [phonenumber, setPhoneNumber] = useState('');
//     const [editingCustomer, setEditingCustomer] = useState(null);
//     const [emailError, setEmailError] = useState('');

//     // Fetch customers
//     useEffect(() => {
//         axios.get('http://localhost:8888/customer/read')
//             .then(response => {
//                 setCustomers(response.data);
//             })
//             .catch(error => {
//                 console.error('There was an error fetching the customers!', error);
//             });
//     }, []);

//     // Create a new customer
//     const createCustomer = () => {
//         axios.post('http://localhost:8888/customer/add', {
//             name,
//             balance,
//             email,
//             aadharcardnumber,
//             accoutnumber,
//             phonenumber
//         })
//             .then(response => {
//                 setCustomers([...customers, response.data]);
//                 resetForm();
//             })
//             .catch(error => {
//                 console.error('There was an error creating the customer!', error);
//             });
//     };

//     // Update a customer
//     const updateCustomer = (customer) => {
//         axios.put(`http://localhost:8888/customer/update/${customer.id}`, {
//             name,
//             balance,
//             email,
//             aadharcardnumber,
//             accoutnumber,
//             phonenumber
//         })
//             .then(response => {
//                 setCustomers(customers.map(c => (c.id === customer.id ? response.data : c)));
//                 setEditingCustomer(null);
//                 resetForm();
//             })
//             .catch(error => {
//                 console.error('There was an error updating the customer!', error);
//             });
//     };

//     // Delete a customer
//     const deleteCustomer = (id) => {
//         axios.delete(`http://localhost:8888/customer/delete/${id}`)
//             .then(() => {
//                 setCustomers(customers.filter(customer => customer.id !== id));
//             })
//             .catch(error => {
//                 console.error('There was an error deleting the customer!', error);
//             });
//     };

//     const handleEditClick = (customer) => {
//         setEditingCustomer(customer);
//         setName(customer.name);
//         setBalance(customer.balance);
//         setEmail(customer.email);
//         setAadharCardNumber(customer.aadharcardnumber);
//         setAccountNumber(customer.accoutnumber);
//         setPhoneNumber(customer.phonenumber);
//     };

//     const handleSaveClick = () => {
//         if (editingCustomer) {
//             updateCustomer(editingCustomer);
//         } else {
//             if (validateEmail(email)) {
//                 createCustomer();
//             } else {
//                 setEmailError('Invalid email format');
//             }
//         }
//     };

//     const resetForm = () => {
//         setName('');
//         setBalance(0);
//         setEmail('');
//         setAadharCardNumber('');
//         setAccountNumber('');
//         setPhoneNumber('');
//         setEmailError('');
//     };

//     const validateEmail = (email) => {
//         // Regular expression for basic email validation
//         const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return regex.test(email);
//     };

//     return (
//         <div className="container">
//             <h1 className="text-center mt-4">Banking CRUD Example</h1>
//             <div className="row mt-4">
//                 <div className="col">
//                     <input
//                         type="text"
//                         className="form-control mb-3"
//                         placeholder="Customer Name"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                     />
//                     <input
//                         type="text"
//                         className="form-control mb-3"
//                         placeholder="Balance"
//                         value={balance}
//                         onChange={(e) => setBalance(e.target.value)}
//                     />
//                     <input
//                         type="email"
//                         className="form-control mb-3"
//                         placeholder="Email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     />
//                     {emailError && <p className="text-danger">{emailError}</p>}
//                     <input
//                         type="text"
//                         className="form-control mb-3"
//                         placeholder="Aadhar Card Number"
//                         value={aadharcardnumber}
//                         onChange={(e) => setAadharCardNumber(e.target.value)}
//                     />
//                     <input
//                         type="text"
//                         className="form-control mb-3"
//                         placeholder="Account Number"
//                         value={accoutnumber}
//                         onChange={(e) => setAccountNumber(e.target.value)}
//                     />
//                     <input
//                         type="tel"
//                         className="form-control mb-3"
//                         placeholder="Phone Number"
//                         value={phonenumber}
//                         onChange={(e) => setPhoneNumber(e.target.value)}
//                     />
//                     <button className="btn btn-primary" onClick={handleSaveClick}>
//                         {editingCustomer ? 'Update Customer' : 'Add Customer'}
//                     </button>
//                 </div>
//             </div>
//             <div className="row mt-4">
//                 <div className="col">
//                     <table className="table">
//                         <thead className="thead-dark">
//                             <tr>
//                                 <th>Name</th>
//                                 <th>Balance</th>
//                                 <th>Email</th>
//                                 <th>Aadhar Card Number</th>
//                                 <th>Account Number</th>
//                                 <th>Phone Number</th>
//                                 <th>Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {customers.map(customer => (
//                                 <tr key={customer.id}>
//                                     <td>{customer.name}</td>
//                                     <td>{customer.balance}</td>
//                                     <td>{customer.email}</td>
//                                     <td>{customer.aadharcardnumber}</td>
//                                     <td>{customer.accoutnumber}</td>
//                                     <td>{customer.phonenumber}</td>
//                                     <td>
//                                         <button className="btn btn-info mr-2" onClick={() => handleEditClick(customer)}>Edit</button>
//                                         <button className="btn btn-danger" onClick={() => deleteCustomer(customer.id)}>Delete</button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default BankingCrudOperation;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './BankingCrudOperation.css'; // Import custom CSS for additional styling

function BankingCrudOperation() {
    const [customers, setCustomers] = useState([]);
    const [name, setName] = useState('');
    const [balance, setBalance] = useState(0);
    const [email, setEmail] = useState('');
    const [aadharcardnumber, setAadharCardNumber] = useState('');
    const [accoutnumber, setAccountNumber] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [emailError, setEmailError] = useState('');

    // Fetch customers
    useEffect(() => {
        axios.get('http://localhost:8888/customer/read')
            .then(response => {
                setCustomers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the customers!', error);
            });
    }, []);

    // Create a new customer
    const createCustomer = () => {
        axios.post('http://localhost:8888/customer/add', {
            name,
            balance,
            email,
            aadharcardnumber,
            accoutnumber,
            phonenumber
        })
            .then(response => {
                setCustomers([...customers, response.data]);
                resetForm();
            })
            .catch(error => {
                console.error('There was an error creating the customer!', error);
            });
    };

    // Update a customer
    const updateCustomer = (customer) => {
        axios.put(`http://localhost:8888/customer/update/${customer.id}`, {
            name,
            balance,
            email,
            aadharcardnumber,
            accoutnumber,
            phonenumber
        })
            .then(response => {
                setCustomers(customers.map(c => (c.id === customer.id ? response.data : c)));
                setEditingCustomer(null);
                resetForm();
            })
            .catch(error => {
                console.error('There was an error updating the customer!', error);
            });
    };

    // Delete a customer
    const deleteCustomer = (id) => {
        axios.delete(`http://localhost:8888/customer/delete/${id}`)
            .then(() => {
                setCustomers(customers.filter(customer => customer.id !== id));
            })
            .catch(error => {
                console.error('There was an error deleting the customer!', error);
            });
    };

    const handleEditClick = (customer) => {
        setEditingCustomer(customer);
        setName(customer.name);
        setBalance(customer.balance);
        setEmail(customer.email);
        setAadharCardNumber(customer.aadharcardnumber);
        setAccountNumber(customer.accoutnumber);
        setPhoneNumber(customer.phonenumber);
    };

    const handleSaveClick = () => {
        if (editingCustomer) {
            updateCustomer(editingCustomer);
        } else {
            if (validateEmail(email)) {
                createCustomer();
            } else {
                setEmailError('Invalid email format');
            }
        }
    };

    const resetForm = () => {
        setName('');
        setBalance(0);
        setEmail('');
        setAadharCardNumber('');
        setAccountNumber('');
        setPhoneNumber('');
        setEmailError('');
    };

    const validateEmail = (email) => {
        // Regular expression for basic email validation
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    return (
        <div className="container-fluid bg-light py-5">
            <div className="container bg-white p-5 rounded shadow">
                <h1 className="text-center mb-4">Banking CRUD Example</h1>
                <div className="row">
                    <div className="col-md-6">
                        <h3 className="mb-3">Customer Information</h3>
                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Customer Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Balance"
                            value={balance}
                            onChange={(e) => setBalance(e.target.value)}
                        />
                        <input
                            type="email"
                            className="form-control mb-3"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {emailError && <p className="text-danger">{emailError}</p>}
                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Aadhar Card Number"
                            value={aadharcardnumber}
                            onChange={(e) => setAadharCardNumber(e.target.value)}
                        />
                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Account Number"
                            value={accoutnumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                        />
                        <input
                            type="tel"
                            className="form-control mb-3"
                            placeholder="Phone Number"
                            value={phonenumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <button className="btn btn-primary btn-block" onClick={handleSaveClick}>
                            {editingCustomer ? 'Update Customer' : 'Add Customer'}
                        </button>
                    </div>
                    <div className="col-md-6">
                        <h3 className="mb-3">Customer List</h3>
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Name</th>
                                    <th>Balance</th>
                                    <th>Email</th>
                                    <th>Aadhar Card Number</th>
                                    <th>Account Number</th>
                                    <th>Phone Number</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers.map(customer => (
                                    <tr key={customer.id}>
                                        <td>{customer.name}</td>
                                        <td>{customer.balance}</td>
                                        <td>{customer.email}</td>
                                        <td>{customer.aadharcardnumber}</td>
                                        <td>{customer.accoutnumber}</td>
                                        <td>{customer.phonenumber}</td>
                                        <td>
                                            <button className="btn btn-info mr-2" onClick={() => handleEditClick(customer)}>Edit</button>
                                            <button className="btn btn-danger" onClick={() => deleteCustomer(customer.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BankingCrudOperation;
