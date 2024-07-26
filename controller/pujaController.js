const Repository = require("../lib/repository");
function PujaController() {}

PujaController.editPuja = async (req, res) => {
    try {
        const post = await Repository.editPuja(req.body, req.params.id);
        res.status(200).send(post);
    } catch (error) {
        res.status(400).send(error.message);
        return;
    }
};

PujaController.getPujaById = async (req, res) => {
    try {
        const post = await Repository.getPujaById(req.params.id);
        res.status(200).send(post);
    } catch (error) {
        res.status(400).send(error.message);
        return;
    }
};
PujaController.getPujaByCategory = async (req, res) => {
    try {
        const post = await Repository.getPujaByCategory(req.params.category);
        res.status(200).send(post);
    } catch (error) {
        res.status(400).send(error.message);
        return;
    }
}
PujaController.getPujaByTitle = async (req, res) => {
    try {
        const post = await Repository.getPujaByTitle(req.params.title);
        res.status(200).send(post);
    } catch (error) {
        res.status(400).send(error.message);
        return;
    }
}

PujaController.getAllPuja = async (req, res) => {
    try {
        const posts = await Repository.getAllPuja();
        res.status(200).send(posts);
    } catch (error) {
        res.status(400).send(error.message);
        return;
    }
};

PujaController.createPuja = async (req, res) => {
    try {
        const post = await Repository.createPuja(req.body, 1234);
        res.status(201).send({
            id: post._id,
            description: post.description,
            image: post.image,
        });
    } catch (error) {
        res.status(400).send(error.message);
        return;
    }
};

PujaController.deletePuja = async (req, res) => {
    try {
        const post = await Repository.deletePuja(req.params.id);
        res.status(200).send(post);
    } catch (error) {
        res.status(400).send(error.message);
        return;
    }
};

module.exports = PujaController;