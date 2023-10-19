<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Doctor extends CI_Controller {

	public function __construct(){
		Parent::__construct();
		$this->load->model('Doctor_model','pm');
	}
	
	public function index()
	{
		$data['products']=$this->pm->retrive();
		$data['page']="product/index";
		$this->load->view('layout/app',$data);
	}

	public function create(){
		/* this if for form validation check*/
		$this->load->library('form_validation');

		$this->form_validation->set_rules('name',"Product Name","required");
		$this->form_validation->set_rules('price',"Product Price","required");

		if($this->form_validation->run()===FALSE){

			$data['page']="product/create";
			$this->load->view('layout/app',$data);

		}else{
			if($_FILES && $_FILES['image']['name']){

				$conf['upload_path']="upload/product";
				$conf['allowed_types']="jpg|gif|jpeg|png|jpeg";
				//$conf['max_size']= '1024';
				//$conf['max_width']= '1000';
				//$conf['max_height']= '1000';
				$conf['file_name']= rand(111,999).'_my_product';
				$this->load->library('upload',$conf);
				if(!$this->upload->do_upload('image')){
					echo $this->upload->display_errors();
				}else{
					$image_data=$this->upload->data();
					$image_name=$image_data['file_name'];//image name to save database
					$target_path=$image_data['file_path'].'thumb/';
					$rconf['image_library']='gd2';
					$rconf['source_image']=$image_data['full_path'];
					//$rconf['create_thumb']=TRUE;
					$rconf['new_image']=$target_path;
					$rconf['maintain_ratio']=TRUE;
					$rconf['width']=250;
					$rconf['height']=150;
					$rconf['master_dim']='width';
					$this->load->library('image_lib',$rconf);
					if(!$this->image_lib->resize()){
						$this->handel_error($this->image_lib->display_errors());
					}
					$_POST['image']=$image_name;

					print_r($image_data);
				}
			}else{
				echo "no image";
			}
			$_POST['created_at']=date('Y-m-d H:i:s');
			if($this->pm->insert($this->input->post()))
				$this->session->set_flashdata('msg','Data has been saved.');
			else
				$this->session->set_flashdata('msg','Data has not been saved. Please try again');
			
			redirect('product');
		}
	}

	public function edit($id){

		/* this if for form validation check*/
		$this->load->library('form_validation');

		$this->form_validation->set_rules('name',"Product Name","required");
		$this->form_validation->set_rules('price',"Product Price","required");

		if($this->form_validation->run()===FALSE){
			$data['product']=$this->pm->single($id);
	
			$data['page']="product/edit";
			$this->load->view('layout/app',$data);

		}else{
			if($_FILES && $_FILES['image']['name']){

				$conf['upload_path']="upload/product";
				$conf['allowed_types']="jpg|gif|jpeg|png|jpeg";
				//$conf['max_size']= '1024';
				//$conf['max_width']= '1000';
				//$conf['max_height']= '1000';
				$conf['file_name']= rand(111,999).'_my_product';
				$this->load->library('upload',$conf);
				if(!$this->upload->do_upload('image')){
					echo $this->upload->display_errors();
				}else{
					$image_data=$this->upload->data();
					$image_name=$image_data['file_name'];//image name to save database
					$target_path=$image_data['file_path'].'thumb/';
					$rconf['image_library']='gd2';
					$rconf['source_image']=$image_data['full_path'];
					//$rconf['create_thumb']=TRUE;
					$rconf['new_image']=$target_path;
					$rconf['maintain_ratio']=TRUE;
					$rconf['width']=250;
					$rconf['height']=150;
					$rconf['master_dim']='width';
					$this->load->library('image_lib',$rconf);
					if(!$this->image_lib->resize()){
						$this->handel_error($this->image_lib->display_errors());
					}
					$_POST['image']=$image_name;

					print_r($image_data);
				}
			}else{
				echo "no image";
			}
			$_POST['updated_at']=date('Y-m-d H:i:s');
			if($this->pm->update($id,$this->input->post()))
				$this->session->set_flashdata('msg','Data has been saved.');
			else
				$this->session->set_flashdata('msg','Data has not been saved. Please try again');
			
			redirect('product');
		}
	}

	public function delete($id){
		$data['id']=$id;
		if($this->pm->delete($data))
			echo "data deleted";
		else
			echo "Please try again";
		
		redirect('product');
	}
}
