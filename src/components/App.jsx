import { Container } from "react-bootstrap"
import AuthProvider from "../context/AuthContext"
import Signup from "./Signup"
import Dashboard from "./Dashboard"
import Login from "./Login"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import UpdateProfile from "./UpdateProfile"
import ForgotPassword from "./ForgotPassword"

function App() {
	return (
		<AuthProvider>
			<Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
				<div className="w-100" style={{ maxWidth: 400 }}>
					<BrowserRouter>
						<Routes>
							<Route exact path="/" element={<Dashboard />} />
							<Route path="/signup" element={<Signup />} />
							<Route path="/login" element={<Login />} />
							<Route path="/update-profile" element={<UpdateProfile />} />
							<Route path="/forgot-password" element={<ForgotPassword />} />
						</Routes>
					</BrowserRouter>
				</div>
			</Container>
		</AuthProvider>
	)
}

export default App
