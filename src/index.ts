import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
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
    boards: [],
  });
  admin
    .database()
    .ref(`/records/${user.uid}`)
    .set({
      workedTime: {
        "23/06/2021": { count: 10, worked: 250 },
        "22/06/2021": { count: 12, worked: 250 },
        "21/06/2021": { count: 10, worked: 250 },
        "20/06/2021": { count: 14, worked: 250 },
        "19/06/2021": { count: 8, worked: 250 },
        "18/06/2021": { count: 10, worked: 250 },
        "17/06/2021": { count: 8, worked: 250 },
      },
    });
});
