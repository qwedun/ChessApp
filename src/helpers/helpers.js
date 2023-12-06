export const checkPassword = (password) => {
    let regex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*_?&^])[A-Za-z\d@.#$!%*_?&]{8,30}$/;
    return password.match(regex);
}

export const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

export const playSound = (src) => {
    new Audio(src).play().catch(e => console.log(e))
}

export const chessNotationString = (y, x, color) => {
    let resString, resY, resX

    if (color === 'white')  {
        resString = 'abcdefgh';
        resX = resString[x];
        resY = 8 - y;
    } else {
        resString = 'hgfedcba'
        resX = resString[x]
        resY = 1 + y;
    }

    return `${resX}${resY}`
}
