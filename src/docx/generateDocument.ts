import type { test } from '@/app/types';
import {
    Document,
    Paragraph,
    Tab,
    TextRun,
    Packer,
    HeadingLevel,
    LevelFormat,
    AlignmentType,
    BorderStyle
} from 'docx';
import { saveAs } from 'file-saver';

export class TestAsDocX {
    public document: Document;

    constructor(test: test) {
        const { units, subject, author } = test;

        this.document = new Document({            
            numbering: {
                config: [
                    {
                        reference: 'my-numbering',
                        levels: [
                            {
                                level: 2,
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
                    {
                        reference: 'my-numbering2',
                        levels: [
                            {
                                level: 1,
                                format: LevelFormat.DECIMAL,
                                alignment: AlignmentType.START,
                                style: {
                                    paragraph: {
                                        indent: {
                                            left: 500,
                                        }
                                    }
                                }                                
                            }
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
                        }),
                        new Paragraph({
                            text: author.trim(),
                            heading: HeadingLevel.HEADING_2,                                                        
                            spacing: {
                                after: 1000
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
                                                text: instructions
                                            }),                                    
                                            ...questions.map(q => {
                                                const { question, choices } = q;
        
                                                return new Paragraph({
                                                    children: [
                                                        new Paragraph({
                                                            spacing: {
                                                                after:100
                                                            },
                                                            text: question.trim(),
                                                            numbering: {
                                                                reference: 'my-numbering2',
                                                                level: 1
                                                            }
                                                        }),
                                                        ...choices.map(c => {
                                                            const { choice } = c;
        
                                                            return new TextRun({
                                                                children: [
                                                                    new Paragraph({
                                                                        text: choice.trim(),
                                                                        numbering: {
                                                                            reference: 'my-numbering',
                                                                            level: 2
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
                saveAs(blob, 'test.docx');
                console.log('Document created successfully');
            })
            .catch(err => {
                console.log(err);
            });
    }
}
