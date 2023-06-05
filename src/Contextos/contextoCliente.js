import { createContext, useState } from 'react'

export const ContextoCliente = createContext(null);

export const ProvedorCliente = ({children}) => {
    const [cliente, setCliente] = useState('');

    const addCliente = (name) => {
      setCliente(name)
    }
  
    return (
        <ContextoCliente.Provider value={{
          cliente,
          addCliente
        }}>
            {children}
        </ContextoCliente.Provider>
    )
  };