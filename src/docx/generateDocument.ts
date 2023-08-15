import type { test } from '@/app/types'

import {
    Document,
    Paragraph,
    Tab,
    TextRun,
    Packer
} from 'docx'
import { saveAs } from 'file-saver'


export class TestAsDocX {    
    public document: Document;

    constructor (test: test) {
        const { units, subject, author } = test

        this.document = new Document({
            sections: [
                {
                    children: [
                        new Paragraph(subject),
                        new Paragraph(author),
                        ...units.map((unit) => {
                            const { instructions, questions } = unit

                            return new Paragraph({
                                children: [
                                    new TextRun({
                                        text: instructions,
                                        break: 1
                                    }),

                                    ...questions.map(q => {
                                        const { question, choices } = q

                                        return new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: question,
                                                    break: 1
                                                }),
                                                ...choices.map(c => {
                                                    const { choice} = c

                                                    return new Paragraph({
                                                        children: [
                                                            new TextRun({
                                                                text: choice,
                                                                break: 1
                                                            })
                                                        ]
                                                    })
                                                })
                                            ]
                                        })
                                    })
                                ]
                            })
                        })
                    ]

                    
                }
            ]
        })
    }

    download() {
        Packer.toBlob(this.document)
            .then(blob => {
                saveAs(blob, 'test.docx')
                console.log('Document created successfully')
            })
            .catch(err => {
                console.log(err)
            })
    }
}