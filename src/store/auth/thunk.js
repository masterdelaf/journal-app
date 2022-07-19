import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from '../../firebase/providers'
import { checkingCredentials, logout, login } from '../auth'
import { clearNotesLogout } from '../journal'

export const checkingAuthentication = ( email , password ) => {
    return async( dispatch )=>{
        
        dispatch( checkingCredentials() )

    }
}
   
export const startGoogleSignIn = () => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() )

        const result = await singInWithGoogle()

        if( !result.ok ) return dispatch( logout( result.errorMessage ) )

        dispatch( login( result ))
        
    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async ( dispatch ) => {

        dispatch( checkingCredentials() )

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName })

        if( !ok ) return dispatch( logout({ errorMessage }) )

        dispatch( login({ uid, displayName, email, photoURL }))
    }
}

export const startLoginWithEmailPassword = ({ email, password }) => {
    return async ( dispatch ) => {
        
        // Pongo el estado en estado de "Checkeando"
        dispatch( checkingCredentials() )

        const result = await loginWithEmailPassword({ email, password })

        if( !result.ok ) return dispatch( logout( result ) )

        dispatch( login( result ))

    }


}

export const startLogout = () => {
    return async( dispatch ) => {

        await logoutFirebase()

        dispatch( clearNotesLogout() )
        dispatch( logout() )
    }
}
                            