export function getUsername() : string | null {
    return sessionStorage.getItem('username');
}