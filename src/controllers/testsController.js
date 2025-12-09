import { connectionTest as connectionTestModel} from '../models/connectionTestModel.js';


export async function connectionTest(req, res, next) {
  try {
    const result = await connectionTestModel();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  };
};