const dayjs = require('dayjs')
const express = require('express')

const router = express.Router()

const DATE_FORMAT = '\\d{4}-\\d{1,2}-\\d{1,2}'
const EPOCH_FORMAT = '\\d{13}'
const MILLISECOND = 1000

const showTimestamp = (input) => {
  const date = dayjs(input)

  return {
    unix: date.unix() * MILLISECOND,
    utc: date.toLocaleString(),
  }
}

// route for date format
router.get(`/:date(${DATE_FORMAT})`, (req, res) => res.send(showTimestamp(req.params.date)))

// route for epoch format 
router.get(`/:epoch(${EPOCH_FORMAT})`, (req, res) => res.send(showTimestamp(parseInt(req.params.epoch))))

// other failed
router.get(`/*`, (req, res) => res.status(400).send({
  error: true,
  error_message: 'invalid date format (only yyyy-mm-dd or epoch allowed)',
  params: req.params,
}))

module.exports = router