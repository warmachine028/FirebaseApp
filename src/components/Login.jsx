import { useRef, useState } from "react"
import { Card, Form, Button, Alert } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Login = () => {
	const emailRef = useRef()
	const passwordRef = useRef()
	const navigate = useNavigate()
	const { logIn } = useAuth()
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)

	const handleSubmit = async event => {
		event.preventDefault()
		// Validation checks

		setError()
		try {
			setLoading(true)
			await logIn(emailRef.current.value, passwordRef.current.value)
			navigate("/")
		} catch {
			setError("Failed to sign in")
		}
		setLoading(false)
	}

	return (
		<div>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">LOG IN</h2>
					<Alert variant="danger" style={{ display: error ? "block" : "none" }}>
						{error}
					</Alert>
					<Form onSubmit={handleSubmit}>
						<Form.Group id="email">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" required ref={emailRef} />
						</Form.Group>
						<Form.Group id="password">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" required ref={passwordRef} />
						</Form.Group>
						<Button type="submit" className="w-100 mt-2" disabled={loading}>
							LOGIN
						</Button>
					</Form>
				</Card.Body>
			</Card>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
				}}
			>
				<div className="w-100 text-start  mt-2">
					Need an account?
					<Link to="/signup">SignUp</Link>
				</div>
				<div className="w-100 text-end  mt-2">
					<Link to="/forgot-password">Forgot Password?</Link>
				</div>
			</div>
		</div>
	)
}

export default Login
