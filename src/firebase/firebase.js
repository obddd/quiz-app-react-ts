import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAfIcsjXi1VzDY1Or7NBB72g1FdG_od3gg',
  authDomain: 'push-notifications-326f1.firebaseapp.com',
  databaseURL: 'https://push-notifications-326f1.firebaseio.com',
  projectId: 'push-notifications-326f1',
  storageBucket: 'push-notifications-326f1.appspot.com',
  messagingSenderId: '1086391341543',
  appId: '1:1086391341543:web:ae0f8826cb766d9fc5ad42',
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

const initNotification = () => {
  Notification.requestPermission().then((permission) => {
    console.log(permission);
    if (permission === 'granted') {
      messaging
        .getToken()
        .then((currentToken) => {
          if (currentToken) {
            console.log('Token', currentToken);
          } else {
            console.log('No Instance ID token available.');
          }
        })
        .catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
        });
    } else {
      console.log('Unable to get permission to notify.');
    }
  });
};


export default initNotification;
