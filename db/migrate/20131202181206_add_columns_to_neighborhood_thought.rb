class AddColumnsToNeighborhoodThought < ActiveRecord::Migration
  def change
    add_column :neighborhood_thoughts, :housing, :string, :default => ""
    add_column :neighborhood_thoughts, :restaurants, :string, :default => ""
  end
end
