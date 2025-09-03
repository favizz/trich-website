export function generateCode() {
    const number = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

    const letters = String.fromCharCode(
        Math.floor(Math.random() * 26) + 65,
        Math.floor(Math.random() * 26) + 65
    );

    return `TB-${number}${letters}`;
}