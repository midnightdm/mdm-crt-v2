'use strict';
if(!window.top.aspkey){
	throw new Error('missing a public key');
}

// Your web app's Firebase configuration
const firebaseConfig = {
  api: "AIzaSyAXuhNlafQwjDfms9pDbK9G8aquS-AnmXw",
  authDomain: "mdm-qcrt-demo-1.firebaseapp.com",
  projectId: "mdm-qcrt-demo-1",
  storageBucket: "mdm-qcrt-demo-1.appspot.com",
  messagingSenderId: "1055119004226",
  appId: "1:1055119004226:web:1d17187e816f794b5713db"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


class ViewModel {
  constructor() {
    let self = this;
    self.userID;
    self.subListActual = [];
    self.subListSelection = {};
    self.actListSelection = {};
    self.subListAvail = [
      { key: 'm486da', title: 'Marker 486 Downriver Any', description: '', image: '../images/sldr486.png' },
      { key: 'm486dp', title: 'Marker 486 Downriver Passenger', description: '', image: '../images/sldr486.png' },
      { key: 'm486ua', title: 'Marker 486 Upriver Any', description: '', image: '../images/slur486.png' },
      { key: 'm486up', title: 'Marker 486 Upriver Passenger', description: '', image: '../images/slur486.png' },
      { key: 'm487da', title: 'Marker 487 Downriver Any', description: '', image: '../images/sldr487.png' },
      { key: 'm487dp', title: 'Marker 487 Downriver Passenger', description: '', image: '../images/sldr487.png' },
      { key: 'm487ua', title: 'Marker 487 Upriver Any', description: '', image: '../images/slur487.png' },
      { key: 'm487up', title: 'Marker 487 Upriver Passenger', description: '', image: '../images/slur487.png' },
      { key: 'm488da', title: 'Marker 488 Downriver Any', description: '', image: '../images/sldr488.png' },
      { key: 'm488dp', title: 'Marker 488 Downriver Passenger', description: '', image: '../images/sldr488.png' },
      { key: 'm488ua', title: 'Marker 488 Upriver Any', description: '', image: '../images/slur488.png' },
      { key: 'm488up', title: 'Marker 488 Upriver Passenger', description: '', image: '../images/slur488.png' },
      { key: 'm489da', title: 'Marker 489 Downriver Any', description: '', image: '../images/sldr489.png' },
      { key: 'm489dp', title: 'Marker 489 Downriver Passenger', description: '', image: '../images/sldr489.png' },
      { key: 'm489ua', title: 'Marker 489 Upriver Any', description: '', image: '../images/slur489.png' },
      { key: 'm489up', title: 'Marker 489 Upriver Passenger', description: '', image: '../images/slur489.png' },
      { key: 'm490da', title: 'Marker 490 Downriver Any', description: '', image: '../images/sldr490.png' },
      { key: 'm490dp', title: 'Marker 490 Downriver Passenger', description: '', image: '../images/sldr490.png' },
      { key: 'm490ua', title: 'Marker 490 Upriver Any', description: '', image: '../images/slur490.png' },
      { key: 'm490up', title: 'Marker 490 Upriver Passenger', description: '', image: '../images/slur490.png' },
      { key: 'm491da', title: 'Marker 491 Downriver Any', description: '', image: '../images/sldr491.png' },
      { key: 'm491dp', title: 'Marker 491 Downriver Passenger', description: '', image: '../images/sldr491.png' },
      { key: 'm491ua', title: 'Marker 491 Upriver Any', description: '', image: '../images/slur491.png' },
      { key: 'm491up', title: 'Marker 491 Upriver Passenger', description: '', image: '../images/slur491.png' },
      { key: 'm492da', title: 'Marker 492 Downriver Any', description: '', image: '../images/sldr492.png' },
      { key: 'm492dp', title: 'Marker 492 Downriver Passenger', description: '', image: '../images/sldr492.png' },
      { key: 'm492ua', title: 'Marker 492 Upriver Any', description: '', image: '../images/slur492.png' },
      { key: 'm492up', title: 'Marker 492 Upriver Passenger', description: '', image: '../images/slur492.png' },
      { key: 'm493da', title: 'Marker 493 Downriver Any', description: '', image: '../images/sldr493.png' },
      { key: 'm493dp', title: 'Marker 493 Downriver Passenger', description: '', image: '../images/sldr493.png' },
      { key: 'm493ua', title: 'Marker 493 Upriver Any', description: '', image: '../images/slur493.png' },
      { key: 'm493up', title: 'Marker 493 Upriver Passenger', description: '', image: '../images/slur493.png' }
    ];
    self.getSelection  = function (){
      let qs = document.querySelector('#sub-list-avail');
      let key = qs.value;
      let sel = self.subListAvail.find(o => o.key === key);
      self.subListSelection = sel 
      console.log('getSelection() key: ', key, 'sel:', vm.subListSelection);
    };
  }
}


//Declare globals
const applicationServerPublicKey = window.top.aspkey;
const pushButton = document.querySelector('.pushtoglbtn');
const statusTxt = document.querySelector('#status');
const btnActEvent = document.querySelector('#btnActEvent');
const db = firebase.firestore();
const availEventSelectBox = document.querySelector('#sub-list-avail');

let vm = new ViewModel();
let deviceRef = null;
let isSubscribed = false;
let swRegistration = null;
let authEnc = null;
var user = {};

/* * * * * * * * * * * * * * *
*  Function definitions
*/

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function subscribeUser() {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
  .then(function(subscription) {
    console.log('User is subscribed.');
    isSubscribed = true;
    getSubList();
    updateBtn();
  })
  .catch(function(err) {
    console.log('Failed to subscribe the user: ', err);
    updateBtn();
  });
}

function initialiseUI() {
  pushButton.addEventListener('click', function() {
    pushButton.disabled = true;
    if (isSubscribed) {
      unsubscribeUser();
    } else {
      subscribeUser();
    }
  });
// Set the initial subscription value
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    isSubscribed = !(subscription === null);

    if (isSubscribed) {
      console.log('User IS subscribed.');
      //Get list of subscribed events
      getSubList(subscription.getKey('auth'));
    } else {
      console.log('User is NOT subscribed.');
    }

    updateBtn();
  });
}

