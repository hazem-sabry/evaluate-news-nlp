import { checkURL } from '../js/checkURL';

describe('Test check url functionality', () => {
    test('Testing the checkUrl function defined or not', () => {
        expect(checkURL).toBeDefined();
    })

    test('Testing the checkUrl function return false for invalid url', () => {
        const urlRGEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
        const urlTest = 'https://google.com/'; // Accepted URL
        expect(urlRGEX.test(urlTest)).toBe(true);
        const response = checkURL(urlTest);
        expect(response).toBeDefined();
        expect(response).toBe(true);
    })

    test('Testing the checkUrl function return false for valid url', () => {
        const urlTest = 'some not valid url'; // Not accepted URL
        const response = checkURL(urlTest);
        expect(response).toBeDefined();
        expect(response).toBeFalsy();
    })
})
