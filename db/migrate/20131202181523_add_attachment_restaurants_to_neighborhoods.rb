class AddAttachmentRestaurantsToNeighborhoods < ActiveRecord::Migration
  def self.up
    change_table :neighborhoods do |t|
      t.attachment :restaurants
    end
  end

  def self.down
    drop_attached_file :neighborhoods, :restaurants
  end
end
