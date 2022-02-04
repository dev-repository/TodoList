const express = require("express");
const Joi = require("joi");

// models
const Todo = require("../models/todo");

const router = express.Router();

const schema = Joi.object().keys({
  text: Joi.string().required(),
});

// 리스트
router.get("/", async (req, res, next) => {
  const todos = await Todo.findAll();
  res.json(todos);
});

// 등록
router.post("/", async (req, res) => {
  const value = schema.validate(req.body);
  if (value.error) {
    return res.status(400).json({
      error: value.error.details[0].message,
    });
  }

  const { text } = value.value;

  const todo = await Todo.create({
    text,
  });

  res.status(201).json(todo);
});

// 상세
router.get("/:id", async (req, res) => {
  const todo = await Todo.findByPk(req.params.id);
  if (!todo) {
    return res.status(404).json({
      error: "Todo not found",
    });
  }
  res.json(todo);
});

// 수정
router.put("/:id", async (req, res) => {
  const todo = await Todo.findByPk(req.params.id);
  if (!todo) {
    return res.status(404).json({
      error: "Todo not found",
    });
  }

  const value = schema.validate(req.body);
  if (value.error) {
    return res.status(400).json({
      error: value.error.details[0].message,
    });
  }

  const { text } = value.value;

  await todo.update({
    text,
  });

  res.json(todo);
});

// 삭제
router.delete("/:id", async (req, res) => {
  const todo = await Todo.findByPk(req.params.id);
  if (!todo) {
    return res.status(404).json({
      error: "Todo not found",
    });
  }

  await todo.destroy();

  res.json(todo);
});

module.exports = router;
