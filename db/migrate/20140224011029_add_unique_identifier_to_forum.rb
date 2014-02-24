class AddUniqueIdentifierToForum < ActiveRecord::Migration
  def change
    add_column :forums, :unique_identifier, :string, :unique => true
  end
end
