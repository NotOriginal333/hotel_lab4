export function getCsrfToken() {
    let csrfToken = null;
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
        const [key, value] = cookies[i].split("=");
        if (key === "csrftoken") {
            csrfToken = value;
        }
    }
    return csrfToken;
}