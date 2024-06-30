import { db } from "../config/firebase"
import {
  collection, CollectionReference,

  doc,
  getDocs, getDoc,
  addDoc, updateDoc, deleteDoc,
  DocumentReference,
  DocumentData,
} from "firebase/firestore"

class DatabaseService<T> {
  private collection: CollectionReference<T>

  constructor(collectionName: string) {
    this.collection = collection(db, collectionName) as CollectionReference<T>
  }

  
  async getAll(): Promise<(T & { id: string })[]> {
    try {
      const snapshot = await getDocs(this.collection)
      return snapshot.docs.map((doc) => ({
        id: doc.id, 
        ...doc.data(),
      }))
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  
  async getOne(id: string): Promise<T | undefined> {
    if (!id) return 
    
    try {
      const docRef = doc(this.collection, id)
      const snapshot = await getDoc(docRef)
      return snapshot.data()
    } catch (err) {
      console.error(err)
      throw err
    }
  }
  
  
  async getReference(documentReference: DocumentReference): Promise<DocumentData | undefined> {
    const snapshot = await getDoc(documentReference)
    const data = snapshot.data()

    if (data && documentReference.id) {
      return { ...data, uid: documentReference.id }
    }

    return data
  }

  
  async create(data: T): Promise<DocumentReference<T>> {
    try {
      return await addDoc(this.collection, data)
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  
  async update(id: string, values: Partial<T>): Promise<void> {
    try {
      const docRef = doc(this.collection, id)
      return await updateDoc(docRef, values)
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  
  async remove(id: string): Promise<void> {
    try {
      const docRef = doc(this.collection, id)
      return await deleteDoc(docRef)
    } catch (err) {
      console.error(err)
      throw err
    }
  }

}


export const UserService = new DatabaseService("users")


// export const UserCreate = async (user: User , userData: UserData | undefined) => {
//   try {
//     await setDoc(doc(db, "users", user.uid), {
//       uid: user.uid,
//       email: user.email,
//       ...userData,
//       createdAt: Timestamp.now()
//     })
//   } catch (err) {
//     console.error("Error saving user to Firestore: ", err)
//   }
// }