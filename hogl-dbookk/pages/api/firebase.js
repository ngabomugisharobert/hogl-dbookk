import { db } from "../../services/firebase-config";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (_req, res) => {
  const visitorRef = await db.collection("visitors");
  const snapshot = await visitorRef.get();
  const visitors = snapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
  res.status(200).json(visitors);
}