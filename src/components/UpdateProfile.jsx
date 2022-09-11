import { useRef, useState } from "react"
import { Card, Form, Button, Alert } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const UpdateProfile = () => {
	const emailRef = useRef()
	const passwordRef = useRef()
	const navigate = useNavigate()
	const { currentUser, updatePassword, updateEmail } = useAuth()
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)

	const handleSubmit = event => {
		event.preventDefault()
		setLoading(true)
		setError()
		const promises = []
		if (emailRef.current.value !== currentUser.email) {
			promises.push(updateEmail(emailRef.current.value))
		}
		if (passwordRef.current.value) {
			promises.push(updatePassword(passwordRef.current.value))
		}
		Promise.all(promises)
			.then(() => navigate("/"))
			.catch(() => setError("failed to update profile"))
			.finally(() => setLoading(false))
	}

	return (
		<div>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">UPDATE PROFILE</h2>
					<Alert variant="danger" style={{ display: error ? "block" : "none" }}>
						{error}
					</Alert>
					<Form onSubmit={handleSubmit}>
						<Form.Group id="email">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" required ref={emailRef} defaultValue={currentUser.email} />
						</Form.Group>
						<Form.Group id="password">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" ref={passwordRef} placeholder="Leave blank to retain password" />
						</Form.Group>
						<Button type="submit" className="w-100 mt-2" disabled={loading}>
							UPDATE
						</Button>
					</Form>
				</Card.Body>
			</Card>
			<div className="w-100 text-center  mt-2">
				<Link to="/">Cancel</Link>
			</div>
		</div>
	)
}

export default UpdateProfile
