<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Category extends My_Controller {

	public function __construct(){
		Parent::__construct();
		$this->load->model('Common_model','cm');
	}
	
	public function index(){
		$data=$this->cm->retriveResult('categories');
		$status=0;
		if($data)
			$status=1;

		$this->sendJSON($data,$status);
	}
}
