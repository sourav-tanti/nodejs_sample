import app from '../app';
import DBInitialize from '../services/DBInitialize';
import { logger } from '../config/logger';

new DBInitialize().connect((err) => {
    if (err) {
        logger.debug('Unable to connect to mysql');
        process.exit(1);
    } else {
        app.listen(process.env.port, () => {
              logger.info(`Listening on port ${process.env.port}`);
        });
    }
});
