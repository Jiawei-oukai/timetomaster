import express from "express";

import * as recordsController from "./../controllers/records-controller.js";

const recordsRouter = express.Router();

recordsRouter
  .route('')
  .get(recordsController.index)
  .post(recordsController.post);

recordsRouter
  .route('/:id')
  .get(recordsController.getById)
  .put(recordsController.put)
  .delete(recordsController.remove);

recordsRouter
  .route('/user/:userId')
  .get(recordsController.getByUserId);


/**

 * For example:
 * http://localhost:9002/records/search/all?gid=123456
 **/
recordsRouter.route('/search/all').get(recordsController.searchAllByGid);
recordsRouter.route('/search/dailyTime').get(recordsController.searchDailyTimeByGoalId);
recordsRouter.route('/search/weeklyTime').get(recordsController.searchWeeklyTimeByGoalId);
recordsRouter.route('/search/monthlyTime').get(recordsController.searchMonthlyTimeByGoalId);

recordsRouter.route('/userSearch/all').get(recordsController.searchAllByUid);
recordsRouter.route('/userSearch/dailyTime').get(recordsController.searchDailyTimeByUId);
recordsRouter.route('/userSearch/weeklyTime').get(recordsController.searchWeeklyTimeByUId);
recordsRouter.route('/userSearch/monthlyTime').get(recordsController.searchMonthlyTimeByUId);
/**
 * URL: /records/search/date?date=YYYY-MM-DD
 **/
recordsRouter.route('/search/date').get(recordsController.searchByDate);
export default recordsRouter;
