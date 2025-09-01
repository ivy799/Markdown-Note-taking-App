import writeGood from "write-good";
import { errorResponse, successResponse } from "../utils/response.js";
import { marked } from 'marked';
import fs from "fs/promises";
import fsSync from "fs";

const dataPath = "task.json";

const addData = async (args) => {
  await fs.writeFile(dataPath, JSON.stringify(args, null, 2), "utf-8");
};

const readData = async () => {
  if (!fsSync.existsSync(dataPath)) {
    return [];
  }
  const raw = await fs.readFile(dataPath, "utf-8");
  if (!raw.trim()) return [];
  return JSON.parse(raw);
};



export const check = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const markdown = req.file.buffer.toString("utf-8");
    const suggestions = writeGood(markdown);
    const html = marked.parse(markdown);

    return res.json({
      success: true,
      message: "Grammar/style check complete",
      suggestions,
      html,
    });
  } catch (error) {
    return errorResponse(res, "Failed to check grammar", error.message, 500);
  }
};



export const save = async (req, res) => {
  try {
    const { markdown } = req.body;
    if (!markdown || !markdown.trim()) {
      return res.status(400).json({ success: false, message: "Markdown content is required" });
    }

    const data = await readData();
    const newId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
    const now = new Date();

    const html = marked.parse(markdown);

    data.push({
      id: newId,
      description: markdown,
      html,
      status: "todo",
      createdAt: now.toLocaleString(),
      updatedAt: now.toLocaleString(),
    });

    await addData(data);

    return res.json({
      success: true,
      message: "Note saved successfully",
      data: data.map(note => ({
        ...note,
        html: marked.parse(note.description)
      })),
    });
  } catch (error) {
    return errorResponse(res, "Failed to save note", error.message, 500);
  }
};



export const list = async (req, res) => {
  try {
    const data = await readData();
    return res.json({
      success: true,
      data: data.map(note => ({
        ...note,
        html: marked.parse(note.description)
      })),
    });
  } catch (error) {
    return errorResponse(res, "Failed to get notes", error.message, 500);
  }
};
