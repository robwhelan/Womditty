class AddIndexesToPostAndAnswerAndPhoto < ActiveRecord::Migration
  def change
    add_column :photos, :post_id, :integer
    add_column :photos, :answer_id, :integer
  
  add_index :photos, :post_id
  add_index :photos, :answer_id
  end
end
