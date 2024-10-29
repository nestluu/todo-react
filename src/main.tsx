import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { store } from './store/store'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<HashRouter basename='/todo-react'>
			<Provider store={store}>
				<App />
			</Provider>
		</HashRouter>
	</React.StrictMode>
)
