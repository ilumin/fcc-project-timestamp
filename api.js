const dayjs = require('dayjs')
const express = require('express')

const router = express.Router()

const DATE_FORMAT = '\\d{4}-\\d{1,2}-\\d{1,2}'
const EPOCH_FORMAT = '\\d{13}'
const MILLISECOND = 1000

const showTimestamp = (input) => {
  try {
    const date = dayjs(input)
    if (!date.isValid()) throw new Error('Invalid Date')

    return {
      unix: date.unix() * MILLISECOND,
      utc: date.toLocaleString(),
    }
  } catch (err) {
    console.error({ err, input })

    return {
      error: err.message,
    }
  }
}

// route for empty
router.get(`/`, (req, res) => res.send(showTimestamp(undefined)))

// route for epoch format 
router.get(`/:epoch(${EPOCH_FORMAT})`, (req, res) => res.send(showTimestamp(parseInt(req.params.epoch))))

// route for other format
router.get(`/:other`, (req, res) => res.send(showTimestamp(req.params.other || undefined)))

module.exports = router