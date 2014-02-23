class AddPrivateToGroups < ActiveRecord::Migration
  def change
    add_column :groups, :private_group, :boolean, :default => false
    remove_index :group_memberships, :user_id
    remove_index :group_memberships, :group_id
    add_index :group_memberships, :user_id, :unique => true
    add_index :group_memberships, :group_id, :unique => true
  end
end
