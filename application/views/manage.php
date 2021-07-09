<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="../favicon.ico" rel="shortcut icon" type="image/x-icon" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

    <title>Document</title>
</head>
<body>
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script defer src="https://www.gstatic.com/firebasejs/8.7.0/firebase-app.js"></script>
<script defer src="https://www.gstatic.com/firebasejs/8.7.0/firebase-firestore.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
<script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
<script src="../js/jquery-3.5.1.min.js"></script>
<script src="../js/knockout-3.5.1.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->


<script>
  //Pass Application Server publicKey to JS
  var aspkey = '<?php echo $publicKey;?>';
</script>
<main class="text-center">
  <h1>MANAGE NOTIFICATIONS</h1>
  <p>On this browser push notifications are <span id="status" class="badge rounded-pill bg-warning text-dark"><?php echo $status;?></span></p>
  <p><button class="pushtoglbtn" disabled>Enable Push</button>
  <button class="sendpushbtn">Send Notification</button></p>
  <script defer src="../js/main.js"></script>
  <div style="margin: auto; width: 35em; align: center; background-color: #dccce0; padding: 1em; border-spacing: 5px;">
    <h3>Subscribed Events</h3>

    <ol id="actualOL" class="list-group list-group-numbered">
    </ol>

    <p id="actualNone" class="badge rounded-pill bg-warning text-dark">None</p>
    
  </div>
  <div style="margin: auto; width: 35em; align: center; background-color: #cce0e0; padding: 1em">
    <h3>Available Events</h3>  
    <select name="sub-list-avail" id="sub-list-avail" class="form-select" size="5" data-bind="foreach: $root.subListAvail">
      <option data-bind="text: title, value: key"></option>
    </select> <br>   
    <br> 
    <!-- Button to trigger modal --> 
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#availModal">View Details</button>
    <br/>
    <!--
    <div>Selection <span data-bind="text: $root.subListSelection().title"></span></div>
    -->
  </div>
</main>

<!-- Modal -->
<div class="modal fade" id="availModal" tabindex="-1" aria-labelledby="availModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="availModalLabel"></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div id="vm-description"></div>
        <img id="vm-image" alt="Map image of river showing boat icon at edge of target area"/>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button id="subToEvt" type="button" class="btn btn-primary" onclick="subscribeToEvent()"data-bs-dismiss="modal">Subscribe To This Event</button>
      </div>
    </div>
  </div>
</div>

<!-- Modal -->
<div class="modal fade" id="subscribedModal" tabindex="-1" aria-labelledby="subscribedModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="subscribedModalLabel"></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div id="act-description"></div>
        <img id="act-image" alt="Map image of river showing boat icon at edge of target area"/>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" id="btnActEventOn" class="btn btn-primary" onclick="removeActualEvent('', true)" data-bs-dismiss="modal">Remove This Event</button>        
      </div>
    </div>
  </div>
</div>

</body>
</html>