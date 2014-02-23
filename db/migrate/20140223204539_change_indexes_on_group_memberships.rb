class ChangeIndexesOnGroupMemberships < ActiveRecord::Migration
  def change
    remove_index :group_memberships, :user_id
    remove_index :group_memberships, :group_id
    add_index :group_memberships, :user_id
    add_index :group_memberships, :group_id
  end
end
