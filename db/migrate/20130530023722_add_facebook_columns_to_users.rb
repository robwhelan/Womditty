class AddFacebookColumnsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :location, :string
    add_column :users, :birthday, :date
    add_column :users, :profile_image, :string
    add_column :users, :gender, :string
  end
end
