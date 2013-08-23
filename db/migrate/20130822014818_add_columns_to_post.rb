class AddColumnsToPost < ActiveRecord::Migration

  def change
    change_table :posts do |t|
      t.integer :place_id
    end
    add_index :posts, :place_id
  end
  
  
end
