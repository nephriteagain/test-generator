import { choice, matching, question, test, unit, unitType } from '@/types/types';
import {
    Document,
    Paragraph,
    TextRun,
    Packer,
    HeadingLevel,
    LevelFormat,
    AlignmentType,
    Table,
    TableRow,
    TableCell,
    WidthType,
    BorderStyle
} from 'docx';
import { saveAs } from 'file-saver';

import { convertToRoman } from '@/app/helpers';

// TODO: fix weird spacing on document

export class TestAsDocX {
    public document: Document;
    private subject: String;
    private num: number;
    constructor(test: test) {
        const { units, subject, author } = test;
        this.subject = test.subject;
        this.num = 0;
        
        this.document = new Document({   
            styles: {
                default: {
                    heading1: {
                        run: {
                            size: 32,
                            bold: true,
                            // italics: true,
                            color: "000000",
                        }
                    },
                    heading2: {
                        run: {
                            size: 28,
                            bold: true,
                            color: '000000'
                        }
                    },
                    
                },
            },         
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
                    {
                        reference: 'choice2',
                        levels: [
                            {
                                level: 1,
                                format: LevelFormat.LOWER_LETTER,                                
                                alignment: AlignmentType.START,
                                style: {
                                    paragraph: {
                                        indent: {
                                            left: 200
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
                                ...this.generateUnits(units)
                            ]
                        })
                        
                    ],
                },
            ],
        });
    }

    download() {
        console.log(this.document)
        Packer.toBlob(this.document)
            .then(blob => {
                saveAs(blob, `${this.subject||'test'}.docx`);
                console.log('Document created successfully');
            })
            .catch(err => {
                console.log(err);
            });
    }

    generateChoice(c: choice) : TextRun {
        const { choice } = c
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
    }

    generateChoices(choiceArr: choice[]) : TextRun[] {
        return choiceArr.map(c => {
            return this.generateChoice(c)
        })
    }

    generateQuestion(q: question, index: number, type: unitType) : Paragraph {
        // @ts-ignore
        const {question, choices } = q
        const paragraph =  new Paragraph({
            children: [
                new Paragraph({
                    spacing: {
                        after:100
                    },
                    indent: {
                        left: 500
                    },
                    text: `${type === 'Short Answer' ? '_______': ''}${index+1}. ${question.trim()}`,
                }),
            ]
       })
       if (type === 'Multiple Choice') {
            const choiceArr = this.generateChoices(choices as choice[])
            choiceArr.forEach(c => {
                paragraph.addChildElement(c)
            })
       }
       return paragraph
    }

    generateQuestions(questions: question[], type: unitType) : Paragraph[] {
        return questions.map((q,index) => {
            return this.generateQuestion(q,index,type)
        }) 
        
    }


    generateMatchingQuestions(questions: matching[], choices: matching[]) : Table {
        return new Table({
            columnWidths: [5400, 3600],
            borders: {
                top: {
                    style: BorderStyle.NONE,
                    size: 0,
                },
                bottom: {
                    style: BorderStyle.NONE,
                    size: 0,
                },
                left: {
                    style: BorderStyle.NONE,
                    size: 0,
                },
                right: {
                    style: BorderStyle.NONE,
                    size: 0,
                },
            },
            rows: [
                new TableRow({                    
                    children: [                        
                        new TableCell({                            
                            width: {
                                size: 5400,
                                type: WidthType.DXA,
                            },                        
                            children: [
                                ...questions.map((q,idx) => {
                                    return new Paragraph({
                                        text: `_____${idx+1}. ${q.item.trim()}`,
                                        spacing: {
                                            after: 100
                                        },
                                        indent: {
                                            left: 200
                                        }
                                    })
                                })
                            ],                            
                        }),
                        new TableCell({                            
                            width: {
                                size: 3600,
                                type: WidthType.DXA,
                            },
                            children: [
                                ...choices.map(c => {
                                    return new Paragraph({
                                        numbering: {
                                            reference: 'choice2',
                                            level: 1,                                                                            
                                        },
                                        text: c.item.trim(),
                                        spacing: {
                                            after: 100
                                        }
                                    })
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    }

    generateUnit(unit: unit) : Paragraph {
        const { instructions, questions, type } = unit;
        
        if (type === unitType.matching && unit.matchingUnit) {
            const { questions, choices } = unit.matchingUnit
            return new Paragraph({
                children: [
                    new Paragraph({
                        spacing: {
                            after: 200
                        },
                        text: `${convertToRoman(++this.num)} ${instructions.trim()}`
                    }),   
                    this.generateMatchingQuestions(questions, choices)                 
                ]
            })
        }

        return new Paragraph({
            children: [
                new Paragraph({
                    spacing: {
                        after: 200
                    },
                    text: `${convertToRoman(++this.num)}: ${instructions.trim()}`                                            
                }),        
                // @ts-ignore                            
                ...this.generateQuestions(questions, type)
            ],
        })
    }

    generateUnits(units: unit[]) : Paragraph[] {
        return units.map(unit => {
            return this.generateUnit(unit)
        })
    }

}
