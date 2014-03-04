class AddReferenceToPost < ActiveRecord::Migration
  def change
    add_column :posts, :place_reference, :string, :default => ""
  end
end
