<?php
defined('BASEPATH') or exit('No direct script access allowed');

class MenuItem extends My_Controller
{
	public function __construct()
	{
		parent::__construct();
		$this->load->model('Common_model', 'cm');
	}
	public function index()
	{
		$this->db->select('menu_items.*, categories.category_name as cname, coupons.discount_percentage, coupons.code');
		$this->db->from('menu_items');
		$this->db->join('categories', 'categories.id = menu_items.category_id');
		$this->db->join('coupons', 'coupons.id = menu_items.coupon_id', 'left');
		$this->db->order_by('menu_items.id', 'DESC');
		$data = $this->db->get()->result_array();

		$status = 0;
		if (!empty($data)) {
			$status = 1;
		}

		$this->sendJSON($data, $status);
	}
	public function create()
	{
		$data = json_decode(file_get_contents("php://input"), true);

		if ($data) {
			if ($data['name'] == "") {
				$message = array('message' => 'name is required');
				$this->sendJSON($message, 0);
			} else {
				if ($data['imageSrc']) {
					$dir = "upload/menu/";
					list($type, $imgdata) = explode(';', $data['imageSrc']);
					list(, $imgdata) = explode(',', $imgdata);
					/* to get image type like jpg, png */
					$fileType = explode("image/", $type);
					$image_type = $fileType[1];

					$imgdata = base64_decode($imgdata);
					$image_name = $dir . uniqid() . rand(111, 999) . "." . $image_type;
					file_put_contents($image_name, $imgdata);

					$data['imageSrc'] = $image_name;
				}else{
					unset($data['imageSrc']);
				}
				if ($data['id'] == "") {
					unset($data['id']);
					$rs = $this->cm->insert('menu_items', $data);

				} else {
					unset($data['cname']);
					unset($data['code']);
					unset($data['discount_percentage']);
					$condition['id'] = $data['id'];
					$rs = $this->cm->update('menu_items', $data, $condition);
				}
				if ($rs) {
					$message = array('message' => 'Data has been saved.');
					$status = 1;
				} else {
					$message = array('message' => 'Data has not been saved. Please try again');
					$status = 0;
				}
			}
		} else {
			$message = array('message' => 'You have to provide data to save');
			$status = 0;
		}
		$this->sendJSON($message, $status);
	}
	public function delete($id)
	{
		$data['id'] = $id;
		if ($this->cm->delete('menu_items', $data)) {
			$message = array('message' => 'Data deleted');
			$status = 1;
		} else {
			$message = array('message' => 'Please try again');
			$status = 0;
		}
		$this->sendJSON($message, $status);
	}
}