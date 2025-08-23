export const formatPrice = (number) => {
    const numberString = number.toString();
    const [integerPart, decimalPart = ""] = numberString.split(".");
    const reversedInteger = integerPart.split("").reverse().join("");

    let formattedInteger = "";
    for (let i = 0; i < reversedInteger.length; i++) {
        if (i > 0 && i % 3 === 0) {
            formattedInteger += ".";
        }
        formattedInteger += reversedInteger[i];
    }

    formattedInteger = formattedInteger.split("").reverse().join("");
    const formattedNumber = `${formattedInteger}${
        decimalPart ? "." + decimalPart : ""
    }`;
    return formattedNumber;
};