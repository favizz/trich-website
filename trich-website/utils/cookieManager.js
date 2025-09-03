import { getCookie, setCookie } from "cookies-next";

export function getCredentials() {
    const raw = getCookie("trich_credential")
    
    if (typeof raw === "string") {
        try {
            const parsed = JSON.parse(raw)
            return {
                phone_number: parsed.phone_number,
                full_name: parsed.full_name,
                point: parsed.point,
                is_member: parsed.is_member
            }
        } catch (err) {
            console.error("Invalid trich_credential cookie format", err)
        }
    }
    
    return null
}

export function setCredentials(phoneNumber, fullName, points, isMember) {
    setCookie(
        "trich_credential",
        JSON.stringify({ 
            phone_number: phoneNumber, 
            full_name: fullName, 
            point: points, 
            is_member: isMember 
        }),
        {
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        }
    )
}
  
export function clearCredentials() {
    setCookie("trich_credential", "", { maxAge: -1, path: "/" })
}