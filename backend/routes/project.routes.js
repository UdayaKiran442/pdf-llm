const { isAuthenticated } = require("../middleware/auth.middleware");
const { createProjectInDb } = require("../repository/projects.repository");
const { generateVectorEmbeddings } = require("../services/openai.service");

const projectsRouter = require("express").Router();
const uploadDirectory = './uploads';
const multer = require('multer');
const { extractTextFromPdf } = require("../utils/extractText.utils");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
       cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
       cb(null, file.originalname);
    }
});
const upload = multer({ storage });

projectsRouter.post('/create',isAuthenticated, upload.single('pdf'), async(req,res) => {
    try {
        const payload = req.body;
        const file = req.file
        const pdfData = await extractTextFromPdf(file.path)
        const embeddings = await generateVectorEmbeddings(pdfData);
        payload.userId = req.user.userId;
        payload.vectorEmbeddings = embeddings.data[0].embedding;
        payload.pdfURL = file.path;
        const response = await createProjectInDb(payload);
        return res.status(200).json({
            response,
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})

module.exports = projectsRouter