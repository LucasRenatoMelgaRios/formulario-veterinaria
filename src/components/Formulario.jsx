import { useState, useEffect } from "react"
import Error from "./Error";

export const Formulario = ({pacientes ,setPacientes, paciente, setPaciente }) => {

  const [nombre, setNombre] = useState('');
  
  const [propietario, setPropietario] = useState('');
  
  const [email, setEmail] = useState('');
  
  const [fecha, setFecha] = useState('');

  const [sintomas, setSintomas] = useState('');
  
  const [error, setError] = useState(false);

  
  // Reacciona al cambio del valor del estado del paciente creado en App
  useEffect(() => {
    if(Object.keys(paciente).length>0){
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    }
  }, [paciente])
  


  
  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);
    return random + fecha;
  }


  const handleSumit = (e) => {
    e.preventDefault();

    // validacion del fotmulario
    if([nombre, propietario, email, fecha, sintomas].includes('')){
      setError(true);
      return
    }


    setError(false);

    // objetos de paciente --> este objeto recive los valores de los state
    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas,
      // No agregue el id aca porque se creara uno con la funcion y si no se esta editnaod y si se esta editando se creara uno con el valor de state de paciente
    }


    if(paciente.id){
      // editando el registro
      objetoPaciente.id = paciente.id;

      const pacientesActualizados = pacientes.map( pacientState => pacientState.id === paciente.id ? objetoPaciente: pacientState);

      setPacientes(pacientesActualizados);

      setPaciente({}) //limpiamos el state de paciente

    }else{
      // nuevo registro
      objetoPaciente.id = generarId();
      setPacientes([...pacientes, objetoPaciente]);
    }


    // reiniciar el formulario
    setNombre('');
    setPropietario('');
    setEmail('');
    setFecha('');
    setSintomas('');
  }

  return (
    
    <div className='w-1/2 lg:w-2/5'>
      <h2 className='font-black text-3xl text-center'>Seguimiento pacientes</h2>

      <p className='text-lg mt-5 text-center mb-10'>
        Añade pacientes y {''}
        <span className='text-indigo-600 font-bold '>Administralos</span>  
      </p>

      <form 
      className='b-white shadow-md rounded-lg py-10 px-5 mb-10 mx-5'
      onSubmit={(e) => handleSumit(e)}
      >
        { error && <Error/>}

        <div className='mb-5'>
          <label htmlFor='mascota' className='block text-gray-700 uppercase font-bold'>
            Nombre de la Mascota
          </label>
          
          <input
           type="text"
           placeholder='Nombre de la mascota'
           className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' 
           id='mascota'
           value={nombre}
           onChange={(e)  => setNombre(e.target.value)}
           />
        </div>

        <div className='mb-5'>
          <label htmlFor='propietario' className='block text-gray-700 uppercase font-bold'>
            Nombre del propietario
          </label>

          <input
           type="text"
           placeholder='Nombre del propietario'
           className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' 
           id='propietario'
           value={propietario}
           onChange={(e)  => setPropietario(e.target.value)}
           />
        </div>

        <div className='mb-5'>
          <label htmlFor='email' className='block text-gray-700 uppercase font-bold'>
            Email
          </label>

          <input
           type="email"
           placeholder='Ingrese su email'
           className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' 
           id='email'
           value={email}
           onChange={(e)  => setEmail(e.target.value)}
           />
        </div>

        <div className='mb-5'>
          <label htmlFor='alta' className='block text-gray-700 uppercase font-bold'>
            Alta
          </label>

          <input
           type="date"
           className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' 
           id='alta'
           value={fecha}
           onChange={(e)  => setFecha(e.target.value)}
           />
        </div>

        <div className='mb-5'>
          <label htmlFor='sintomas' className='block text-gray-700 uppercase font-bold'>
            Sintomas
          </label>

         <textarea
         placeholder='describe los sintomas'
         className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
         id='sintomas'
         value={sintomas}
         onChange={(e)  => setSintomas(e.target.value)}
         />
        </div>

        <input
         type="submit"
         className='bg-indigo-600 w-full p-3  text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all'
         value={paciente.id ? 'Editar paciente' : 'Agregar paciente'} 
         />
      </form>
    </div>
  )
}
