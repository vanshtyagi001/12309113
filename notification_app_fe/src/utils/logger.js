import logger from '../../../logging_middleware/logger';

export const logOperation = (message, data) => {
  logger.info(message, data);
};

export const logError = (message, error) => {
  logger.error(message, error);
};