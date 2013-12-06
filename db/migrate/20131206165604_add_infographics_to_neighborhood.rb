class AddInfographicsToNeighborhood < ActiveRecord::Migration
  def change
    add_column :neighborhoods, :population_density, :string
    add_column :neighborhoods, :household_income, :string
    add_column :neighborhoods, :education_level, :string
    add_column :neighborhoods, :drive_time, :string
    add_column :neighborhoods, :consumer_price, :string
    add_column :neighborhoods, :house_value, :string
  end
end
