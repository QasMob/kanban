import React from 'react'
import {createContext, useContext, useState, useEffect} from 'react'
import {auth, db} from '../firebase'
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth'
import {doc, getDoc, setDoc, addDoc, collection, getDocs, deleteDoc} from 'firebase/firestore'
import {v4 as uuidv4} from 'uuid'

const AuthContext = createContext()

export function useAuth(){
  return useContext(AuthContext)
}


export function AuthProvider({children}) {

const [globalUser, setGlobalUser] = useState(null)
const [globalData, setGlobalData] = useState([])
const [isLoading, setIsLoading] = useState(true)



function signIn(email, password){
  return signInWithEmailAndPassword(auth, email, password)
}

function signUp(email, password){
  return createUserWithEmailAndPassword(auth, email, password)
}


// tasks -> userid -> subcollection -> indivisual docs

 async function addData(Title, Description, Date, Status){
  const docRef = await addDoc(collection(db, 'tasks', globalUser.uid, 'userTask'),{
    Title,
    Description,
    Date,
    Status,
  })
  return docRef.id
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

async function deleteTask(userId, taskId){
  const docRef = doc(db, 'tasks', userId, 'userTask', taskId)
  await deleteDoc(docRef)
}

async function fetchUserData(uid){
  const docRef = collection(db, 'tasks', uid, 'userTask')
  const taskSnapShot = await getDocs(docRef)
  const tasks = taskSnapShot.docs.map(doc => ({id:doc.id, ...doc.data()}))
  setGlobalData(tasks || [])
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

      const taskCol = collection(db, 'tasks', user.uid, 'userTask')
      const taskSnapshot = await getDocs(taskCol)

      const tasks = taskSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))


      let firebaseData = {}

      if (tasks.length > 0){
        firebaseData = tasks
      }

      setGlobalData(firebaseData || [])


    } catch(err){
      console.error(err)
    } finally{
      setIsLoading(false)
    }


  })


  return () => unsubscribe()


}, [])


const value = {signIn, signUp, addData,deleteTask, logout, fetchUserData, globalUser, globalData, setGlobalData, isLoading}




  return <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
}
