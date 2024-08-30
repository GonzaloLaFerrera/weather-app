// console.log(import.meta.env.VITE_API_KEY) --> Prueba de implementación correcta de la API KEY

import { LoadingButton } from "@mui/lab";
import { Box, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";

const API_WEATHER = `https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_API_KEY}&lang=es&q=`

const App = () => { 

  //Estado para el manejo de la data del input
  const [city, setCity] = useState('');

  //Estado para el manejo de la 'Carga'
  const [loading, setLoading] = useState(false);
  
  //Estado para el manejo de errores
  const [error, setError] = useState({
    error: false,
    message: ''
  })
  
  //Estado para mostrar toda la data que viene de la API
  const [weatherData, setWeatherData] = useState({
    city:'',
    country:'',
    temp:'',
    condition:'',
    icon:'',
    conditionText:''
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Submitted'); //solo para chequear el envio del formulario
    setLoading(true);
    setError({
      error: false,
      message:''
    });
    try {
      if(!city.trim()) throw { message: 'El campo ciudad es obligatorio!'}
      const response = await fetch(`${API_WEATHER}${city}`) //hacemos el fetch con la URL base y lo que ingreso el usuario en el Input (city)
      const data = await response.json();

      //Es el error en Inglés que viene del BackEnd
      if(data.error) throw { message: data.error.message }; 
      
      //Validación personalizada teniendo en cuenta el código del error que manda el BackEnd
      // if(data.error.code === 1006) throw { message: 'No existe esa locación en la base de datos'}
      //(no funciona correctamente, da un error cuando vuelvo a ingresar data en el input aunque sea correcta)

      console.log(data)
      
      setWeatherData({
        city: data.location.name,
        country: data.location.country,
        temperature: data.current.temp_c,
        condition: data.current.condition.code,
        conditionText: data.current.condition.text,
        icon: data.current.condition.icon,
      });
      
    } catch (error) {
      console.log(error)
      setError({
        error: true,
        message: error.message
      })
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{ mt: 2 }}
    >
      <Typography
        variant="h3"
        component='h1'
        align="center"
        gutterBottom
      >
        My Weather App with MUI!
      </Typography>
      <Box
        component='form'
        autoComplete="off"
        onSubmit={onSubmit}
        sx={{ display: "grid", gap: 2 }}
      >
        <TextField 
          id="city"
          label="Ciudad"
          variant="outlined"
          size="small"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          fullWidth
          error={error.error}
          helperText={error.message}
        />
        <LoadingButton
          type="submit"
          variant="contained"
          loading={loading}
          loadingIndicator="Cargando..."
        >
          Buscar
        </LoadingButton>
      </Box>

      {/* Aca mostraremos la data resultante de la busqueda */}
      <Box
        sx={{
          mt: 2,
          display: 'grid',
          gap: 2,
          textAlign: 'center'
        }}
      >
        <Typography
          variant="h4"
          component='h2'
        >
          {weatherData.city}, {weatherData.country}
        </Typography>
      
        <Box
          component='img'
          alt={weatherData.conditionText}
          src={weatherData.icon}
          sx={{ margin: "0 auto"}}
        />

        <Typography 
          variant="h5"
          component='h3'
        >
          {weatherData.temperature} °C
        </Typography>

        <Typography 
          variant="h6"
          component='h4'
        >
          {weatherData.conditionText}
        </Typography>
      </Box>


      <Typography
        textAlign="center"
        sx={{ mt: 2, fontSize: "10px" }}
      >
        Powered by:{" "}
        <a
          href="https://www.weatherapi.com/"
          title="Weather API"
        >
          WeatherAPI.com
        </a>
      </Typography>
    </Container>
  )
}

export default App;