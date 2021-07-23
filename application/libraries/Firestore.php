<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once BASEPATH.'../vendor/autoload.php';
use Google\Cloud\Firestore\FirestoreClient;

// Get the contents of the JSON file 
$strJsonFileContents = file_get_contents(__DIR__ . '/../config/mdm-qcrt-demo-1-cd99971bc002.json');
//Convert into array & Put into CONSTANT
define('GOOGLE_APPLICATION_CREDENTIALS', json_decode($strJsonFileContents, true));

/**
 * This is a custom library to interact with the firebase firestore cloud db
 */
class Firestore {
    protected $db;
    protected $name;

    public function __construct($collection) {
        $this->name = $collection['name'];
        
        $this->db = new FirestoreClient([
            'keyFile' => GOOGLE_APPLICATION_CREDENTIALS,
            'projectId'=> 'mdm-qcrt-demo-1'
        ]);
        
        
    }

    public function getDocument($name) {
        $snapshot = $this->db->collection($this->name)->document($name)->snapshot();
        if(!$snapshot->exists()) {
            return false;
        }
        return $snapshot->data();

    }

   

   

}

//$config['firebase_app_key'] = __DIR__ . '/../config/mdm-qcrt-demo-1-cd99971bc002.json';//Private file not in git repo. Get ur own!
//include_once($_SERVER['DOCUMENT_ROOT'].'/mdm-crt2/vendor/autoload.php');

