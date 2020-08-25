importScripts('https://www.gstatic.com/firebasejs/7.18.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.18.0/firebase-messaging.js');

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

firebase.messaging();
