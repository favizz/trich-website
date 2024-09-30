import { db } from "@/config/firebase";
import { collection, getDocs, updateDoc, doc  } from "firebase/firestore";

export default async function handler(req, res) {
    try {
        const orderIdCollection = collection(db, "order_id");
    
        const querySnapshot = await getDocs(orderIdCollection);
    
        if (!querySnapshot.empty) {
          const docSnapshot = querySnapshot.docs[0];
          const data = docSnapshot.data();
          const currentOrderId = data.order_id;

          const newOrderId = currentOrderId + 1;

        // dateDoc("wITvD6dxf82hQoRHkkka", { order_id: newOrderId });  await up

          res.status(200).json({ order_id: currentOrderId });
        } else {
          res.status(404).json({ error: "No order_id found" });
        }
      } catch (error) {
        console.error("Error fetching and updating order_id:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
}
