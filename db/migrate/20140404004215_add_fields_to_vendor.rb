class AddFieldsToVendor < ActiveRecord::Migration
  def change
    add_column :vendors, :business_name, :string
    add_column :vendors, :address_line_1, :string
    add_column :vendors, :address_line_2, :string
    add_column :vendors, :zip_code, :string
    add_column :vendors, :phone_number, :string
    add_column :vendors, :city_id, :integer
    add_column :vendors, :contact_email, :string
    add_column :vendors, :site_url, :string
    add_column :vendors, :biography, :text
    add_attachment :vendors, :main_image
    add_attachment :vendors, :promotion_image
    add_attachment :vendors, :extra_image_1
    add_attachment :vendors, :extra_image_2
    add_attachment :vendors, :extra_image_3
    add_attachment :vendors, :logo_image
  end
end
