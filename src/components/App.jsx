import { Container } from "react-bootstrap"
import AuthProvider, { useAuth } from "../context/AuthContext"
import Signup from "./Signup"
import Dashboard from "./Dashboard"
import Login from "./Login"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import UpdateProfile from "./UpdateProfile"
import ForgotPassword from "./ForgotPassword"
import AddUsers from "./AddUsers"
import { Navigate } from "react-router-dom"
const App = () => {
	const { currentUser } = useAuth()

	return (
		<AuthProvider>
			<Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
				<div className="w-100" style={{ maxWidth: 400 }}>
					<BrowserRouter>
						<Routes>
							<Route exact path="/" element={currentUser ? <Dashboard /> : <Navigate to="/login" />} />
							<Route path="/signup" element={<Signup />} />
							<Route path="/login" element={<Login />} />
							<Route path="/update-profile" element={<UpdateProfile />} />
							<Route path="/forgot-password" element={<ForgotPassword />} />
							<Route path="/add-user" element={<AddUsers />} />
						</Routes>
					</BrowserRouter>
				</div>
			</Container>
		</AuthProvider>
	)
}

export default App
