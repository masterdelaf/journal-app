import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import { startCreatingUserWithEmailPassword } from '../../store/auth'
import { useMemo } from 'react'

const formData = {
  email: '',
  password: '',
  displayName: ''
}

const formValidations = {
  email: [ (value) => value.includes('@'), 'El correo debe de tener una @'],
  password: [ (value) => value.length >= 6, 'El password debe de tener más de 6 letras.'],
  displayName: [ (value) => value.length >= 1, 'El nombre es obligatorio.'],
}

export const RegisterPage = () => {

  const dispatch = useDispatch()

  const { status, errorMessage } = useSelector( state => state.auth )
  // Solo se renderiza cuando hay un cambio en status con useMemo
  const isCheckingAuthentication =  useMemo( () => status === 'checking', [status])

  // Este state es para saber si el formulario a sido enviado o no. Se utiliza para que al cargar la pagina la primera vez no aparezca con errores el formulario.
  const [formSubmited, setFormSubmited] = useState(false)

  // Destructuring de las funciones y estados de useForm
  const{
      formState, displayName, email, password, onInputChange,
      isFormValid, displayNameValid, emailValid, passwordValid,
  } = useForm(formData, formValidations)


  const onSubmit = (e) => {
    e.preventDefault()
    // Este state cambia a true para saber que
    setFormSubmited(true)
    // Si el formulario no es valido sale
    if( !isFormValid ) return

    dispatch( startCreatingUserWithEmailPassword(formState) )
  }

  return (
    <AuthLayout title='Login'>

      <form
        onSubmit={ onSubmit }
      >
        <Grid container>
          <Grid item xs={ 12 } sx={{ mt: 2 }}>
            <TextField 
              label="Nombre completo" 
              type="text" 
              placeholder="Nombre completo" 
              fullWidth
              name="displayName"
              value={ displayName }
              onChange= { onInputChange } 
              error={ !!displayNameValid  && formSubmited } // Si el displayName no es valido y el formulario se ha enviado
              helperText={ displayNameValid }
            />
          </Grid>

          <Grid item xs={ 12 } sx={{ mt: 2 }}>
            <TextField 
              label="Correo" 
              type="email" 
              placeholder="correo@google.com" 
              fullWidth 
              name="email"
              value={ email }
              onChange= { onInputChange }  
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
              name="password"
              value={ password }
              onChange= { onInputChange }
              error={ !!passwordValid  && formSubmited }
              helperText={ passwordValid }
            />
          </Grid>

          <Grid container spacing={ 2 } sx={{ mb:2, mt: 1 }}>
            
            <Grid item xs={ 12 }>
              <Button 
                variant="contained"
                fullWidth
                type="submit"  
                disabled={ isCheckingAuthentication }
              >
                Crear cuenta
              </Button>
            </Grid>
            <Grid 
              item 
              xs={ 12 }
              display={ errorMessage ? '' : 'none'}
            >
              <Alert severity='error'>
                { errorMessage }
              </Alert>
            </Grid>

          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
            <Link component={ RouterLink } color='inherit' to='/auth/login'>
              Iniciar sesion
            </Link>
          </Grid>

        </Grid>

      </form>

    </AuthLayout>
  )
}