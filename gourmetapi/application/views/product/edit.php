
      <h2>Products Create</h2>
      <?= form_open_multipart('product/edit/'.$product->id) ?>
        <div class="mb-3 mt-3">
          <label for="name">Name:</label>
          <input type="text" class="form-control" id="name" name="name" value="<?= set_value('name',$product->name) ?>">
          <?= form_error('name','<b class="text-danger">','</b>') ?>
        </div>
        <div class="mb-3 mt-3">
          <label for="price">Price:</label>
          <input type="text" class="form-control" id="price" name="price" value="<?= set_value('price',$product->price) ?>">
          <?= form_error('price','<b class="text-danger">','</b>') ?>
        </div>
        <div class="mb-3 mt-3">
          <label for="price">Image:</label>
          <input type="file" class="form-control" id="image" name="image">
        </div>
      
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>