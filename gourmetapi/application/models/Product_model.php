<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Product_model extends CI_Model {

	public function __construct(){
		Parent::__construct();
	}
	public function retrive(){
		return $this->db->get('products')->result();
	}

	public function single($id){
		return $this->db->where('id',$id)->get('products')->row();
	}

	public function insert($data){
		if($this->db->insert('products',$data))
			return $this->db->insert_id();
		else
			return false;
	}
	public function update($id,$data){
		if($this->db->where('id',$id)->update('products',$data))
			return $this->db->affected_rows();
		else
			return false;
	}
	public function delete($data){
		if($this->db->delete('products',$data))
			return $this->db->affected_rows();
		else
			return false;
	}
}