function updateBtn() {
  if (Notification.permission === 'denied') {
    pushButton.textContent = 'Push Messaging Blocked';
    pushButton.disabled = true;
    statusTxt.textContent = 'Blocked';
    updateSubscriptionOnServer(null);
    return;
  }

  if (isSubscribed) {
    pushButton.textContent = 'Disable Push';
    statusTxt.textContent = 'Enabled';
  } else {
    pushButton.textContent = 'Enable Push';
    statusTxt.textContent = 'Disabled';
  }
  pushButton.disabled = false;
}



function unsubscribeUser() {
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    if (subscription) {
      return subscription.unsubscribe();
    }
  }).catch(function(error) {
    console.log('Error unsubscribing', error);
  }).then(function() {
    user.subscription.is_enabled = false;
    deviceRef.doc(users.id).update(user);
    console.log('User is unsubscribed.');
    isSubscribed = false;

    updateBtn();
  });
}

function getSubList() {
  navigator.serviceWorker.ready
  .then(serviceWorkerRegistration => serviceWorkerRegistration.pushManager.getSubscription())
  .then(subscription => {
      if (!subscription) {
          alert('Please enable push notifications');
          return;
      }

      authEnc =  btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('auth'))));
      deviceRef = db.collection('user_devices');
      const query = deviceRef.where('subscription.auth', '==', authEnc).limit(1);
      query.onSnapshot((snapshot) => {
        console.log('snapshot isEmpty? ', snapshot.empty);
        if(snapshot.empty) {
          user = { events: [],
            subscription: {
              auth: authEnc,
              endpoint: subscription.endpoint,
              is_enabled: true,
              p256dh: btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('p256dh')))) 
            }
          };             
          deviceRef.add(user)         
            .then(() => {
              return deviceRef.on("value", (snapshot) =>{
                user = snapshot.val();
                console.log('New user written with id: ', user.id);
              });
            });
            
        } else {
          var data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          if(data.length) {
            console.log('id ', data[0].id, 'subscription ', data[0].subscription, 'events ', data[0].events, 'raw ', data);
            vm.userID = data[0].id; 
            user = {events: [], subscription: {}};
            user.events = data[0].events;
            user.subscription = data[0].subscription;
            console.log('user: ', user);
          }
        }
        vm.subListActual = [];
        user.subscription.is_enabled = true;
        user.events.forEach(loadSubListActual);
        updateSubListActualView(); 
      });
  });
}

function loadSubListActual(tird, srcIdx, srcArray) { //This function used by getSubList()
  //console.log('scrVal: ', tird, '\n srcIdx: ', srcIdx, '\n scrArray: ', srcArray, '\n');
  let item = vm.subListAvail.find(o => o.key === tird);
  vm.subListActual.push(item);
}

