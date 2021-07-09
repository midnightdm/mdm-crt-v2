<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use Minishlink\WebPush\WebPush;



class Welcome extends CI_Controller {

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
			$data['status'] = "Disabled";
			$data['publicKey'] = getenv('MDM_VKEY_PUB');
			$data['privateKey'] = getenv('MDM_VKEY_PRI');
			$this->load->vars($data);
		$this->load->view('manage');
	}

	public function push() {

		$this->load->library('firestore', 'user_devices');
		$doc = $this->firestore->getDocument();
		
		
		$auth = array(
			'VAPID' => array(
				'subject' => 'CRT Test Message',
				'publicKey' => getenv('MDM_VKEY_PUB'),
				'privateKey' => getenv('MDM_VKEY_PRI') // in the real world, this would be in a secret file
			)
		);
		//exit($subscriber['endpoint'].' : '.$subscriber['auth'].' : '.$subscriber['p256dh']);
		$webPush = new WebPush($auth);
		//this code was modified from the tutorial to make it more dynamic.
		//hardcoding the serviceworker push notification would not be a great practice in a real-world application
		$res = $webPush->sendNotification(
			$subscriber['endpoint'],
			'{"title":"CRT Test Message","msg":"Thank your for subscribing.","icon":"images/favicon.png","badge":"images/badge.png","url":"https://www.clintonrivertraffic.com/livescan/live"}',
			str_replace(['_', '-'], ['/', '+'],$subscriber['p256dh']),
			str_replace(['_', '-'], ['/', '+'],$subscriber['auth']),
			true
		);
		// handle eventual errors here, and remove the subscription from your server if it is expired
		
	}
}
