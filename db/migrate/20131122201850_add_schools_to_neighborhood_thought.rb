class AddSchoolsToNeighborhoodThought < ActiveRecord::Migration
  def change
    add_column :neighborhood_thoughts, :schools, :string, :default => ""
  end
end
