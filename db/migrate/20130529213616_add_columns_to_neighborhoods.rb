class AddColumnsToNeighborhoods < ActiveRecord::Migration
  def change
    add_column :neighborhoods, :review_id, :integer
  end
end
