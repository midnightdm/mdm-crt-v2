<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once BASEPATH.'vendor/autoload.php';
use Google\Cloud\Firestore\FirestoreClient;

/**
 * This is a custom library to interact with the firebase firestore cloud db
 */
class Firestore {
    protected $db;
    protected $name;

    public function __construct(string $collection) {
        $this->db = new FirestoreClient([
            'projectId'=> 'mdm-qcrt-demo-1'
        ]);

        $this->name = $collection;
    }

    public function getDocument(string $name) {
        return $this->db->collection($this->name)->document($name)->snapshot()->data();

    }

    public function getUser(string $auth) {
        $this->db->collection('user_devices')->.where('auth', '=', $auth)
    }

}