import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

exports.createDefaultUserData = functions.auth.user().onCreate((user) => {
  admin.database().ref(`/users/${user.uid}`).set({
      workInterval: 25,
      shortRestTime: 5,
      longRestTime: 30,
      longBreakAfter: 4,
      targetPerDay: 10,
      timerEndTime: 0,
      pomodoroCount: 0,
      onShortBreak: false,
      onLongBreak: false,
      isTimerPlaying: false,
      boards: []
  })
});