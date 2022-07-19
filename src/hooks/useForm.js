import { useEffect, useState, useMemo } from 'react';

export const useForm = ( initialForm = {} , formValidations = {}) => {
  
    const [ formState, setFormState ] = useState( initialForm )
    const [ formValidation, setFormValidation ] = useState({})
    // Cuando hay un cambio en el formulario se ejecuta la funcion createValidators
    useEffect(() => { 
        createValidators()
    }, [ formState ])

    // Si el formulario inicial cambia entonces vuelve a llamarse este useform
    useEffect(() => {
        setFormState( initialForm )      
    }, [initialForm])
    

    // Recorre las propiedades del objeto y si tiene mensaje es que hay error, por lo qe retorna false
    const isFormValid = useMemo( () => {
        for (const formValue of Object.keys(formValidation)) {
            if( formValidation[formValue] !== null ) return false
        }

        return true
    }, [ formValidation ] )
    
    // Va agregando al state cuando hay un cambio en el formulario
    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    // Reinicia el state del formulario
    const onResetForm = () => {
        setFormState( initialForm );
    }

    // Esta funcion crea validaciones automaticas que se la pasan desde la pagina del registro
    const createValidators = () => {

        const formCheckedValues = {}
        // Recorre el objeto formValidations
        for( const formField of Object.keys( formValidations )){
            // Extrae las funciones y el mensaje de error del objeto (estas se le pasan desde la pagina del registro)
            const[ fn, errorMessage ] = formValidations[ formField ]
            // Este objeto se rellena con los nombres de los campos + 'Valid', con null o el error
            formCheckedValues[ `${formField}Valid` ] = fn( formState[formField] ) ? null : errorMessage
                                              
        }
        // Se lo pasamos al estado para devolverlo a la pagina de regitro
        setFormValidation( formCheckedValues )
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        isFormValid
    }
}