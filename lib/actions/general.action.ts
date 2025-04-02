import { db } from "@/firebase/admin";

// ================================== Get Interviews By UserId =========================
export const getInterviewsByUserId = async (
  userId: string | undefined
): Promise<Interview[]> => {
  const interviews = await db
    .collection("interviews")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(), // Make sure to call data() instead of accessing it directly
  })) as Interview[];
};

// ====================================== Get All Interviews ===========================
export const getLatestInterviews = async (
  params: GetLatestInterviewsParams
): Promise<Interview[]> => {
  const { userId, limit = 20 } = params;

  const interviews = await db
    .collection("interviews")
    .orderBy("createdAt", "desc")
    .where("finalized", "==", true)
    .where("userId", "!=", userId)
    .limit(limit)
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(), // Make sure to call data() instead of accessing it directly
  })) as Interview[];
};

// ================================== Get Interviews By UserId =========================
export const getInterviewById = async (id: string): Promise<Interview> => {
  const interview = await db.collection("interviews").doc(id).get();

  return interview.data() as Interview;
};
