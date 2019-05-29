import DBInitialize from '../services/DBInitialize';
import { logger } from '../config/logger';

class UserDao {

  validateUser(phone, password) {
    return new Promise((resolve, reject) => {
      const queryString = `SELECT
              t1.*,
              e1.E_PHONE AS U_SUPERVISOR_PHONE,
              e1.E_EMAIL AS U_SUPERVISOR_EMAIL,
              e1.E_FNAME AS U_SUPERVISOR_FNAME,
              e1.E_MNAME AS U_SUPERVISOR_MNAME,
              e1.E_LNAME AS U_SUPERVISOR_LNAME
              FROM
              	(SELECT
              		e.*,
              		u.U_USERNAME,
              		u.U_LAST_LOGIN,
              		u.U_SUPERVISOR
              	FROM
              		TIS_USER u INNER JOIN
              		TIS_EMPLOYEE e ON u.U_E_ID = e.E_ID
              	WHERE
              		U_USERNAME='${phone}' AND
              		U_PASSWORD='${password}' AND
              		U_STATUS='active') t1 INNER JOIN
              	TIS_EMPLOYEE e1 ON t1.U_SUPERVISOR=e1.E_ID`;
      logger.debug(`Validating user against phone ${phone}`);

      new DBInitialize().pool.query(queryString, (error, results) => {
        if (error) throw error;
        if (results.length === 1) {
          const loginTimeUpdateQuery = `UPDATE TIS_USER
                  SET U_LAST_LOGIN=convert_tz(UTC_TIMESTAMP(), '+00:00','+05:30')
                  WHERE U_USERNAME='${phone}'`;

          new DBInitialize().pool.query(loginTimeUpdateQuery, (err, updateStatus) => {
            if (err) logger.info(`Error occurred while updating login status ${err}`);
            if (updateStatus.affectedRows > 0) logger.info(`Login status updated for ${phone}`);
          });

          logger.info(`${phone} User validated successfully.`);
          resolve(results[0]);
        } else {
          logger.info(`${phone} User couldn't validate. Rejecting Promise.`);
          reject({ status: 'failed', msg: 'Incorrect phone/password.' });
        }
      });
    });
  }
}

export default UserDao;
