import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Google } from "@mui/icons-material"
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import { startLoginWithEmailPassword, startGoogleSignIn } from '../thunk'

const formData = {
  email: '',
  password: '',
}

const formValidations = {
  email: [ (value) => value.includes('@'), 'El correo debe de tener una @'],
  password: [ (value) => value.length >= 6, 'El password debe de tener más de 6 letras.']
}


export const LoginPage = () => {
  // Me traigo status del store
  const { status, errorMessage } = useSelector( state => state.auth )

  const dispatch = useDispatch()

  // const { email, password, onInputChange } = useForm({
  //   email: '',
  //   password:''
  // })

  // Este state es para saber si el formulario a sido enviado o no. Se utiliza para que al cargar la pagina la primera vez no aparezca con errores el formulario.
  const [formSubmited, setFormSubmited] = useState(false)

  // Funcion para sabes si el status del login ha cambiado, para deshabilitar los botones de login abajo
  const isAuthenticating = useMemo( () => status === 'checking', [status])

  const{
    formState, email, password, onInputChange,
    isFormValid, emailValid, passwordValid,
  } = useForm(formData, formValidations)

  const onSubmit = ( event ) => {
    event.preventDefault()
    // Este state cambia a true para saber que
    setFormSubmited(true)
    // Si el formulario no es valido sale
    if( !isFormValid ) return
    
    dispatch( startLoginWithEmailPassword({ email, password }) ) 

    // dispatch( checkingAuthentication() )
  }
  
  const onGoogleSignIn = () => {

    dispatch( startGoogleSignIn() )
  }

  return (
    <AuthLayout title='Login'>

      <form
        onSubmit={ onSubmit }
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid item xs={ 12 } sx={{ mt: 2 }}>
            <TextField 
              label="Correo" 
              type="email" 
              placeholder="correo@google.com" 
              fullWidth 
              name='email'
              value={ email }
              onChange={ onInputChange } 
              error={ !!emailValid && formSubmited }
              helperText={ emailValid }
            />
          </Grid>

          <Grid item xs={ 12 } sx={{ mt: 2 }}>
            <TextField 
              label="Constraseña" 
              type="password" 
              placeholder="Contraseña" 
              fullWidth 
              name='password'
              value={ password }
              onChange={ onInputChange }
              error={ !!passwordValid  && formSubmited }
              helperText={ passwordValid }
            />
          </Grid>
        
          <Grid 
            container
            display={ errorMessage ? '' : 'none'}
            sx={{ mt:1 }}
          >
            <Grid 
                item 
                xs={ 12 }
            >
                <Alert severity='error'>
                  { errorMessage }
                </Alert>
            </Grid>
          </Grid>

          <Grid container spacing={ 2 } sx={{ mb:2, mt: 1 }}>
            
            <Grid item xs={ 12 } sm={ 6 }>
              <Button 
                type="submit" 
                variant="contained" 
                fullWidth
                disabled={ isAuthenticating }
              >
                Login
              </Button>
            </Grid>

            <Grid item xs={ 12 } sm={ 6 }>
              <Button 
                variant="contained" 
                fullWidth
                onClick={ onGoogleSignIn }
                disabled={ isAuthenticating }
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>

          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Link component={ RouterLink } color='inherit' to='/auth/register'>
              Crear una cuenta
            </Link>
          </Grid>

        </Grid>

      </form>

    </AuthLayout>
  )
}