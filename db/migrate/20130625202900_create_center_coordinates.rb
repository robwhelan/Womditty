class CreateCenterCoordinates < ActiveRecord::Migration
  def change
    create_table :center_coordinates do |t|
      t.float :lat
      t.float :lng
      t.belongs_to :neighborhood
      t.belongs_to :place
      t.belongs_to :city
      t.belongs_to :duty_station
      t.belongs_to :photo

      t.timestamps
    end
    add_index :center_coordinates, :neighborhood_id
    add_index :center_coordinates, :place_id
    add_index :center_coordinates, :city_id
    add_index :center_coordinates, :duty_station_id
    add_index :center_coordinates, :photo_id
  end
end
