import { handleSubmit } from '../js/formHandler'

describe('Test, ensures the function "handleSubmit()" exists', () => {
    test('It should return true', () => {
        expect(handleSubmit).toBeDefined();
    });
});

describe('Test, ensures the function "handleSubmit()" is a function', () => {
    test('It should be a function', () => {
        expect(typeof handleSubmit).toBe('function')
    })
})
