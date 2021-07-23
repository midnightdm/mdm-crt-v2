<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="../favicon.ico" rel="shortcut icon" type="image/x-icon" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
  <link rel="stylesheet" href="<?php echo $css;?>" type="text/css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/themes/base/jquery-ui.css">
  <link rel="preconnect" href="https://fonts.gstatic.com">

  <title>Document</title>
</head>
<body>
  <!-- The core Firebase JS SDK is always required and must be listed first -->
  <script defer src="https://www.gstatic.com/firebasejs/8.7.1/firebase-app.js"></script>
  <script defer src="https://www.gstatic.com/firebasejs/8.7.1/firebase-auth.js"></script>
  <script defer src="https://www.gstatic.com/firebasejs/8.7.1/firebase-firestore.js"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
  <script src="../js/jquery-3.5.1.min.js"></script>
  <script src="../js/knockout-3.5.1.js"></script>

  <script>
    //Pass Application Server publicKey to JS
    var aspkey = '<?php echo $publicKey;?>';
  </script>
<div id="logo-container">
    <h1>clinton<span>river</span>traffic</h1>
    <img id="logo-img" src="<?php echo getEnv('BASE_URL');?>images/logo-towboat2.png" alt="The logo image shows a tow boat pushing 9 barges.">
    <div id="mbbg" class="hasNav">
    <!-- hidden checkbox is used as click reciever -->
    <input type="checkbox" />    
    <!--    Some spans to act as a hamburger. -->
    <span></span>
    <span></span>
    <span></span>
    <ul id="menu" class="nav">
            <li><a class="nav-link <?php echo is_selected($title, 'About');?>" href="<?php echo $path;?>about">ABOUT</a></li>
            <li><a class="nav-link <?php echo is_selected($title, 'Alerts');?>" href="<?php echo $path;?>alerts">ALERTS</a></li>
            <li><a class="nav-link <?php echo is_selected($title, 'Live');?>" href="<?php echo $path;?>livescan/live">LIVE</a></li>
            <li><a class="nav-link <?php echo is_selected($title, 'Logs');?>" href="<?php echo $path;?>logs">LOGS</a></li>
        </ul>
    </div>
    <div id="title_slate"><?php echo strtoupper($title);?></div>
</div>

<main class="text-center">
  <h1>MANAGE NOTIFICATIONS</h1>
  <p>On this browser push notifications are <span id="status" class="badge rounded-pill bg-warning text-dark"><?php echo $status;?></span></p>
  <p><button class="pushtoglbtn" disabled>Enable Push</button>
  <button class="sendpushbtn">Send Notification</button></p>
  <script defer src="../js/manage.js"></script>
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
  <div style="margin: auto; width: 35em; align: center; background-color: #cce0e0; padding: 1em">
  Consider where along the river you like to watch riverboats. Choose one marker a few miles above your spot for downriver notices. Pick another below your spot for upriver notices. Passenger vessel events will trigger much less often than the "Any" vessel events which occur many times daily.
  
  </div>
</main>

<!-- Modal -->
<div class="modal fade" id="availModal" tabindex="-1" aria-labelledby="availModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="availModalLabel"></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <img id="vm-image" class="river-map" alt="Map image of river showing boat icon at edge of target area"/><br>
        <div class="description" id="vm-description"></div>
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
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="subscribedModalLabel"></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <img id="act-image" class="river-map" alt="Map image of river showing boat icon at edge of target area"/>
        <div id="act-description" class="description"></div>
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