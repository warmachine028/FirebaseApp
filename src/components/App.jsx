import { Container } from "react-bootstrap"
import AuthProvider from "../context/AuthContext"
import Signup from "./Signup"
import Dashboard from "./Dashboard"
import Login from "./Login"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import UpdateProfile from "./UpdateProfile"
import ForgotPassword from "./ForgotPassword"
import AddUsers from "./AddUsers"
import PrivateRoute from "./PrivateRoute"
import AuthRoute from "./AuthRoute"

const App = () => {
	return (
		<AuthProvider>
			<Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
				<div className="w-100" style={{ maxWidth: 400 }}>
					<BrowserRouter>
						<Routes>
							<Route path="/signup" element={<AuthRoute component={<Signup />} />} />
							<Route path="/login" element={<AuthRoute component={<Login />} />} />
							<Route path="/forgot-password" element={<AuthRoute component={<ForgotPassword />} />} />
							<Route path="/" element={<PrivateRoute component={<Dashboard />} />} />
							<Route path="/update-profile" element={<PrivateRoute component={<UpdateProfile />} />} />
							<Route path="/add-users" element={<PrivateRoute component={<AddUsers />} />} />
						</Routes>
					</BrowserRouter>
				</div>
			</Container>
		</AuthProvider>
	)
}

export default App
