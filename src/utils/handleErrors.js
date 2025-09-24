const handleErrors = (err, setError, setMessageError) => {
  const responseData = err?.response?.data || err; // si no hay response.data, tomo el err completo
  const fieldErrors = responseData?.error?.fieldErrors;

  if (responseData?.statusCode === 400 && Array.isArray(fieldErrors)) {
    fieldErrors.forEach(({ field, message }) => {
      setError(field, {
        type: "server",
        message
      });
    });
  } else if (responseData?.message) {
    setMessageError(responseData.message);
  } else {
    setMessageError("Ha ocurrido un error interno. Por favor, inténtalo nuevamente.");
  }
};


const handleErrorsBasic = (err, setError) => {
    const { response } = err; 
    if (response?.data?.statusCode === 400 && response?.data?.error?.fieldErrors && Array.isArray(response.data.error.fieldErrors)) {
        setError(response.data.error.fieldErrors[0].message);
    } else if (response?.data?.statusCode === 400 && !response?.data?.error){
        setError(response?.data?.message || "Ha ocurrido un error interno. Por favor, inténtalo nuevamente.");
    }else if(response?.data?.statusCode !== 400){
        setError(response?.data?.message);
    }else{
        setError("Ha ocurrido un error interno. Por favor, inténtalo nuevamente.")
    }
}

export {
    handleErrors, 
    handleErrorsBasic, 
}