'use client';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';


import React, { useState, useEffect } from 'react';
import { 
  Button, 
  TextField, 
  Container, 
  Typography, 
  Box as MUIBox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress
} from '@mui/material';
import { useRouter } from 'next/router';

interface Product {
  _id: string;
  productID: string;
  quantity: number;
}

interface Box {
  _id: string;
  description: string;
  userID: string;
}

const BoxPage: React.FC = () => {
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [box, setBox] = useState<Box | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchUserBox();
  }, []);

  const fetchUserBox = async () => {
    try {
      const response = await fetch('/api/box');
      if (response.ok) {
        const data = await response.json();
        setBox(data.box);
        setProducts(data.products);
      }
    } catch (err) {
      console.error('Error fetching box:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/box', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      });

      if (!response.ok) {
        throw new Error('Failed to create box');
      }

      const data = await response.json();
      setBox(data.box);
      console.log('Box created:', data.box);
    } catch (err) {
      setError('An error occurred while creating the box.');
      console.error(err);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!box) {
    return (
      <Container maxWidth="sm">
        <MUIBox sx={{ mt: 4, mb: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Create New Box
          </Typography>
        </MUIBox>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            margin="normal"
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth 
            sx={{ mt: 2 }}
          >
            Create Box
          </Button>
        </form>
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <MUIBox sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Your Box: {box.description}
        </Typography>
      </MUIBox>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product ID</TableCell>
              <TableCell align="right">Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell component="th" scope="row">
                  {product.productID}
                </TableCell>
                <TableCell align="right">{product.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Add a form or button here to add new products */}
    </Container>
  );
};

export default BoxPage;


// esempio:
const { Account } = require('./models');

const createAccount = async () => {
  try {
    const newAccount = new Account({
      accountID: 'your_account_id',
      secret: 'your_secret',
    });

    await newAccount.save();
    console.log('Account created:', newAccount);
  } catch (error) {
    console.error(error.message);
  }
};

createAccount();