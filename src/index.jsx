import React, { useState } from 'react'
import App from './App'
import {createContext} from "react"
import ReactDOM from "react-dom/client"

export const UserContext = createContext(null);

const UserProvider = ({children})=>{
	const [authentication, setAuthentication] = useState(false);
	const [user, setUser] = useState({});
	const [cart, setCart] = useState({});
	const globalStateValue = {
		authentication, 
		setAuthentication, 
		user, 
		setUser, 
		cart,
		setCart
	}
	
	return(
		<UserContext.Provider value={globalStateValue}>
			{children}
		</UserContext.Provider>
	)
}

ReactDOM.createRoot(document.getElementById('root')).render(
	<UserProvider>
		<App />
	</UserProvider>
)