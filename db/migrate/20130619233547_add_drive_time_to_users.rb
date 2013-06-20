class AddDriveTimeToUsers < ActiveRecord::Migration
  def change
    add_column :users, :drive_time, :integer
  end
end
