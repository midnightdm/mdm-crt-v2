<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once FCPATH.'vendor/autoload.php';

use Minishlink\WebPush\Subscription;


class Manage extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */
	public function index()
	{
		//This is how firebase library is loaded for usage
		//$this->load->library('firebase');
		////$firebase = $this->firebase->init();
		//$db = $firebase->getDatabase();
		$data = array();
		$data['path'] = "";
		$data['status'] = "Disabled";
		$data['publicKey'] = getenv('MDM_VKEY_PUB');
		$data['privateKey'] = getenv('MDM_VKEY_PRI');
		$this->load->vars($data);
		$this->load->view('manage');
	}

	public function push() {
		$subscriber = false;
		//$this->load->library('firestore', 'user_devices');
		//$doc = $this->firestore->getDocument();

		if($this->input->post('endpoint') !== null) {
			$subscriber = array();
			$subscriber['endpoint']  = trim($this->input->post('endpoint'));
			$subscriber['auth']      = trim($this->input->post('auth'));
			$subscriber['p256dh']    = trim($this->input->post('p256dh'));
		} else {
			echo "Subcriber data not posted.";
			return;
		}
		
		//Prepare subscription package  
		$data = [
			"contentEncoding" => "aesgcm",
			"endpoint" => $subscriber['endpoint'],
			"keys" => [
				"auth" => $subscriber['auth'],
				"p256dh" => $subscriber['p256dh']
			]
		];
		$subscription = createSubscription($data);
		
		
		//Prepare VAPID package
		$auth = array(
			'VAPID' => array(
				'subject' => 'https://www.clintonrivertraffic.com/about',
				'publicKey' => getenv('MDM_VKEY_PUB'),
				'privateKey' => getenv('MDM_VKEY_PRI') 
			)
		);
		

		$this->load->library('webPushLibrary', $auth);
		
		//Prepare notification message
		$msg = [
			"title" => "CRT Test Message",
			"body"  => "Thank you for subscribing. Be sure to pick which events you want to receive.",
			"icon"  => "images/favicon.png",
			"badge" => "images/badge.png",
			"url"   => "https://www.clintonrivertraffic.com/livescan/live"
		];

		$report = $this->webpushlibrary->webPush->sendOneNotification($subscription, json_encode($msg));
		if($report->isSuccess()) {
			echo "Webpush success.\n";
		} else {
			$target = $report->getRequest()->getUri()->__toString();
			echo "Failed for {$target}: {$report->getReason()}";
		}	
	}
}

function createSubscription($data) {
	return Subscription::create($data);
}