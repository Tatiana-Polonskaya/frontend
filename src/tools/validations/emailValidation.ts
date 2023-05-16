export default function isEmailValid(email: string): boolean {
    return !!email.match(/^\S+@\S+\.\S+$/);
}
