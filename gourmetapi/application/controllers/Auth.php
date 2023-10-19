<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Auth extends My_Controller {

	public function __construct(){
		Parent::__construct();
		$this->load->model('Common_model','cm');
	}
	
	public function login(){
		$data = json_decode(file_get_contents("php://input"),true);
		$status=0;
		$return=array(
			"message" => "Login fail.",
			"expireAt" => date("Y-m-d H:i:s", strtotime('-24 hours'))
		);
		if($data){
			if($data['email'] !='' and $data['password'] !=''){
				if($rs=$this->cm->retriveRow('users','*',$data)){
					$status=1;
					$return=array(
								"message" => "Successful login.",
								"jwt" => $rs['token'],
								"expireAt" => date("Y-m-d H:i:s", strtotime('+24 hours')),
								"datas"=>json_encode($rs)
					);
				}
			}
		}
		
		$this->sendJSON($return,$status);
	}

	public function register(){
		$data = json_decode(file_get_contents("php://input"),true);
		$status=0;
		$return=array("message" => "Register fail.");

		if($data){
			if($data['email'] !='' and $data['password'] !=''){

				if($data['image']){
					$dir="img/user/";
					list($type, $imgdata) = explode(';', $data['image']);
					list(, $imgdata)      = explode(',', $imgdata);
					/* to get image type like jpg, png */
					$fileType = explode("image/", $type);
					$image_type = $fileType[1];
					
					$imgdata = base64_decode($imgdata);
					$image_name = $dir.uniqid().rand(111,999) .".". $image_type;
					file_put_contents($image_name, $imgdata);
					
					$data['image']=$image_name;
				}

				$data['token']=time().rand(111,999).md5($data['email']);
				if($rs=$this->cm->insert('users',$data)){
					$status=1;
					$return=array("message" => "Successful Register.");
				}
			}
		}
		
		$this->sendJSON($return,$status);
	}

}
