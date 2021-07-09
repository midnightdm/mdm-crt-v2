<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once FCPATH.'vendor/autoload.php';

use Minishlink\WebPush\WebPush;
use MinishLink\Webpush\Subscribe;

class WebPushLibrary {
    public $webPush;
    

    public function __construct($initialize) {
        $this->webPush =  new WebPush($initialize);
    }

    public function isWorking() {
        return "Web Push Library is working.";
    }
}
