class CreateDutyStations < ActiveRecord::Migration
  def change
    create_table :duty_stations do |t|
      t.string :name
      t.belongs_to :city
      t.belongs_to :military_branch

      t.timestamps
    end
    add_index :duty_stations, :city_id
    add_index :duty_stations, :military_branch_id
  end
end
