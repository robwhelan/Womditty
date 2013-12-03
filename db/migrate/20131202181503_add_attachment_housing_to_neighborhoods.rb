class AddAttachmentHousingToNeighborhoods < ActiveRecord::Migration
  def self.up
    change_table :neighborhoods do |t|
      t.attachment :housing
    end
  end

  def self.down
    drop_attached_file :neighborhoods, :housing
  end
end
