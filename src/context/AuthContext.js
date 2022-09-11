import { createContext, useContext, useState, useEffect } from "react"
import { onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth"
import { auth } from "../firebase"
import { updateEmail as updateEmailFirebase, updatePassword as updatePasswordFirebase } from "firebase/auth"

const AuthContext = createContext()
export const useAuth = () => {
	return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null)
	const [loading, setLoading] = useState(true)

	const signUp = (email, passwd) => {
		return createUserWithEmailAndPassword(auth, email, passwd)
	}

	const logIn = (email, passwd) => {
		return signInWithEmailAndPassword(auth, email, passwd)
	}

	const logOut = () => {
		return signOut(auth)
	}
	const resetPassword = email => {
		return sendPasswordResetEmail(auth, email)
	}
	const updateEmail = email => {
		return updateEmailFirebase(currentUser, email)
	}
	const updatePassword = passwd => {
		return updatePasswordFirebase(currentUser, passwd)
	}
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, user => {
			setCurrentUser(user)
			setLoading(false)
		})
		return unsubscribe
	}, [])

	const value = { currentUser, signUp, logIn, logOut, resetPassword, updateEmail, updatePassword }
	return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

export default AuthProvider
