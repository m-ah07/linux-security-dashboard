const systemInfo = require('../utils/systemInfo');

exports.getFailedLogins = async (req, res) => {
  try {
    const failedLogins = await systemInfo.fetchFailedLogins();
    return res.json(failedLogins);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.cleanupOldLogs = async (req, res) => {
  try {
    const result = await systemInfo.cleanupOldLogs();
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
