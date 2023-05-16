export default function isPasswordValid(password: string): boolean {
    return !password.match(
        /^(.{0,7}|[^A-Z]*|[^a-z]*|[^0-9~!@#$%^&*_\-+=`|\\(){}[\]:;'"<>,.?/]*)$/
    );
}
