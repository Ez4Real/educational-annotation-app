import { db } from "../config/firebase"
import {
  collection, CollectionReference,

  doc,
  getDocs, getDoc,
  addDoc, updateDoc, deleteDoc,
  DocumentReference,
  DocumentData,
  query,
  where,
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

  
  async getOneByUid(id: string): Promise<T | void> {
    try {
      const querySnapshot = await getDocs(
        query(this.collection, where("uid", "==", id))
      )

      const userDoc = querySnapshot.docs[0]
      return { docId: userDoc.id, ...userDoc.data() } as T
    } catch (err) {
      console.error(err)
      throw err
    }
  }
  
  
  async getReference(documentReference: DocumentReference): Promise<DocumentData | void> {
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


// export const UserCreate = async (user: User , userData: UserData | void) => {
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


// export const UserGet = async (id: string) => {
//   try {
//     await getDoc(doc(db, "users", id))
//   } catch (err) {
//     console.error("Error saving user to Firestore: ", err)
//   }
// }