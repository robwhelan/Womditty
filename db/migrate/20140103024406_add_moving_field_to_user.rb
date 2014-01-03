class AddMovingFieldToUser < ActiveRecord::Migration
  def change
    add_column :users, :move_status, :boolean
  end
end
