const express = require("express");

const router = express.Router();

// 리스트
router.get("/", (req, res, next) => {
  res.status(200).json({
    ok: true,
  });
});

// 등록
router.post("/", (req, res, next) => {});

// 상세
router.get("/:id", (req, res, next) => {});

// 수정
router.put("/:id", (req, res, next) => {});

// 삭제
router.delete("/:id", (req, res, next) => {});

module.exports = router;
