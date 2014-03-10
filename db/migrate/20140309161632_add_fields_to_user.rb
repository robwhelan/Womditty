class AddFieldsToUser < ActiveRecord::Migration
  def change
    change_column :users, :biography, :text, :limit => nil, :default => ""
    add_column :users, :price_range, :string, :default => ""
    add_column :users, :address_line_1, :string, :default => ""
    add_column :users, :address_line_2, :string, :default => ""
    add_column :users, :zip_code, :string, :default => ""
    add_column :users, :vendor_type, :string, :default => ""
  end
end
