import { useRef, useState } from "react"
import { Card, Form, Button, Alert } from "react-bootstrap"
import { useAuth } from "../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"
const Signup = () => {
	const emailRef = useRef()
	const passwordRef = useRef()
	const repeatPasswordRef = useRef()
	const { signUp } = useAuth()
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	const handleSubmit = async event => {
		event.preventDefault()
		// Validation checks
		if (passwordRef.current.value !== repeatPasswordRef.current.value) {
			return setError("Passwords don't match")
		}

		setError()
		try {
			setLoading(true)
			await signUp(emailRef.current.value, passwordRef.current.value)
			navigate('/')
		} catch {
			setError("Failed to create an account")
		}
		setLoading(false)
	}

	return (
		<div>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">SIGN UP</h2>
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
						<Form.Group id="password-confirm">
							<Form.Label>Repeat Password</Form.Label>
							<Form.Control type="password" required ref={repeatPasswordRef} />
						</Form.Group>
						<Button type="submit" className="w-100 mt-2" disabled={loading}>
							SIGNUP
						</Button>
					</Form>
				</Card.Body>
			</Card>
			<div className="w-100 text-center  mt-2">
				Already have an account?
				<Link to="/login">Login</Link>
			</div>
		</div>
	)
}

export default Signup