function updateSubListActualView() {
  let none = document.getElementById('actualNone');
  if(vm.subListActual.length > 0) {
    let ol = document.getElementById('actualOL');
    let li = "";
    for(let i=0; i<vm.subListActual.length; i++) {
      li += '<li><span>'+ vm.subListActual[i].title + '</span> '
       +'<button id="remBtn'+vm.subListActual[i].key +'" onclick="removeActualEvent(\''+vm.subListActual[i].key+'\')">Delete</button> '
       +'<button id="revBtn'+vm.subListActual[i].key +'" onclick="reviewActualEvent(\''+vm.subListActual[i].key+'\')" '
       + 'data-bs-toggle="modal" data-bs-target="#subscribedModal">Review</button>\n   </li>';
    }
    ol.innerHTML = li;
    none.style.visibility = "hidden";
  } else {
    none.style.visibility = "visible";
  }
  
}

/**
 *  Class Definitions
 */


class SubListItem { 
  constructor() {
    this.key;
    this.title;
    this.description;
    this.image
  }
}





/**
 * Begin conditional statements and actions
 */

if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and Push is supported');
  //mysw.js has the push method and payload, mysw.js also has the eventhandler fr when the notification is clicked
  navigator.serviceWorker.register('../mysw.js') //this MUST be in the same directory as index.php
  .then(function(swReg) {
    console.log('Service Worker is registered', swReg);

    swRegistration = swReg;
    initialiseUI();

  })
  .catch(function(error) {
    console.error('Service Worker Error', error);
  });
} else {
  console.warn('Push messaging is not supported');
  pushButton.textContent = 'Push Not Supported';
}

const sendPushButton = document.querySelector('.sendpushbtn');
if (!sendPushButton) {
    throw new error();
}


/**
 *  Event Listener Designations
 */

 availEventSelectBox.addEventListener('change', () => {
  vm.getSelection();
 });

var myModal    = document.getElementById('availModal');
var modal2     = new bootstrap.Modal(myModal); 
var modalLabel = document.getElementById('availModalLabel');
var modalDescr = document.getElementById('vm-description');
var modalImage = document.getElementById('vm-image');

var subMo      = document.getElementById('subscribedModal');
var subModal   = new bootstrap.Modal(subMo);

var subMoLabel = document.getElementById('subscribedModalLabel');
var subMoDescr = document.getElementById('act-description');
var subMoImage = document.getElementById('act-image');

document.getElementById("btnActEventOn").addEventListener("click", function () {
  subModal.hide();
});

document.getElementById("subToEvt").addEventListener("click", function () {
  modal2.hide();
});

function reviewActualEvent(key) {
  let sel = vm.subListAvail.find(o => o.key === key);
  sel['isSubscribed'] = true;
  vm.actListSelection = sel;
  subMoLabel.innerText = vm.actListSelection.title;
  subMoDescr.innerText = vm.actListSelection.description;
  subMoImage.setAttribute("src", vm.actListSelection.image);
};

function removeActualEvent(key="", isModal=false) {
  if(key=="" && isModal)  {
    key = vm.actListSelection.key;
    //subMo.hide();
  } else {
    
  }

    //Update db.  
  deviceRef.doc(vm.userID).update({events: firebase.firestore.FieldValue.arrayRemove(key)});
  console.log('removeActualEvent()');

}

function subscribeToEvent() {
  user.events.push(vm.subListSelection.key);
  deviceRef.doc(vm.userID).update({events: user.events});
  console.log('subscribeToEvent()');
}

myModal.addEventListener('show.bs.modal', function (event) {
  // do something...
  modalLabel.innerText = vm.subListSelection.title;
  modalDescr.innerText = vm.subListSelection.description;
  modalImage.setAttribute("src", vm.subListSelection.image);
});


//Event for sending a test message
sendPushButton.addEventListener('click', () =>
  navigator.serviceWorker.ready
  .then(serviceWorkerRegistration => serviceWorkerRegistration.pushManager.getSubscription())
  .then(subscription => {
      if (!subscription) {
          alert('Please enable push notifications');
          return;
      }

      const p256dh = subscription.getKey('p256dh');
      const auth = subscription.getKey('auth');
      console.log('here');
      $.post(
        'manage/push',
        {
          endpoint: subscription.endpoint,
          p256dh: p256dh ? btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('p256dh')))) : null,
          auth: auth ? btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('auth')))) : null
      })
      .done(function(response){
        console.log("Response from manage/push ", response);
      }, 'json');
    /*
      fetch('manage/push', {
          method: 'POST',
          body: JSON.stringify({
              endpoint: subscription.endpoint,
              p256dh: p256dh ? btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('p256dh')))) : null,
              auth: auth ? btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('auth')))) : null
          })
      }).then(function(response){
        console.log("Response from manage/push ", response);
      })
      */
  })
);



  
$( document ).ready(function() {   
  //Bind view model to knockout
  ko.applyBindings(vm);
  
});