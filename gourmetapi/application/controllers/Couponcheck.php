<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Couponcheck extends My_Controller
{
	public function __construct()
	{
		parent::__construct();
		$this->load->model('Common_model', 'cm');
	}

	public function index($code)
	{
		$data = $this->getCouponByCode($code);

		$status = !empty($data) ? 1 : 0;
		$this->sendJSON($data, $status);
	}

	private function getCouponByCode($code)
	{
		$data = [];
		$sql = "SELECT * FROM coupons WHERE code = ?";
		$result = $this->db->query($sql, [$code]);

		if ($result->num_rows() > 0) {
			$data = $result->row_array();
		}

		return $data;
	}
}
