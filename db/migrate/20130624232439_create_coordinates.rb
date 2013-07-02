class CreateCoordinates < ActiveRecord::Migration
  def change
    #drop_table :coordinates
    create_table :coordinates do |t|
      t.belongs_to :neighborhood
      t.belongs_to :city
      t.belongs_to :place
      t.belongs_to :duty_station
      t.integer :coordinate_number
      t.float :lat
      t.float :lng
      t.float :lat_center
      t.float :lng_center

      t.timestamps
    end
    add_index :coordinates, :neighborhood_id
    add_index :coordinates, :city_id
    add_index :coordinates, :place_id
    add_index :coordinates, :duty_station_id
  end
end
