export function getApi() {
    return "http://localhost:8080/api";
}

export async function getUserDTO(token) {
    return fetch(getApi() + "/get/userDTO", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    }).then((res) => res.json())
}