class AddAttachmentCommunityAmenitiesToNeighborhoods < ActiveRecord::Migration
  def self.up
    change_table :neighborhoods do |t|
      t.attachment :community_amenities
      t.attachment :grocery_stores
      t.attachment :kids
      t.attachment :lifestyle
      t.attachment :love
      t.attachment :noise
      t.attachment :pets
      t.attachment :schools
      t.attachment :shopping
      t.attachment :traffic
      t.attachment :walkability
    end
  end

  def self.down
    drop_attached_file :neighborhoods, :community_amenities
    drop_attached_file :neighborhoods, :grocery_stores
    drop_attached_file :neighborhoods, :kids
    drop_attached_file :neighborhoods, :lifestyle
    drop_attached_file :neighborhoods, :love
    drop_attached_file :neighborhoods, :noise
    drop_attached_file :neighborhoods, :pets
    drop_attached_file :neighborhoods, :schools
    drop_attached_file :neighborhoods, :shopping
    drop_attached_file :neighborhoods, :traffic
    drop_attached_file :neighborhoods, :walkability
  end
end
