const { Router } = require('express')

const { Quiz } = require('../../models')

const QuestionRouteur = require('./questions')

const router = new Router()

router.use('/:quizId/questions', QuestionRouteur)

router.get('/', (req, res) => {
  try {
    res.status(200).json(Quiz.get())
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:quizId', (req, res) => {
  try {
    console.log(req.params.quizId)
    res.status(200).json(Quiz.getById(req.params.quizId))
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', (req, res) => {
  try {
    const quiz = Quiz.create({ ...req.body })
    res.status(201).json(quiz)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.delete('/:quizId', (req, res) => {
  try {
    console.log(req.params.quizId)
    res.status(200).json(Quiz.delete(req.params.quizId))
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put('/:quizId', (req, res) => {
  try {
    console.log(req.body)
    res.status(200).json(Quiz.update(req.body))
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
