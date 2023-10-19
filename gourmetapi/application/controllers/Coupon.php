<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Coupon extends My_Controller
{

	public function __construct()
	{
		parent::__construct();
		$this->load->model('Common_model', 'cm');
	}

	public function index()
	{
		$data = $this->cm->retriveResult('coupons');
		$status = 0;
		if ($data)
			$status = 1;

		$this->sendJSON($data, $status);
	}
}