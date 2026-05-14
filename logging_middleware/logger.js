const logger = {
  info: (message, data = {}) => {
    const logEntry = {
      level: 'INFO',
      timestamp: new Date().toISOString(),
      message,
      data,
    };
    window.dispatchEvent(new CustomEvent('app-log', { detail: logEntry }));
  },
  error: (message, error = {}) => {
    const logEntry = {
      level: 'ERROR',
      timestamp: new Date().toISOString(),
      message,
      error: error.message || error,
      stack: error.stack,
    };
    window.dispatchEvent(new CustomEvent('app-log', { detail: logEntry }));
  }
};

export default logger;