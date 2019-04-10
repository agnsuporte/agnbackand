const Box = require("../models/Box");

class BoxController {
  async store(req, res) {
    const box = await Box.create({ title: req.body.title });
    return res.send(box);
  }
  async show(req, res) {
    const box = await Box.findById(req.params.id).populate({
      path: "files", // campo
      options: { sort: { createdAt: -1 } } // campo de ordenção
    });
    return res.json(box);
  }
}

/**
 * new: necessário para ter acesso aos recursos da classe.
 */
module.exports = new BoxController();
