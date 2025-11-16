import { auth } from "@/config/firebase";

export const getUserData = async () => {
  const currentUserID = auth?.currentUser?.uid;
  if (!currentUserID) {
    console.error("Current user ID is undefined.");
    return;
  }

  try {
    const response = await fetch("/api/get-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_BASE_KEY}`,
      },
      body: JSON.stringify({ currentUserID }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("User data found", data.user);
      return data.user;
    } else {
      const errorData = await response.json();
      console.log("Error:", errorData.error);
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};
