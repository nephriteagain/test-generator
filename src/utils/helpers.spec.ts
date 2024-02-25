import { ChangeEvent, DragEvent } from "react";
import { checkScrollHeight, isHTMLElement, resetOpacityElement, convertToRoman } from "./helpers";


describe('helpers', () => {

    describe('checkScrollHeight', () => {
        
        it('should increment the row when scrollheight > clientheight', () => {
            const e = {
                currentTarget: {
                    rows: 5,
                    scrollHeight: 100,
                    clientHeight: 99,
                    
                }
            } as any as ChangeEvent<HTMLTextAreaElement>

            checkScrollHeight(e)
            expect(e.currentTarget.rows).toEqual(6)
        });

        it('should NOT increment the row when scrollHeight <= clientHeight', () => {
            const e = {
                currentTarget: {
                    rows: 5,
                    scrollHeight: 100,
                    clientHeight: 100,
                    
                }
            } as any as ChangeEvent<HTMLTextAreaElement>

            checkScrollHeight(e)
            expect(e.currentTarget.rows).toEqual(5)
        });


    })


    describe('isHTMLElement', () => {
        it('should return true', () => {
            const isTrue = isHTMLElement({style: {}})
            expect(isTrue).toBeTruthy()
        });
        it('should return false', () => {
            const isTrue = isHTMLElement({})
            expect(isTrue).toBeFalsy()
        });
    });

    describe('resetOpacityElement', () => {
        const e = {} as any;
        const element = {
            parentElement: {
                childNodes: [
                    {style: {
                        opacity: '0'
                    }}
                ]
            }
        } as any as HTMLDivElement
        it('should change the opacity to 1', () => {
            resetOpacityElement(e, element)
            element.parentElement?.childNodes.forEach(child => {
                //@ts-ignore
                expect(child.style.opacity).toBe('1')
            })
        });
    });


    describe('convertToRoman', () => {
        
        it('should convert 10 to roman', () => {
            const roman = convertToRoman(10)
            expect(roman).toBe('X')
        });

        it('should convert 3999 to roman', () => {
            const roman = convertToRoman(3999);
            expect(roman).toBe('MMMCMXCIX');
        });
    
        it('should convert 1984 to roman', () => {
            const roman = convertToRoman(1984);
            expect(roman).toBe('MCMLXXXIV');
        });
    
        it('should convert 450 to roman', () => {
            const roman = convertToRoman(450);
            expect(roman).toBe('CDL');
        });
    
        it('should convert 888 to roman', () => {
            const roman = convertToRoman(888);
            expect(roman).toBe('DCCCLXXXVIII');
        });
    
        it('should convert 50 to roman', () => {
            const roman = convertToRoman(50);
            expect(roman).toBe('L');
        });

    });
    
});