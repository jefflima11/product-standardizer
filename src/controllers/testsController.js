import { testsConnection as testsConnectionModel} from '../models/connectionTestModel.js';


export async function testsConnection(req, res) {
  try {
    const result = await testsConnectionModel();
    res.status(200).json({ message: 'Connection test successful', data: result });
  } catch (error) {
    res.status(500).json({ message: 'Connection test failed', error: error.message });
  }
};