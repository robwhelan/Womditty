class CreateHosts < ActiveRecord::Migration
  def change
    create_table :hosts do |t|
      t.belongs_to :user
      t.belongs_to :neighborhood

      t.timestamps
    end
    add_index :hosts, :user_id
    add_index :hosts, :neighborhood_id
  end
end
