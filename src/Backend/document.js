/*
  VERSION:              Robin Trachsel
  DATE:                 19.08.2024
  DESCRIPTION:          File to handle the download of documents (stored in ./documents)
*/

const express = require('express')
const router = express.Router()

const fs = require('fs')
const path = require('path')

const documentsPath = path.join(__dirname, 'documents')

router.get('', (req, res) => {
    const files = fs.readdirSync(documentsPath)
    res.json(files)
})

router.get('/:filename', (req, res) => {
    const filename = req.params.filename
    const filePath = path.join(documentsPath, filename)

    if (fs.existsSync(filePath)) {
        res.download(filePath)
    } else {
        res.status(404).send({ error: 'Document not found' })
    }
})

module.exports = [
    router
]
