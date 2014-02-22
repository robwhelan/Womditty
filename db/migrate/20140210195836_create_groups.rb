class CreateGroups < ActiveRecord::Migration
  def change
    create_table :groups do |t|
      t.string :name
      t.belongs_to :forum

      t.timestamps
    end
    add_column :posts, :group_id, :integer
    add_index :posts, :group_id
    add_index :groups, :forum_id
  end
end
