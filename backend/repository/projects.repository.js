const {v4} = require('uuid');
const db = require('./db');
const { projects } = require('./schema');

exports.createProjectInDb = async (payload) => {
    try {
        console.log(payload);
        const newProjectId = v4();
        const insertPayload = {
            projectId: newProjectId,
            userId: payload.userId,
            title: payload.title,
            description: payload.description,
            pdfURL: payload.pdfURL,
            vectorEmbeddings: payload.vectorEmbeddings,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        await db.insert(projects).values(insertPayload)
        return insertPayload;
    } catch (error) {
        return error;
    }
}