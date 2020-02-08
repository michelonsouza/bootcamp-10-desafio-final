import File from '../models/File';

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const { id, url } = await File.create({ name, path });

    return res.format({ id, path, url });
  }
}

export default new FileController();
