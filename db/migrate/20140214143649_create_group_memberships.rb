class CreateGroupMemberships < ActiveRecord::Migration
  def change
    create_table :group_memberships do |t|
      t.belongs_to :user
      t.belongs_to :group

      t.timestamps
    end
    add_index :group_memberships, :user_id
    add_index :group_memberships, :group_id
  end
end
