<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Common_model extends CI_Model {

	public function __construct(){
		Parent::__construct();
	}
	public function retriveResult($table,$field='*',$condition=FALSE,$orderBy=FALSE,$order="ASC"){
		
		$this->db->select($field);
		$this->db->from($table);

		if($condition)
			$this->db->where($condition);
		if($orderBy)
			$this->db->order_by($orderBy,$order);

		return $this->db->get()->result_array();
	}
	public function retriveRow($table,$field='*',$condition=FALSE){
		
		$this->db->select($field);
		$this->db->from($table);

		if($condition)
			$this->db->where($condition);

		return $this->db->get()->row_array();
	}

	
	public function insert($table,$data){
		if($this->db->insert($table,$data))
			return $this->db->insert_id();
		else
			return false;
	}
	public function update($table,$data,$condition){
		if($this->db->where($condition)->update($table,$data))
			return $this->db->affected_rows();
		else
			return false;
	}
	public function delete($table,$data){
		if($this->db->delete($table,$data))
			return $this->db->affected_rows();
		else
			return false;
	}
}
