class AddColumnsToReviews < ActiveRecord::Migration
  def change
    change_table :reviews do |t|
      t.belongs_to :neighborhood
    end
    
    add_index :reviews, :neighborhood_id
    
  end
end
