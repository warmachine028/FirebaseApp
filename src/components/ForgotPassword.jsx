import { useRef, useState } from "react"
import { Card, Form, Button, Alert } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const ForgotPassword = () => {
	const emailRef = useRef()
	const { resetPassword } = useAuth()
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState("")

	const handleSubmit = async event => {
		event.preventDefault()

		setError()
		setMessage()
		try {
			setLoading(true)
			await resetPassword(emailRef.current.value)
			setMessage("Check your inbox for further instructions.")
		} catch (error) {
			console.log(error)
			setError("Failed to reset password")
		}
		setLoading(false)
	}

	return (
		<div>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">ACCOUNT RECOVERY</h2>
					<Alert variant="danger" style={{ display: error ? "block" : "none" }}>
						{error}
					</Alert>
					<Alert variant="success" style={{ display: message ? "block" : "none" }}>
						{message}
					</Alert>
					<Form onSubmit={handleSubmit}>
						<Form.Group id="email">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" required ref={emailRef} />
						</Form.Group>
						<Button type="submit" className="w-100 mt-2" disabled={loading}>
							RESET PASSWORD
						</Button>
					</Form>
					<div className="w-100 text-center  mt-2">
						<Link to="/login">Login</Link>
					</div>
				</Card.Body>
			</Card>
			<div className="w-100 text-center  mt-2">
				Need an account?
				<Link to="/signup">SignUp</Link>
			</div>
		</div>
	)
}

export default ForgotPassword
