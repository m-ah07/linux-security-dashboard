const { exec } = require('child_process');
const os = require('os');

exports.fetchSystemInfo = async () => {
  return {
    platform: os.platform(),
    hostname: os.hostname(),
    uptime: os.uptime(),
    arch: os.arch(),
    cpuCores: os.cpus().length,
    totalMemoryMB: Math.round(os.totalmem() / 1024 / 1024),
    freeMemoryMB: Math.round(os.freemem() / 1024 / 1024),
  };
};

exports.fetchOpenPorts = async () => {
  return new Promise((resolve, reject) => {
    exec('ss -tuln', (err, stdout, stderr) => {
      if (err) return reject(err);
      const lines = stdout.split('\n').slice(1);
      const ports = lines.map(line => line.trim()).filter(line => line);
      resolve(ports);
    });
  });
};

const DEFAULT_AUTH_LOG = '/var/log/auth.log';
const AUTH_LOG_PATH = (process.env.AUTH_LOG_PATH || DEFAULT_AUTH_LOG).replace(/[^/a-zA-Z0-9_.-]/g, '');

exports.fetchFailedLogins = async () => {
  const logPath = AUTH_LOG_PATH || DEFAULT_AUTH_LOG;
  return new Promise((resolve, reject) => {
    exec(`grep 'Failed password' ${logPath} 2>/dev/null | tail -n 50`, (err, stdout, stderr) => {
      if (err) return reject(err);
      const lines = stdout.split('\n').filter(line => line);
      resolve(lines);
    });
  });
};

/**
 * System auth logs are read-only for security/audit compliance.
 * Log rotation is typically handled by logrotate.
 * This function returns an informative message; actual cleanup would require
 * MongoDB persistence for application-stored logs.
 */
exports.cleanupOldLogs = async () => {
  return {
    message: 'System authentication logs are read-only for security and audit compliance. Log rotation is handled by logrotate. For application-stored logs, enable MongoDB and use the SystemLog model.',
    cleaned: false,
  };
};
