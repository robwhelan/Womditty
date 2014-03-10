class AddAttachmentSpecialPhoto01ToUsers < ActiveRecord::Migration
  def self.up
    change_table :users do |t|
      t.attachment :special_photo_01
      t.attachment :special_photo_02
      t.attachment :special_photo_03
      t.attachment :special_photo_04
      t.attachment :special_photo_05
      t.attachment :special_photo_06
      t.attachment :special_photo_07
      t.attachment :special_photo_08
      t.attachment :special_photo_09
      t.attachment :special_photo_10
    end
  end

  def self.down
    drop_attached_file :users, :special_photo_01
    drop_attached_file :users, :special_photo_02
    drop_attached_file :users, :special_photo_03
    drop_attached_file :users, :special_photo_04
    drop_attached_file :users, :special_photo_05
    drop_attached_file :users, :special_photo_06
    drop_attached_file :users, :special_photo_07
    drop_attached_file :users, :special_photo_08
    drop_attached_file :users, :special_photo_09
    drop_attached_file :users, :special_photo_10
  end
end
