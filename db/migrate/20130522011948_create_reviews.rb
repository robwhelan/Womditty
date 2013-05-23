class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.text :body
      t.integer :rating
      t.belongs_to :place
      t.belongs_to :user

      t.timestamps
    end
    add_index :reviews, :place_id
    add_index :reviews, :user_id
  end
end
