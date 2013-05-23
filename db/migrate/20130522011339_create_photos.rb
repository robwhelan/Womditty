class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.string :image_url
      t.belongs_to :place
      t.belongs_to :neighborhood
      t.belongs_to :user
      t.belongs_to :city

      t.timestamps
    end
    add_index :photos, :place_id
    add_index :photos, :neighborhood_id
    add_index :photos, :user_id
    add_index :photos, :city_id
  end
end
