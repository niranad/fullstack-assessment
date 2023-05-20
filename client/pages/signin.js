import AuthForm from '@/components/AuthForm/AuthForm';
import { Paper } from '@mui/material';

export default function Signin() {
  return (
    <Paper elevation={0}>
      <AuthForm authType='Login' />
    </Paper>
  );
}
