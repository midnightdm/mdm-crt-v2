'use strict';
if(!window.top.aspkey){
	throw new Error('missing a public key');
}


 // Your web app's Firebase configuration
 var firebaseConfig = {
  apiKey: "AIzaSyA6KlSt8IQBSm7TiDszs29bhKaVev-e1Tw",
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
    self.userID = null;
    self.subListActual = [];
    self.subListSelection = {};
    self.actListSelection = {};
    self.subListAvail = [
      { key: 'alphada',  title: 'Alpha Waypoint 3 N Lock 13 Downriver Any', description: 'Notification is sent when any transponder-equipped vessel passes a line 3 miles north of Lock 13 traveling downriver.', image: '../images/sel/sldr-alpha.png'},
      { key: 'alphadp',  title: 'Alpha Waypoint 3 N Lock 13 Downriver Passenger', description: 'Notification is sent when a passenger vessel passes a line 3 miles north of Lock 13 traveling downriver.', image: '../images/sel/sldr-alpha.png'},
      { key: 'alphaua',  title: 'Alpha Waypoint 3 N Lock 13 Upriver Any', description: 'Notification is sent when any transponder-equipped vessel passes a line 3 miles north of Lock 13 traveling upriver.', image: '../images/sel/slur-alpha.png'},
      { key: 'alphaup',  title: 'Alpha Waypoint 3 N Lock 13 Upriver Passenger', description: 'Notification is sent when a passenger vessel passes a line 3 miles north of Lock 13 traveling upriver.', image: '../images/sel/slur-alpha.png'},      
      { key: 'bravoda',  title: 'Bravo Waypoint Lock 13 Downriver Any', description: 'Notification is sent when any transponder-equipped vessel passes a line at Lock 13 traveling downriver.', image: '../images/sel/sldr-bravo.png'},
      { key: 'bravodp',  title: 'Bravo Waypoint Lock 13 Downriver Passenger', description: 'Notification is sent when a passenger vessel passes a line at Lock 13 traveling downriver.', image: '../images/sel/sldr-bravo.png'},
      { key: 'bravoua',  title: 'Bravo Waypoint Lock 13 Upriver Any', description: 'Notification is sent when any transponder-equipped vessel passes a line at Lock 13 traveling upriver.', image: '../images/sel/slur-bravo.png'},
      { key: 'bravoup',  title: 'Bravo Waypoint  Lock 13 Upriver Passenger', description: 'Notification is sent when a passenger vessel passes a line at Lock 13 traveling upriver.', image: '../images/sel/slur-bravo.png'},      
      { key: 'charlieda',  title: 'Charlie Waypoint RR Bridge Downriver Any', description: 'Notification is sent when any transponder-equipped vessel passes the Clinton railroad bridge traveling downriver.', image: '../images/sel/sldr-charlie.png'},
      { key: 'charliedp',  title: 'Charlie Waypoint RR Bridge Downriver Passenger', description: 'Notification is sent when a passenger vessel passes the Clinton railroad bridge traveling downriver.', image: '../images/sel/sldr-charlie.png'},
      { key: 'charlieua',  title: 'Charlie Waypoint RR Bridge Upriver Any', description: 'Notification is sent when any transponder-equipped vessel passes the Clinton railroad bridge traveling upriver.', image: '../images/sel/slur-charlie.png'},
      { key: 'charlieup',  title: 'Charlie Waypoint RR Bridge Upriver Passenger', description: 'Notification is sent when a passenger vessel passes the Clinton railroad bridge traveling upriver.', image: '../images/sel/slur-charlie.png'},
      { key: 'deltada',  title: 'Delta Waypoint 3 S RR Bridge Downriver Any', description: 'Notification is sent when any transponder-equipped vessel passes a line 3 miles south of the Clinton railroad bridge traveling downriver.', image: '../images/sel/sldr-delta.png'},
      { key: 'deltadp',  title: 'Delta Waypoint 3 S RR Bridge Downriver Passenger', description: 'Notification is sent when a passenger vessel passes a line 3 miles south of the Clinton railroad bridge traveling downriver.', image: '../images/sel/sldr-delta.png'},
      { key: 'deltaua',  title: 'Delta Waypoint 3 S RR Bridge Upriver Any', description: 'Notification is sent when any transponder-equipped vessel passes a line 3 miles south of the Clinton railroad bridge traveling upriver.', image: '../images/sel/slur-delta.png'},
      { key: 'deltaup',  title: 'Delta Waypoint 3 S RR Bridge Upriver Passenger', description: 'Notification is sent when a passenger vessel passes a line 3 miles south of the Clinton railroad bridge traveling upriver.', image: '../images/sel/slur-delta.png'},
      { key: 'm503da', title: 'Marker 503 Downriver Any', description: '', image: '../images/sel/sldr503.png' },
      { key: 'm503dp', title: 'Marker 503 Downriver Passenger', description: '', image: '../images/sel/sldr503.png' },
      { key: 'm503ua', title: 'Marker 503 Upriver Any', description: '', image: '../images/sel/slur503.png' },
      { key: 'm503up', title: 'Marker 503 Upriver Passenger', description: '', image: '../images/sel/slur503.png' },
      { key: 'm504da', title: 'Marker 504 Downriver Any', description: '', image: '../images/sel/sldr504.png' },
      { key: 'm504dp', title: 'Marker 504 Downriver Passenger', description: '', image: '../images/sel/sldr504.png' },
      { key: 'm504ua', title: 'Marker 504 Upriver Any', description: '', image: '../images/sel/slur504.png' },
      { key: 'm504up', title: 'Marker 504 Upriver Passenger', description: '', image: '../images/sel/slur504.png' },
      { key: 'm505da', title: 'Marker 505 Downriver Any', description: '', image: '../images/sel/sldr505.png' },
      { key: 'm505dp', title: 'Marker 505 Downriver Passenger', description: '', image: '../images/sel/sldr505.png' },
      { key: 'm505ua', title: 'Marker 505 Upriver Any', description: '', image: '../images/sel/slur505.png' },
      { key: 'm505up', title: 'Marker 505 Upriver Passenger', description: '', image: '../images/sel/slur505.png' },
      { key: 'm506da', title: 'Marker 506 Downriver Any', description: '', image: '../images/sel/sldr506.png' },
      { key: 'm506dp', title: 'Marker 506 Downriver Passenger', description: '', image: '../images/sel/sldr506.png' },
      { key: 'm506ua', title: 'Marker 506 Upriver Any', description: '', image: '../images/sel/slur506.png' },
      { key: 'm506up', title: 'Marker 506 Upriver Passenger', description: '', image: '../images/sel/slur506.png' },
      { key: 'm507da', title: 'Marker 507 Downriver Any', description: '', image: '../images/sel/sldr507.png' },
      { key: 'm507dp', title: 'Marker 507 Downriver Passenger', description: '', image: '../images/sel/sldr507.png' },
      { key: 'm507ua', title: 'Marker 507 Upriver Any', description: '', image: '../images/sel/slur507.png' },
      { key: 'm507up', title: 'Marker 507 Upriver Passenger', description: '', image: '../images/sel/slur507.png' },
      { key: 'm508da', title: 'Marker 508 Downriver Any', description: '', image: '../images/sel/sldr508.png' },
      { key: 'm508dp', title: 'Marker 508 Downriver Passenger', description: '', image: '../images/sel/sldr508.png' },
      { key: 'm508ua', title: 'Marker 508 Upriver Any', description: '', image: '../images/sel/slur508.png' },
      { key: 'm508up', title: 'Marker 508 Upriver Passenger', description: '', image: '../images/sel/slur508.png' },
      { key: 'm509da', title: 'Marker 509 Downriver Any', description: '', image: '../images/sel/sldr509.png' },
      { key: 'm509dp', title: 'Marker 509 Downriver Passenger', description: '', image: '../images/sel/sldr509.png' },
      { key: 'm509ua', title: 'Marker 509 Upriver Any', description: '', image: '../images/sel/slur509.png' },
      { key: 'm509up', title: 'Marker 509 Upriver Passenger', description: '', image: '../images/sel/slur509.png' },
      { key: 'albany',  title: 'Albany Sand Pit Any', description: 'Notification is sent when any transponder-equipped vessel enters the Albany sand pit harbor.', image: '../images/sel/sl-albany.png'},
      { key: 'm510da', title: 'Marker 510 Downriver Any', description: '', image: '../images/sel/sldr510.png' },
      { key: 'm510dp', title: 'Marker 510 Downriver Passenger', description: '', image: '../images/sel/sldr510.png' },
      { key: 'm510ua', title: 'Marker 510 Upriver Any', description: '', image: '../images/sel/slur510.png' },
      { key: 'm510up', title: 'Marker 510 Upriver Passenger', description: '', image: '../images/sel/slur510.png' },
      { key: 'm511da', title: 'Marker 511 Downriver Any', description: '', image: '../images/sel/sldr511.png' },
      { key: 'm511dp', title: 'Marker 511 Downriver Passenger', description: '', image: '../images/sel/sldr511.png' },
      { key: 'm511ua', title: 'Marker 511 Upriver Any', description: '', image: '../images/sel/slur511.png' },
      { key: 'm511up', title: 'Marker 511 Upriver Passenger', description: '', image: '../images/sel/slur511.png' },
      { key: 'camanche',  title: 'Camanche Harbor Any', description: 'Notification is sent when any transponder-equipped vessel enters the Camanche Marina harbor.', image: '../images/sel/sl-camanche.png'},
      { key: 'm512da', title: 'Marker 512 Downriver Any', description: '', image: '../images/sel/sldr512.png' },
      { key: 'm512dp', title: 'Marker 512 Downriver Passenger', description: '', image: '../images/sel/sldr512.png' },
      { key: 'm512ua', title: 'Marker 512 Upriver Any', description: '', image: '../images/sel/slur512.png' },
      { key: 'm512up', title: 'Marker 512 Upriver Passenger', description: '', image: '../images/sel/slur512.png' },
      { key: 'm513da', title: 'Marker 513 Downriver Any', description: '', image: '../images/sel/sldr513.png' },
      { key: 'm513dp', title: 'Marker 513 Downriver Passenger', description: '', image: '../images/sel/sldr513.png' },
      { key: 'm513ua', title: 'Marker 513 Upriver Any', description: '', image: '../images/sel/slur513.png' },
      { key: 'm513up', title: 'Marker 513 Upriver Passenger', description: '', image: '../images/sel/slur513.png' },
      { key: 'm514da', title: 'Marker 514 Downriver Any', description: '', image: '../images/sel/sldr514.png' },
      { key: 'm514dp', title: 'Marker 514 Downriver Passenger', description: '', image: '../images/sel/sldr514.png' },
      { key: 'm514ua', title: 'Marker 514 Upriver Any', description: '', image: '../images/sel/slur514.png' },
      { key: 'm514up', title: 'Marker 514 Upriver Passenger', description: '', image: '../images/sel/slur514.png' },
      { key: 'beaverda',  title: 'Beaver Slough Downriver Any', description: 'Notification is sent when any transponder-equipped vessel travels downriver in the Beaver Island slough.', image: '../images/sel/sldr-beaver.png'},
      { key: 'beaverua',  title: 'Beaver Slough Upriver Any', description: 'Notification is sent when any transponder-equipped vessel travels upriver in the Beaver Island slough.', image: '../images/sel/slur-beaver.png'},    
      { key: 'm515da', title: 'Marker 515 Downriver Any', description: '', image: '../images/sel/sldr515.png' },
      { key: 'm515dp', title: 'Marker 515 Downriver Passenger', description: '', image: '../images/sel/sldr515.png' },
      { key: 'm515ua', title: 'Marker 515 Upriver Any', description: '', image: '../images/sel/slur515.png' },
      { key: 'm515up', title: 'Marker 515 Upriver Passenger', description: '', image: '../images/sel/slur515.png' },
      { key: 'm516da', title: 'Marker 516 Downriver Any', description: '', image: '../images/sel/sldr516.png' },
      { key: 'm516dp', title: 'Marker 516 Downriver Passenger', description: '', image: '../images/sel/sldr516.png' },
      { key: 'm516ua', title: 'Marker 516 Upriver Any', description: '', image: '../images/sel/slur516.png' },
      { key: 'm516up', title: 'Marker 516 Upriver Passenger', description: '', image: '../images/sel/slur516.png' },
      { key: 'm517da', title: 'Marker 517 Downriver Any', description: '', image: '../images/sel/sldr517.png' },
      { key: 'm517dp', title: 'Marker 517 Downriver Passenger', description: '', image: '../images/sel/sldr517.png' },
      { key: 'm517ua', title: 'Marker 517 Upriver Any', description: '', image: '../images/sel/slur517.png' },
      { key: 'm517up', title: 'Marker 517 Upriver Passenger', description: '', image: '../images/sel/slur517.png' },
      { key: 'm518da', title: 'Marker 518 Downriver Any', description: '', image: '../images/sel/sldr518.png' },
      { key: 'm518dp', title: 'Marker 518 Downriver Passenger', description: '', image: '../images/sel/sldr518.png' },
      { key: 'm518ua', title: 'Marker 518 Upriver Any', description: '', image: '../images/sel/slur518.png' },
      { key: 'm518up', title: 'Marker 518 Upriver Passenger', description: '', image: '../images/sel/slur518.png' },
      { key: 'm519da', title: 'Marker 519 Downriver Any', description: '', image: '../images/sel/sldr519.png' },
      { key: 'm519dp', title: 'Marker 519 Downriver Passenger', description: '', image: '../images/sel/sldr519.png' },
      { key: 'm519ua', title: 'Marker 519 Upriver Any', description: '', image: '../images/sel/slur519.png' },
      { key: 'm519up', title: 'Marker 519 Upriver Passenger', description: '', image: '../images/sel/slur519.png' },
      { key: 'm520da', title: 'Marker 520 Downriver Any', description: '', image: '../images/sel/sldr520.png' },
      { key: 'm520dp', title: 'Marker 520 Downriver Passenger', description: '', image: '../images/sel/sldr520.png' },
      { key: 'm520ua', title: 'Marker 520 Upriver Any', description: '', image: '../images/sel/slur520.png' },
      { key: 'm520up', title: 'Marker 520 Upriver Passenger', description: '', image: '../images/sel/slur520.png' },
      { key: 'm521da', title: 'Marker 521 Downriver Any', description: '', image: '../images/sel/sldr521.png' },
      { key: 'm521dp', title: 'Marker 521 Downriver Passenger', description: '', image: '../images/sel/sldr521.png' },
      { key: 'm521ua', title: 'Marker 521 Upriver Any', description: '', image: '../images/sel/slur521.png' },
      { key: 'm521up', title: 'Marker 521 Upriver Passenger', description: '', image: '../images/sel/slur521.png' },
      { key: 'm522da', title: 'Marker 522 Downriver Any', description: '', image: '../images/sel/sldr522.png' },
      { key: 'm522dp', title: 'Marker 522 Downriver Passenger', description: '', image: '../images/sel/sldr522.png' },
      { key: 'm522ua', title: 'Marker 522 Upriver Any', description: '', image: '../images/sel/slur522.png' },
      { key: 'm522up', title: 'Marker 522 Upriver Passenger', description: '', image: '../images/sel/slur522.png' },
      { key: 'm523da', title: 'Marker 523 Downriver Any', description: '', image: '../images/sel/sldr523.png' },
      { key: 'm523dp', title: 'Marker 523 Downriver Passenger', description: '', image: '../images/sel/sldr523.png' },
      { key: 'm523ua', title: 'Marker 523 Upriver Any', description: '', image: '../images/sel/slur523.png' },
      { key: 'm523up', title: 'Marker 523 Upriver Passenger', description: '', image: '../images/sel/slur523.png' },
      { key: 'm524da', title: 'Marker 524 Downriver Any', description: '', image: '../images/sel/sldr524.png' },
      { key: 'm524dp', title: 'Marker 524 Downriver Passenger', description: '', image: '../images/sel/sldr524.png' },
      { key: 'm524ua', title: 'Marker 524 Upriver Any', description: '', image: '../images/sel/slur524.png' },
      { key: 'm524up', title: 'Marker 524 Upriver Passenger', description: '', image: '../images/sel/slur524.png' },
      { key: 'm525da', title: 'Marker 525 Downriver Any', description: '', image: '../images/sel/sldr525.png' },
      { key: 'm525dp', title: 'Marker 525 Downriver Passenger', description: '', image: '../images/sel/sldr525.png' },
      { key: 'm525ua', title: 'Marker 525 Upriver Any', description: '', image: '../images/sel/slur525.png' },
      { key: 'm525up', title: 'Marker 525 Upriver Passenger', description: '', image: '../images/sel/slur525.png' },
      { key: 'm526da', title: 'Marker 526 Downriver Any', description: '', image: '../images/sel/sldr526.png' },
      { key: 'm526dp', title: 'Marker 526 Downriver Passenger', description: '', image: '../images/sel/sldr526.png' },
      { key: 'm526ua', title: 'Marker 526 Upriver Any', description: '', image: '../images/sel/slur526.png' },
      { key: 'm526up', title: 'Marker 526 Upriver Passenger', description: '', image: '../images/sel/slur526.png' },
      { key: 'm527da', title: 'Marker 527 Downriver Any', description: '', image: '../images/sel/sldr527.png' },
      { key: 'm527dp', title: 'Marker 527 Downriver Passenger', description: '', image: '../images/sel/sldr527.png' },
      { key: 'm527ua', title: 'Marker 527 Upriver Any', description: '', image: '../images/sel/slur527.png' },
      { key: 'm527up', title: 'Marker 527 Upriver Passenger', description: '', image: '../images/sel/slur527.png' },
      { key: 'm528da', title: 'Marker 528 Downriver Any', description: '', image: '../images/sel/sldr528.png' },
      { key: 'm528dp', title: 'Marker 528 Downriver Passenger', description: '', image: '../images/sel/sldr528.png' },
      { key: 'm528ua', title: 'Marker 528 Upriver Any', description: '', image: '../images/sel/slur528.png' },
      { key: 'm528up', title: 'Marker 528 Upriver Passenger', description: '', image: '../images/sel/slur528.png' },
      { key: 'm529da', title: 'Marker 529 Downriver Any', description: '', image: '../images/sel/sldr529.png' },
      { key: 'm529dp', title: 'Marker 529 Downriver Passenger', description: '', image: '../images/sel/sldr529.png' },
      { key: 'm529ua', title: 'Marker 529 Upriver Any', description: '', image: '../images/sel/slur529.png' },
      { key: 'm529up', title: 'Marker 529 Upriver Passenger', description: '', image: '../images/sel/slur529.png' },
      { key: 'm530da', title: 'Marker 530 Downriver Any', description: '', image: '../images/sel/sldr530.png' },
      { key: 'm530dp', title: 'Marker 530 Downriver Passenger', description: '', image: '../images/sel/sldr530.png' },
      { key: 'm530ua', title: 'Marker 530 Upriver Any', description: '', image: '../images/sel/slur530.png' },
      { key: 'm530up', title: 'Marker 530 Upriver Passenger', description: '', image: '../images/sel/slur530.png' },
      { key: 'm531da', title: 'Marker 531 Downriver Any', description: '', image: '../images/sel/sldr531.png' },
      { key: 'm531dp', title: 'Marker 531 Downriver Passenger', description: '', image: '../images/sel/sldr531.png' },
      { key: 'm531ua', title: 'Marker 531 Upriver Any', description: '', image: '../images/sel/slur531.png' },
      { key: 'm531up', title: 'Marker 531 Upriver Passenger', description: '', image: '../images/sel/slur531.png' },
      { key: 'm532da', title: 'Marker 532 Downriver Any', description: '', image: '../images/sel/sldr532.png' },
      { key: 'm532dp', title: 'Marker 532 Downriver Passenger', description: '', image: '../images/sel/sldr532.png' },
      { key: 'm532ua', title: 'Marker 532 Upriver Any', description: '', image: '../images/sel/slur532.png' },
      { key: 'm532up', title: 'Marker 532 Upriver Passenger', description: '', image: '../images/sel/slur532.png' },
      { key: 'm533da', title: 'Marker 533 Downriver Any', description: '', image: '../images/sel/sldr533.png' },
      { key: 'm533dp', title: 'Marker 533 Downriver Passenger', description: '', image: '../images/sel/sldr533.png' },
      { key: 'm533ua', title: 'Marker 533 Upriver Any', description: '', image: '../images/sel/slur533.png' },
      { key: 'm533up', title: 'Marker 533 Upriver Passenger', description: '', image: '../images/sel/slur533.png' },
      { key: 'm534da', title: 'Marker 534 Downriver Any', description: '', image: '../images/sel/sldr534.png' },
      { key: 'm534dp', title: 'Marker 534 Downriver Passenger', description: '', image: '../images/sel/sldr534.png' },
      { key: 'm534ua', title: 'Marker 534 Upriver Any', description: '', image: '../images/sel/slur534.png' },
      { key: 'm534up', title: 'Marker 534 Upriver Passenger', description: '', image: '../images/sel/slur534.png' },
      { key: 'm535da', title: 'Marker 535 Downriver Any', description: '', image: '../images/sel/sldr535.png' },
      { key: 'm535dp', title: 'Marker 535 Downriver Passenger', description: '', image: '../images/sel/sldr535.png' },
      { key: 'm535ua', title: 'Marker 535 Upriver Any', description: '', image: '../images/sel/slur535.png' },
      { key: 'm535up', title: 'Marker 535 Upriver Passenger', description: '', image: '../images/sel/slur535.png' },
      { key: 'm536da', title: 'Marker 536 Downriver Any', description: '', image: '../images/sel/sldr536.png' },
      { key: 'm536dp', title: 'Marker 536 Downriver Passenger', description: '', image: '../images/sel/sldr536.png' },
      { key: 'm536ua', title: 'Marker 536 Upriver Any', description: '', image: '../images/sel/slur536.png' },
      { key: 'm536up', title: 'Marker 536 Upriver Passenger', description: '', image: '../images/sel/slur536.png' },
      { key: 'm537da', title: 'Marker 537 Downriver Any', description: '', image: '../images/sel/sldr537.png' },
      { key: 'm537dp', title: 'Marker 537 Downriver Passenger', description: '', image: '../images/sel/sldr537.png' },
      { key: 'm537ua', title: 'Marker 537 Upriver Any', description: '', image: '../images/sel/slur537.png' },
      { key: 'm537up', title: 'Marker 537 Upriver Passenger', description: '', image: '../images/sel/slur537.png' },
      { key: 'm538da', title: 'Marker 538 Downriver Any', description: '', image: '../images/sel/sldr538.png' },
      { key: 'm538dp', title: 'Marker 538 Downriver Passenger', description: '', image: '../images/sel/sldr538.png' },
      { key: 'm538ua', title: 'Marker 538 Upriver Any', description: '', image: '../images/sel/slur538.png' },
      { key: 'm538up', title: 'Marker 538 Upriver Passenger', description: '', image: '../images/sel/slur538.png' },
      { key: 'm539da', title: 'Marker 539 Downriver Any', description: '', image: '../images/sel/sldr539.png' },
      { key: 'm539dp', title: 'Marker 539 Downriver Passenger', description: '', image: '../images/sel/sldr539.png' },
      { key: 'm539ua', title: 'Marker 539 Upriver Any', description: '', image: '../images/sel/slur539.png' },
      { key: 'm539up', title: 'Marker 539 Upriver Passenger', description: '', image: '../images/sel/slur539.png' }
    ];
    self.getSelection  = function (){
      let qs = document.querySelector('#sub-list-avail');
      let key = qs.value;
      let sel = self.subListAvail.find(o => o.key === key);
      //Build description based on conditions
      if(sel.key.substr(0,1)=='m') {
        let mile = parseInt(sel.key.substr(1,3));
        let dir  = sel.key.substr(4,1);
        let type = sel.key.substr(5,1);
        var dirLine, dirEnd, tStr;
        tStr = type=="p"? "a passenger " : "any transponder-equipped ";
        if(dir == "u" ) {
          dirLine = "bottom ";
          dirEnd  = "upriver.\n";
        } else {
          dirLine = "top ";
          dirEnd  = "downriver.\n";
        }
        
        sel.description = "Notification is sent when " + tStr + "vessel reaches the " + dirLine + "line of the river zone designated by mile marker " + mile + " while traveling " + dirEnd;
      }
      self.subListSelection = sel; 
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
let deviceRef = db.collection('user_devices');
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
    getSubList()
    updateBtn();  
    //Delay to ensure userID is set. Couldn't figure how to get promise to work here.
    setTimeout(()=>{ deviceRef.doc(vm.userID).set( {subscription: {is_enabled: true}}, {merge: true});} , 2000 );   
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
      getSubList();
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
    deviceRef.doc(vm.userID).set( {subscription: {is_enabled: false}}, {merge: true});
    console.log('User is unsubscribed.');
    isSubscribed = false;
    vm.subListActual = [];
    updateBtn();
    updateSubListActualView();
    
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

      //Login annonymously to firebase auth and get unique uid
      firebase.auth().signInAnonymously().catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
      
        if (errorCode === 'auth/operation-not-allowed') {
          alert('You must enable Anonymous auth in the Firebase Console.');
        } else {
          console.error(error);
        }
      })
      .then((userObj)=> {
          //Use returned user object's uid to get or create new db document
          console.log("Returned userObj: ",userObj);
          vm.userID = userObj.user.uid;   
          if(vm.userID==null) { alert("Error generating a UUID.  Try again later."); }     
      
          let document = deviceRef.doc(vm.userID);
          /*   BLOCK START                 */
          document.onSnapshot((snapshot) => {
            console.log('snapshot exists? ', snapshot.exists, snapshot.data());
            if(!snapshot.exists) {
              user = { 
                events: [],
                subscription: {
                  auth:  btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('auth')))),
                  endpoint: subscription.endpoint,
                  is_enabled: isSubscribed,
                  p256dh: btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('p256dh')))) 
                }
              };             
              deviceRef.doc(vm.userID).set(user)         
                .then(() => {
                  deviceRef.doc(vm.userID).onSnapshot((snapshot)  => {
                    user = snapshot.data();
                    console.log("New user created. Snapshot: ", user);
                  })
                });
                
            } else {
              user = snapshot.data();
              console.log('user: ', user);
            }
            vm.subListActual = [];
            user.subscription.is_enabled = isSubscribed;
            user.events.forEach(loadSubListActual);
            updateSubListActualView(); 
            
          });  //End of document.onSnapshot()
          
          /**
           *  BLOCK END
           */
                 
      }); //End of then ((userObj)=>)

  }); //End of then(subscription)=>


} //End of get subList()

function loadSubListActual(tird, srcIdx, srcArray) { //This function used by getSubList()
  //console.log('scrVal: ', tird, '\n srcIdx: ', srcIdx, '\n scrArray: ', srcArray, '\n');
  let item = vm.subListAvail.find(o => o.key === tird);
  vm.subListActual.push(item);
}

function updateSubListActualView() {
  let none = document.getElementById('actualNone');
  let ol = document.getElementById('actualOL');
  if(vm.subListActual.length > 0) {
    
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
    ol.innerHTML = "";
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
      $.post('manage/push', { user_index: vm.userID })
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