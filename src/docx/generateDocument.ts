import type { test } from '@/app/types';
import {
    Document,
    Paragraph,
    TextRun,
    Packer,
    HeadingLevel,
    LevelFormat,
    AlignmentType,
} from 'docx';
import { saveAs } from 'file-saver';

import { convertToRoman } from '@/app/helpers';


export class TestAsDocX {
    public document: Document;
    private subject: String;
    constructor(test: test) {
        const { units, subject, author } = test;
        this.subject = test.subject;
        let num = 0;
        
        this.document = new Document({            
            numbering: {
                config: [
                    {
                        reference: 'choice',
                        levels: [
                            {
                                level: 1,
                                format: LevelFormat.LOWER_LETTER,                                
                                alignment: AlignmentType.START,
                                style: {
                                    paragraph: {
                                        indent: {
                                             left: 1000,
                                        }
                                    }
                                }
                            },               
                        ]
                    },                 
                ]
            },
            sections: [
                {
                    children: [
                        new Paragraph({
                            text: subject.trim(),
                            heading: HeadingLevel.HEADING_1,
                            spacing: {
                                before: 100,
                                after: 100
                            }
                        }),
                        new Paragraph({
                            text: author.trim(),
                            heading: HeadingLevel.HEADING_2,                                                        
                            spacing: {
                                after: 800
                            }   
                        }),
                        new Paragraph({
                            children : [
                                ...units.map((unit) => {
                                    const { instructions, questions } = unit;
        
                                    return new Paragraph({
                                        children: [
                                            new Paragraph({
                                                spacing: {
                                                    after: 200
                                                },
                                                text: `${convertToRoman(++num)}: ${instructions.trim()}`
                                            }),                                    
                                            ...questions.map((q,index) => {
                                                console.log(index)
                                                const { question, choices } = q;                                        
                                                return new Paragraph({
                                                    children: [
                                                        new Paragraph({
                                                            spacing: {
                                                                after:100
                                                            },
                                                            text: `${index+1}. ${question.trim()}`,
                                                        }),
                                                        ...choices.map(c => {
                                                            const { choice } = c;
                                                            return new TextRun({
                                                                children: [
                                                                    new Paragraph({
                                                                        text: choice.trim(),
                                                                        numbering: {
                                                                            reference: 'choice',
                                                                            level: 1,                                                                            
                                                                        }
                                                                    }),
                                                                ],
                                                            });
                                                        }),
                                                    ],
                                                });
                                            }),
                                        ],
                                    });
                                }),
                            ]
                        })
                        
                    ],
                },
            ],
        });
    }

    download() {
        Packer.toBlob(this.document)
            .then(blob => {
                saveAs(blob, `${this.subject||'test'}.docx`);
                console.log('Document created successfully');
            })
            .catch(err => {
                console.log(err);
            });
    }
}
