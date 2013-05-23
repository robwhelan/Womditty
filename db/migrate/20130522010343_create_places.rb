class CreatePlaces < ActiveRecord::Migration
  def change
    create_table :places do |t|
      t.string :name
      t.string :address_line1
      t.string :address_line2
      t.belongs_to :neighborhood
      t.belongs_to :city
      t.integer :zip_code
      t.float :xgps
      t.float :ygps
      t.string :type

      t.timestamps
    end
    add_index :places, :neighborhood_id
    add_index :places, :city_id
  end
end
