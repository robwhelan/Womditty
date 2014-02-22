class AddUniqueIdentifierToGroup < ActiveRecord::Migration
  def change
    add_column :groups, :unique_identifier, :string
  end
end
