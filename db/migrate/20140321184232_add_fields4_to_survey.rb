class AddFields4ToSurvey < ActiveRecord::Migration
  def change
    add_column :surveys, :new_city_name, :string
    add_index :surveys, :city_id
    
  end
end
