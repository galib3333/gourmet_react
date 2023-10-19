
      <h2>Products Create</h2>
      <?= $this->session->flashdata('msg'); ?>
      <?= validation_errors(); ?>
      <?= form_open_multipart("") ?>
        <div class="mb-3 mt-3">
          <label for="name">Name:</label>
          <input type="text" value="<?= set_value('name') ?>" class="form-control" id="name" name="name">
        </div>
        <div class="mb-3 mt-3">
          <label for="price">Price:</label>
          <input type="text" value="<?= set_value('price') ?>" class="form-control" id="price" name="price">
        </div>
        <div class="mb-3 mt-3">
          <label for="price">Image:</label>
          <input type="file" class="form-control" id="image" name="image">
        </div>
      
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>