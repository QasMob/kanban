import React from 'react'
import {createContext, useContext, useState, useEffect} from 'react'
import {auth, db} from '../firebase'
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth'
import {doc, getDoc} from 'firebase/firestore'

const AuthContext = createContext()

export function useAuth(){
  return useContext(AuthContext)
}


export function AuthProvider({children}) {

const [globalUser, setGlobalUser] = useState(null)
const [globalData, setGlobalData] = useState(null)
const [isLoading, setIsLoading] = useState(true)



function signIn(email, password){
  return signInWithEmailAndPassword(auth, email, password)
}

function signUp(email, password){
  return createUserWithEmailAndPassword(auth, email, password)
}

async function logout(){
    try {
      setGlobalUser(null)
      setGlobalData(null)
      await signOut(auth)
    } catch(err){
      console.error(err)
    }
}

useEffect(() => {

  const unsubscribe = onAuthStateChanged(auth, async (user) => {

    if (!user){
      setGlobalUser(null)
      setGlobalData(null)
      setIsLoading(false)
      return
    }

    setGlobalUser(user)
    
    try { 

      const docRef = doc(db, 'tasks', user.uid)
      const docSnap = await getDoc(docRef)


      let firebaseData = {}

      if (docSnap.exists()){
        firebaseData = docSnap.data()
      }

      setGlobalData(firebaseData)


    } catch(err){
      console.error(err)
    } finally{
      setIsLoading(false)
    }



  })


  return () => unsubscribe()


}, [])


const value = {signIn, signUp, logout, globalUser, globalData, setGlobalData, isLoading}




  return <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
}
