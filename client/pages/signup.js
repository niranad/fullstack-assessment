import AuthForm from "@/components/AuthForm/AuthForm";
import { Paper } from "@mui/material";

export default function Signup() {
  return (
    <Paper elevation={0}>
      <AuthForm authType='Sign up' />
    </Paper>
  )
}
