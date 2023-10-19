<?php
defined('BASEPATH') OR exit('No direct script access allowed');
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


class My_Controller extends CI_Controller {
	public function __construct(){
		Parent::__construct();
	}

	public function sendJSON($data,$status){
		echo json_encode(array("status" => $status,"data"=>$data));
	}

	// public function validation($value,$name,$rules=false){
	// 	$validation_error=false;
	// 	$msg=array();
	// 	if($rules){
	// 		$rules=explode("|",$rules);
	// 		foreach($rules as $r){
	// 			if($r=="required")
	// 				if($value=="")
	// 					$msg[$name]="$name field is required";
	// 		}
	// 	}
	// 	if(!empty($msg)){
	// 		$this->validation_error=true;
	// 	}
	// 	return $msg;
	// }

}
