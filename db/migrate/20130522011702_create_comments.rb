class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.text :body
      t.belongs_to :place
      t.belongs_to :review
      t.belongs_to :photo
      t.belongs_to :user

      t.timestamps
    end
    add_index :comments, :place_id
    add_index :comments, :review_id
    add_index :comments, :photo_id
    add_index :comments, :user_id
  end
end
