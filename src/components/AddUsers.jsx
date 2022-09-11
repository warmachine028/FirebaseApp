import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore"
import { Card, Form, Button, Alert } from "react-bootstrap"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { db } from "../firebase"

const AddUsers = () => {
	const [users, setUsers] = useState([])
	const collectionRef = collection(db, "users")
	const nameRef = useRef()
	const ageRef = useRef()
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)

	const handleSubmit = async event => {
		event.preventDefault()
		setLoading(true)
		setError()
		await addDoc(collectionRef, {
			name: nameRef.current.value,
			age: ageRef.current.value,
		})
		setLoading(false)
	}
	const incrementAge = async (id, age) => {
		const userDoc = doc(db, "users", id)
		const fields = { age: age + 1 }
		await updateDoc(userDoc, fields)
	}
	const decrementAge = async (id, age) => {
		const userDoc = doc(db, "users", id)
		const fields = { age: age - 1 }
		await updateDoc(userDoc, fields)
	}
	const deleteUser = async id => {
		const userDoc = doc(db, "users", id)
		await deleteDoc(userDoc)
	}

	useEffect(() => {
		const getUsers = async () => {
			const data = await getDocs(collectionRef)
			setUsers(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
		}
		getUsers()
	}, [collectionRef])

	return (
		<div>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">UPDATE PROFILE</h2>
					<Alert variant="danger" style={{ display: error ? "block" : "none" }}>
						{error}
					</Alert>
					<Form onSubmit={handleSubmit}>
						<div style={{ textAlign: "center" }}>
							{users.map(({ id, name, age }) => (
								<div key={id} style={{ margin: 4, display: "flex", justifyContent: "space-between" }}>
									<h5>
										Name: {name}, Age: {age}
									</h5>
									<div style={{ display: "flex", width: "38%", justifyContent: "space-between" }}>
										<Button onClick={() => incrementAge(id, age)} variant="success">
											<i className="bi bi-plus-lg" />
										</Button>
										<Button onClick={() => decrementAge(id, age)}>
											<i className="bi bi-dash-lg" />
										</Button>
										<Button onClick={() => deleteUser(id)} variant="danger">
											<i className="bi bi-trash3" />
										</Button>
									</div>
								</div>
							))}
						</div>
						<Form.Group id="name">
							<Form.Label>Name</Form.Label>
							<Form.Control type="text" required ref={nameRef} placeholder="Enter user name" />
						</Form.Group>
						<Form.Group id="age">
							<Form.Label>Age</Form.Label>
							<Form.Control type="number" ref={ageRef} placeholder="Enter Age" />
						</Form.Group>
						<Button type="submit" className="w-100 mt-2" disabled={loading}>
							ADD USER
						</Button>
					</Form>
				</Card.Body>
			</Card>
			<div className="w-100 text-center  mt-2">
				<Link to="/">Go back</Link>
			</div>
		</div>
	)
}

export default AddUsers
