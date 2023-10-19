
      <h2>Products List</h2>
      <a class="btn btn-primary" href="<?= base_url('product/create') ?>">Add New </a>
      <?php if($this->session->flashdata('msg')){ ?>
      <div class="alert alert-success"><?= $this->session->flashdata('msg'); ?></div>
      <?php } ?>
      <table class="table table-bordered">
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Created</th>
            <th>Updated</th>
            <th>Action</th>
        </tr>
        <?php if($products){
                foreach($products as $p){
        ?>
                    <tr>
                        <td><?= $p->id ?></td>
                        <td><?= $p->name ?></td>
                        <td><?= $p->price ?></td>
                        <td><img src="<?= base_url('upload/product/thumb/'.$p->image) ?>" ></td>
                        <td><?= $p->created_at ?></td>
                        <td><?= $p->updated_at ?></td>
                        <td>
                            <a href="<?= base_url('product/edit/'.$p->id) ?>" class="btn btn-primary">Edit</a>
                            <a onclick="return confirm('Are you sure?')" href="<?= base_url('product/delete/'.$p->id) ?>" class="btn btn-danger">Delete</a>
                        </td>
                    </tr>
        <?php   }
        } ?>
      </table>