class AddDefaultValuesToUser < ActiveRecord::Migration
  def change
    change_column :users, :name, :string, :default => "My Name"
    change_column :users, :profile_image, :string, :default => "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
  end
end
