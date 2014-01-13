class AddAttachmentAvatarToUsers < ActiveRecord::Migration
  def self.up
    change_table :users do |t|
      t.attachment :avatar
    end
    change_column :users, :name, :string, :default => ""
  end

  def self.down
    drop_attached_file :users, :avatar
  end
end
