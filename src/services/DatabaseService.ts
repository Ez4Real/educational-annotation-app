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

      const doc = querySnapshot.docs[0]
      return { docId: doc.id, ...doc.data() } as T
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  
  async getOneByAccessKey(accessKey: string) {
    try {
      const querySnapshot = await getDocs(
        query(this.collection, where("access_key", "==", accessKey))
      )

      const doc = querySnapshot.docs[0]
      return { docId: doc.id, ...doc.data() } as T
    } catch (err) {
      console.error(err)
    }
  }
  

  async getReferenceById(id: string): Promise<DocumentReference<T>> {
    try {
      return doc(this.collection, id)
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async getDocumentById(id: string): Promise<T | void> {
    try {
      const docRef = doc(this.collection, id);
      const docSnap = await getDoc(docRef);  
      return { docId: docSnap.id, ...docSnap.data() } as T
    } catch (err) {
      console.error(err);
      throw err;
    }
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

const UserService = new DatabaseService("users")
const QuizService = new DatabaseService("quizzes")

export { UserService, QuizService };
