import { useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"

const Dashboard = () => {
	const [error, setError] = useState("")
	const { currentUser, logOut } = useAuth()
	const navigate = useNavigate()
	
	const handleLogout = async () => {
		setError("")
		try {
			await logOut()
			navigate("/login")
		} catch {
			setError("Failed to log out")
		}
	}

	return (
		<div>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">PROFILE</h2>
					<Alert variant="danger" style={{ display: error ? "block" : "none" }}>
						{error}
					</Alert>
					<strong>Email: </strong> {currentUser.email}
					<Link to="/update-profile" className="btn btn-primary w-100 mt-3">
						UPDATE PROFILE
					</Link>
				</Card.Body>
			</Card>
			<div className="w-100 text-center  mt-2">
				<Button variant="link" onClick={handleLogout}>
					Logout
				</Button>
				<Button variant="link" onClick={() => navigate("/add-users")}>
					Add Users
				</Button>
			</div>
		</div>
	)
}

export default Dashboard
