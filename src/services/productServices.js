import { connectionTest as connectionTestModel } from '../models/connectionTestModel.js';

export async function connectionTest(req, res) {
  try {
    const exec = await connectionTestModel()
    res.status(200).json({ status: 'success', message: exec });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Database connection failed', error: error.message });
  }
}