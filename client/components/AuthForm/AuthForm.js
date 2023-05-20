import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Input,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import style from './style';
import { CloseOutlined } from '@mui/icons-material';
import { useState } from 'react';

export default function AuthForm({ authType }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
    tc: false,
  });

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {};

  return (
    <Box sx={style.formContainer}>
      <CloseOutlined />
      <Box sx={style.formWrap}>
        <Box sx={style.formHeader}>
          <Image src='' width='60px' height='40px' alt='Iwosan logo' />
          <Typography variant='title' component='h4'>
            {authType}
          </Typography>
        </Box>
        <Box component='form' sx={style.form}>
          {authType !== 'Login' && (
            <FormControl>
              <Typography variant='title'>Name</Typography>
              <Input
                variant='standard'
                name='name'
                value={formData.name}
                onChange={handleInputChange}
                sx={style.input}
              />
            </FormControl>
          )}
          <FormControl>
            <Typography variant='title'>Email</Typography>
            <Input
              variant='standard'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              sx={style.input}
            />
          </FormControl>
          <FormControl>
            <Typography variant='title'>Password</Typography>
            <Input
              fullWidth
              variant='standard'
              name='password'
              value={formData.password}
              onChange={handleInputChange}
              sx={style.input}
            />
          </FormControl>
          {authType !== 'Login' && (
            <FormControl sx={style.formControl}>
              <Typography variant='title'>Confirm Password</Typography>
              <Input
                fullWidth
                variant='standard'
                name='password'
                value={formData.confirmPassword}
                onChange={handleInputChange}
                sx={style.input}
              />
            </FormControl>
          )}
          {authType !== 'Login' ? (
            <FormControl sx={style.checkbox}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleInputChange}
                    inputProps={{ 'aria-label': 'Accept terms and conditions' }}
                  />
                }
                label='I accept the'
              />
              <Typography component={Link}>terms & conditions</Typography>
            </FormControl>
          ) : (
            <FormControl>
              <FormControlLabel
                sx={style.checkbox}
                control={
                  <Checkbox
                    onChange={handleInputChange}
                    inputProps={{ 'aria-label': 'Remember me' }}
                  />
                }
                label='Remember me'
              />
            </FormControl>
          )}
          <Button sx={style.submit} type='submit' onClick={handleSubmit}>
            {authType}
          </Button>
        </Box>

        <Box>
          <Typography variant='subtitle1'>
            {authType === 'Login'
              ? "Don't have an account yet?"
              : 'Already have an account?'}{' '}
            {authType === 'Login' ? (
              <Typography variant='body2' component={Link} href='/signup'>
                Create an account
              </Typography>
            ) : (
              <Typography variant='body2' component={Link} href='/signup'>
                Create an account
              </Typography>
            )}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
